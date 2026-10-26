// Writes build/llms.txt from the docs that were just built, so the index AI
// assistants read is never older than the site. One section per top-level
// folder, named and ordered by its _category_.json like the sidebar; one line
// per article with its frontmatter description. Default locale only.
//
// Format: https://llmstxt.org
const fs = require('fs');
const path = require('path');
const {applyTrailingSlash} = require('@docusaurus/utils-common');

const DOCS_PLUGIN = 'docusaurus-plugin-content-docs';

function readCategory(dir) {
  try {
    const c = JSON.parse(fs.readFileSync(path.join(dir, '_category_.json'), 'utf8'));
    return {label: c.label, position: c.position ?? Number.MAX_SAFE_INTEGER};
  } catch {
    return {label: path.basename(dir), position: Number.MAX_SAFE_INTEGER};
  }
}

// Group one docs instance's articles by their top-level folder. Two folders
// with the same label (docs/marketplace and docs/marketplace-new both say
// "Marketplace") become one section, like they do in the sidebar.
function sections(docs, contentDir, rootLabel, toUrl) {
  const byFolder = new Map();
  for (const doc of docs) {
    if (doc.unlisted || doc.frontMatter?.draft) continue;
    // source looks like "@site/docs/crm/leaderboard.mdx"
    const rel = doc.source.replace(/^@site\//, '').split('/').slice(1); // drop docs/ or training/
    const folder = rel.length > 1 ? rel[0] : '';
    if (!byFolder.has(folder)) byFolder.set(folder, []);
    byFolder.get(folder).push(doc);
  }
  const byLabel = new Map();
  for (const [folder, items] of byFolder) {
    const cat = folder ? readCategory(path.join(contentDir, folder)) : {label: rootLabel, position: -1};
    items.sort((a, b) => (a.sidebarPosition ?? 1e9) - (b.sidebarPosition ?? 1e9) || a.permalink.localeCompare(b.permalink));
    const lines = items.map((d) => {
      const desc = (d.description || '').replace(/\s+/g, ' ').trim();
      return `- [${d.title}](${toUrl(d.permalink)})${desc ? `: ${desc}` : ''}`;
    });
    const existing = byLabel.get(cat.label);
    if (existing) {
      existing.position = Math.min(existing.position, cat.position);
      existing.lines.push(...lines);
    } else {
      byLabel.set(cat.label, {...cat, lines});
    }
  }
  return [...byLabel.values()].sort((a, b) => a.position - b.position || a.label.localeCompare(b.label));
}

module.exports = function llmsTxtPlugin(context, options) {
  const {title, summary, rootLabel = 'Home', learnLabel = 'Learn'} = options;
  return {
    name: 'llms-txt',
    async postBuild({siteConfig, siteDir, outDir, i18n, plugins}) {
      if (i18n.currentLocale !== i18n.defaultLocale) return;
      const siteUrl = siteConfig.url.replace(/\/$/, '');
      // Doc permalinks carry no trailing slash; routes get it from siteConfig.
      const toUrl = (permalink) =>
        siteUrl + applyTrailingSlash(permalink, {trailingSlash: siteConfig.trailingSlash, baseUrl: siteConfig.baseUrl});
      const instances = plugins.filter((p) => p.name === DOCS_PLUGIN);
      const parts = [`# ${title}`, '', `> ${summary}`, ''];
      for (const p of instances) {
        const version = p.content.loadedVersions[0];
        const contentDir = path.join(siteDir, p.options.path);
        const isLearn = p.options.id !== 'default';
        for (const s of sections(version.docs, contentDir, isLearn ? learnLabel : rootLabel, toUrl)) {
          const heading = isLearn && s.label !== learnLabel ? `${learnLabel}: ${s.label}` : s.label;
          parts.push(`## ${heading}`, '', ...s.lines, '');
        }
      }
      fs.writeFileSync(path.join(outDir, 'llms.txt'), parts.join('\n'));
    },
  };
};
