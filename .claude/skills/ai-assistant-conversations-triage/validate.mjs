#!/usr/bin/env node
/**
 * validate.mjs — deterministic half of the documentation-triage loop.
 *
 * Reads .triage/findings.json (produced by the /ai-assistant-conversations-triage Step 1 normalization) and the
 * Docusaurus docs tree in this repo. For each finding it resolves the cited article to a
 * file, assigns a verdict bucket, and writes:
 *   .triage/validated.json   (machine-readable, for the agent)
 *   .triage/validated.md     (human-readable summary)
 *
 * The judgment check — "does the article actually answer the question?" — is NOT here;
 * that is the agent's job in /ai-assistant-conversations-triage Step 3. Likewise EXISTS_UNINDEXED (a "Knowledge Gap"
 * whose article turns out to exist) is assigned by the agent when it topic-searches the
 * repo — it cannot be determined from a citation-less finding here.
 *
 * No sidebar / orphan check: in this repo every article is listed in the sidebar, so the
 * check carries no signal, and "in the sidebar" is a different layer from "in the AI's
 * retrieval index" anyway.
 *
 * Zero dependencies. Run with: node validate.mjs
 * Options:
 *   --docs=<path>      docs root (default: ./docusaurus/docs, served at /)
 *   --findings=<path>  findings file (default: .triage/findings.json)
 *   --inspect          print detected doc-index shape and exit (first-run sanity check)
 *
 * Rule enforced here (see SKILL.md): git age is reported as CONTEXT only, never a verdict;
 * unmatched citations become CITED_NOT_IN_REPO, never silently dropped.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";
import { execSync } from "node:child_process";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const DOCS_ROOT = args.docs || "docusaurus/docs";
const FINDINGS = args.findings || join(".triage", "findings.json");

// Training material (docusaurus/training, served at /learn) is deliberately OUT OF SCOPE for
// documentation triage. /learn citations are recognised and reported, never matched into docs.
const TRAINING_PREFIX = "/learn";
const OUT_JSON = join(".triage", "validated.json");
const OUT_MD = join(".triage", "validated.md");

function parseFrontmatter(text) {
  const fm = {};
  let body = text;
  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end !== -1) {
      const block = text.slice(3, end);
      body = text.slice(end + 4);
      for (const line of block.split("\n")) {
        const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
        if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
      }
    }
  }
  return { fm, body };
}

function firstH1(body) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      out.push(...walk(full));
    } else if ([".md", ".mdx"].includes(extname(full))) {
      out.push(full);
    }
  }
  return out;
}

function gitDate(file) {
  try {
    const d = execSync(`git log -1 --format=%cI -- "${file}"`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return d || null;
  } catch {
    return null;
  }
}

function daysSince(iso) {
  if (!iso) return null;
  return Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
}

/**
 * Site path for a doc file. docusaurus/docs has routeBasePath "/" — docs are the site root.
 * A folder's index.md(x) maps to the folder itself, so
 *   docs/administration/my-account/my-team/index.mdx -> /administration/my-account/my-team
 * An absolute `slug:` in frontmatter wins.
 */
function sitePathFor(root, file, fm) {
  if (fm.slug && fm.slug.startsWith("/")) return fm.slug.replace(/\/+$/, "") || "/";
  let p = relative(root, file).replace(/\.(md|mdx)$/, "");
  p = p.replace(/(^|\/)index$/, ""); // folder index -> the folder itself
  return "/" + p.replace(/^\/+|\/+$/g, "");
}

// Segments too generic to identify an article on their own.
const GENERIC_SEG = new Set(["index", "gettingstarted", "faq", "overview", "readme", "learn", "docs"]);

function buildIndex(docsRoot) {
  if (!existsSync(docsRoot)) {
    console.error(`Docs root not found: ${docsRoot} (pass --docs=<path>)`);
    process.exit(1);
  }
  return walk(docsRoot).map((file) => {
    const raw = readFileSync(file, "utf8");
    const { fm, body } = parseFrontmatter(raw);
    const rel = relative(process.cwd(), file);
    const title = fm.title || firstH1(body) || basename(file, extname(file));
    const id = fm.id || fm.slug || rel.replace(/\.(md|mdx)$/, "");
    return {
      file: rel,
      title,
      id,
      slug: fm.slug || null,
      sitePath: sitePathFor(docsRoot, file, fm),
      gitDate: gitDate(rel),
    };
  });
}

const urlPath = (u) => {
  try {
    return new URL(u).pathname.replace(/\/+$/, "") || "/";
  } catch {
    return "/" + u.split(/[#?]/)[0].replace(/^\/+|\/+$/g, ""); // bare path, not a full URL
  }
};

// A /learn citation points at training material, which this triage does not cover.
const isTrainingUrl = (cited) => {
  if (!cited || !cited.url) return false;
  const p = urlPath(cited.url).toLowerCase();
  return p === TRAINING_PREFIX || p.startsWith(TRAINING_PREFIX + "/");
};

/**
 * Resolve a citation to a file in the docs tree, strongest signal first:
 *   1. exact site-path match — the reliable one
 *   2. exact title match, only when unambiguous
 *   3. last-segment match, only for a non-generic segment that is unique in the index
 *
 * Step 3 previously ran unguarded against every doc's basename, which resolved
 * docs.vendasta.com/learn/getting-started (a training page) to
 * fulfillment/task-manager/getting-started.mdx. Two guards prevent that class of error:
 * the generic-segment stoplist with a uniqueness requirement (ambiguous means no match,
 * never a guess), and the /learn bail-out below — without it, a training URL could still
 * reach a same-titled docs article through the title match in step 2.
 */
function matchArticle(cited, index) {
  if (!cited) return null;
  if (isTrainingUrl(cited)) return null; // training is out of scope, never match into docs

  if (cited.url) {
    const p = urlPath(cited.url).toLowerCase();
    const hit = index.find((d) => d.sitePath.toLowerCase() === p);
    if (hit) return hit;
  }

  if (cited.title) {
    const n = norm(cited.title);
    const hits = index.filter((d) => norm(d.title) === n);
    if (hits.length === 1) return hits[0];
  }

  if (cited.url) {
    const seg = norm(urlPath(cited.url).split("/").pop());
    if (seg && !GENERIC_SEG.has(seg)) {
      const hits = index.filter(
        (d) =>
          norm(d.slug) === seg ||
          norm(d.sitePath.split("/").pop()) === seg ||
          norm(basename(d.file).replace(/\.(md|mdx)$/, "")) === seg
      );
      if (hits.length === 1) return hits[0];
    }
  }

  return null;
}

function verdictFor(finding, match) {
  const gap = (finding.gapType || "").toLowerCase();
  if (!match) {
    // has a citation but it didn't resolve -> probably the other docs site
    if (finding.citedArticle) return "CITED_NOT_IN_REPO";
    // no citation (typical Knowledge Gap): treat as MISSING; the agent confirms
    // truly-missing vs EXISTS_UNINDEXED by topic-searching the repo in Step 3.
    return "MISSING";
  }
  if (gap.includes("post-citation") || gap.includes("escalation")) return "EXISTS_UNCLEAR";
  return "EXISTS_WRONG"; // Citation Failure (or any other matched finding)
}

const index = buildIndex(DOCS_ROOT);

if (args.inspect) {
  console.log(`Indexed ${index.length} docs from ${DOCS_ROOT}. Sample:`);
  console.log(JSON.stringify(index.slice(0, 5), null, 2));
  process.exit(0);
}

if (!existsSync(FINDINGS)) {
  console.error(`Findings not found: ${FINDINGS}. Run /ai-assistant-conversations-triage Step 1 first.`);
  process.exit(1);
}

const findings = JSON.parse(readFileSync(FINDINGS, "utf8"));

const results = findings.map((f) => {
  const match = matchArticle(f.citedArticle, index);
  return {
    id: f.id,
    gapType: f.gapType,
    snippet: f.snippet,
    citedArticle: f.citedArticle || null,
    matchedFile: match ? match.file : null,
    gitDate: match ? match.gitDate : null,
    ageDays: match ? daysSince(match.gitDate) : null,
    verdict: verdictFor(f, match),
    // Training (/learn) is out of scope. Flagged so it is not re-investigated as a missing doc.
    outOfScopeTraining: isTrainingUrl(f.citedArticle),
  };
});

const trainingCount = results.filter((r) => r.outOfScopeTraining).length;

writeFileSync(OUT_JSON, JSON.stringify(results, null, 2));

const order = ["MISSING", "EXISTS_WRONG", "EXISTS_UNCLEAR", "CITED_NOT_IN_REPO"];
const byVerdict = Object.fromEntries(order.map((v) => [v, results.filter((r) => r.verdict === v)]));

let md = `# Triage — deterministic results\n\n`;
md += `Indexed **${index.length}** docs from \`${DOCS_ROOT}\`. Processed **${results.length}** findings.\n\n`;
md += `> Git age is context for review order only — it is NOT a staleness verdict (see SKILL.md).\n`;
md += `> \`MISSING\` items still need the agent to confirm truly-missing vs \`EXISTS_UNINDEXED\` (article exists, AI missed it).\n\n`;
md += `| Verdict | Count | Meaning |\n|---|---|---|\n`;
md += `| MISSING | ${byVerdict.MISSING.length} | write a new article (confirm not just unindexed) |\n`;
md += `| EXISTS_WRONG | ${byVerdict.EXISTS_WRONG.length} | fix / rewrite for correctness |\n`;
md += `| EXISTS_UNCLEAR | ${byVerdict.EXISTS_UNCLEAR.length} | clarify / restructure |\n`;
md += `| CITED_NOT_IN_REPO | ${byVerdict.CITED_NOT_IN_REPO.length} | eyeball — likely the vendasta.com site |\n\n`;
if (trainingCount) {
  md += `**${trainingCount}** of these cite \`/learn\` training material, which is out of scope for documentation triage — they are tagged \`(training — out of scope)\` below. Do not treat them as missing docs.\n\n`;
}

for (const v of order) {
  const rows = byVerdict[v];
  if (!rows.length) continue;
  md += `## ${v} (${rows.length})\n\n`;
  for (const r of rows) {
    const loc = r.matchedFile
      ? `\`${r.matchedFile}\`${r.ageDays != null ? ` — last commit ${r.ageDays}d ago` : " — uncommitted"}`
      : r.citedArticle
      ? `cited: *${r.citedArticle.title || r.citedArticle.url}*${
          r.outOfScopeTraining ? " (training — out of scope)" : " (no file match)"
        }`
      : "no citation";
    md += `- **${loc}**\n`;
    md += `  - _${(r.snippet || "").slice(0, 200).replace(/\n/g, " ")}_\n`;
  }
  md += `\n`;
}

writeFileSync(OUT_MD, md);
console.log(`Wrote ${OUT_JSON} and ${OUT_MD}. ${results.length} findings across ${order.length} buckets.`);
for (const v of order) console.log(`  ${v}: ${byVerdict[v].length}`);
if (trainingCount) console.log(`  (${trainingCount} of these cite /learn training material — out of scope)`);
