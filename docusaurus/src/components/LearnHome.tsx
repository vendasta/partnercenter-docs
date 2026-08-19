// Learn tab homepage: path cards up top, then the "Learning for how you work"
// explorer — role and focus facets on the left, a clickable lesson list on the
// right. Ported from the internal Vendasta Learn homepage (vendastalearn
// internal-docs-site src/components/HomeCatalog) on 2026-08-19, Cal's Learn tab
// refresh. Data is hand-curated below — there is no generated course manifest
// in this repo, so when a path gains or loses a visible lesson, update it here.
//
// Hidden paths and their restore notes (they come back by adding a card to
// PATHS and items to the facets below, plus the sidebar changes noted in each
// path's own index):
// - Your growth engine: hidden until steps 3-6 and Snapshot videos ship — see
//   training/growth-engine/index.mdx.
// - Product courses: unmaintained LMS import pending retirement — see
//   training/products/index.mdx.
// - Build with Vibe / Builder / Build lab: stub or unreviewed paths, hidden via
//   their _category_.json files.

import React, { useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import "./LearnHome.css";

interface HomePathCard {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  /** Dark pill — the topic or audience. */
  tag: string;
  /** Light pills — scope (lesson/video/lab counts). */
  scope: string[];
  /** Footer line — time commitment or how to take it. */
  gate: string;
  cta: string;
  to: string;
  /** Gradient variant for the card header. */
  tone: "purple" | "green" | "navy" | "teal" | "blue" | "forest" | "slate";
}

// Counts and time estimates mirror what each path's own PathHeader claims.
const PATHS: HomePathCard[] = [
  {
    id: "getting-started",
    kicker: "Start here",
    title: "Get started",
    blurb: "Run your business on Vendasta: the platform, the ecosystem, setup, and getting paid.",
    tag: "Platform",
    scope: ["6 lessons"],
    gate: "About 1 hour 15 minutes",
    cta: "Start",
    to: "/learn/getting-started",
    tone: "navy",
  },
  {
    id: "ai-foundations",
    kicker: "Understand AI",
    title: "AI foundations",
    blurb: "How AI Employees actually work: models, knowledge, capabilities, tools, and automations.",
    tag: "AI",
    scope: ["6 lessons"],
    gate: "About 40 minutes",
    cta: "Start",
    to: "/learn/ai-foundations",
    tone: "purple",
  },
  {
    id: "ai-workforce",
    kicker: "Put AI to work",
    title: "Hire your first AI Employee",
    blurb: "Get your first AI Employee hired, trained, and working for a client, then grow the roster from there.",
    tag: "AI",
    scope: ["7 lessons", "1 lab"],
    gate: "About 2 hours 30 minutes",
    cta: "Start",
    to: "/learn/ai-workforce",
    tone: "purple",
  },
  {
    id: "sales",
    kicker: "Learn to sell",
    title: "The master sales series",
    blurb: "Sales craft with George Leith: prospecting, the pitch, the presentation, and handling objections.",
    tag: "Sales",
    scope: ["5 lessons", "6 videos"],
    gate: "About 1 hour",
    cta: "Start",
    to: "/learn/sales",
    tone: "navy",
  },
  {
    id: "vendasta-services",
    kicker: "Done for you",
    title: "Vendasta Services",
    blurb: "Scope, order, and manage white-label fulfillment and marketing services.",
    tag: "Services",
    scope: ["3 courses"],
    gate: "Visit in any order",
    cta: "Start",
    to: "/learn/vendasta-services",
    tone: "navy",
  },
];

interface ExplorerItem {
  title: string;
  to: string;
}

interface ExplorerFacet {
  id: string;
  label: string;
  items: ExplorerItem[];
  /** Renders a "Coming soon" badge instead of a count, plus this empty-state message. */
  comingSoon?: string;
}

const GETTING_STARTED_ITEMS: ExplorerItem[] = [
  { title: "The Vendasta Platform", to: "/learn/getting-started/the-vendasta-platform" },
  { title: "Partner Center walkthrough", to: "/learn/getting-started/partner-center-walkthrough" },
  { title: "Customize and brand your platform", to: "/learn/getting-started/customize-and-brand" },
  { title: "Add your customer accounts and users", to: "/learn/getting-started/accounts-and-users" },
  { title: "Organize your team in Partner Center", to: "/learn/getting-started/organize-your-team" },
  { title: "Get set up to get paid", to: "/learn/getting-started/get-set-up-to-get-paid" },
];

const AI_FOUNDATIONS_ITEMS: ExplorerItem[] = [
  { title: "From work to AI workforce", to: "/learn/ai-foundations/from-work-to-ai-workforce" },
  { title: "How AI Employees think", to: "/learn/ai-foundations/how-ai-employees-think" },
  { title: "Context is everything", to: "/learn/ai-foundations/context-is-everything" },
  { title: "Instructions that scale", to: "/learn/ai-foundations/instructions-that-scale" },
  { title: "Taking action", to: "/learn/ai-foundations/taking-action" },
  { title: "Agents and automations, together", to: "/learn/ai-foundations/agents-and-automations-together" },
];

// Only the steps visible in the sidebar today; three more are hidden pending review.
const AI_WORKFORCE_ITEMS: ExplorerItem[] = [
  { title: "Meet your AI Workforce", to: "/learn/ai-workforce/meet-your-workforce" },
  { title: "Put a receptionist to work", to: "/learn/ai-workforce/put-a-receptionist-to-work" },
  { title: "Train your AI Employee", to: "/learn/ai-workforce/train-your-employee" },
  { title: "Build a Custom AI Employee", to: "/learn/ai-workforce/custom-employee-lab" },
];

const SALES_ITEMS: ExplorerItem[] = [
  { title: "Run the perfect sales day", to: "/learn/sales/build-your-brand-and-your-day" },
  { title: "Six habits for better prospecting", to: "/learn/sales/find-your-next-prospect" },
  { title: "Master the elevator pitch", to: "/learn/sales/open-the-conversation" },
  { title: "A killer sales presentation", to: "/learn/sales/present-so-it-lands" },
  { title: "Handle objections like a master", to: "/learn/sales/handle-objections" },
  { title: "Master sales skill check", to: "/learn/sales/master-sales-skill-check" },
];

const SERVICES_ITEMS: ExplorerItem[] = [
  { title: "Grow your agency with our team of marketing experts", to: "/learn/vendasta-services/grow-your-agency-with-marketing-experts" },
  { title: "Fulfilling websites with Marketing Services", to: "/learn/vendasta-services/fulfilling-websites-with-marketing-services" },
  { title: "Introduction to Digital Ads", to: "/learn/vendasta-services/introduction-to-digital-ads" },
];

// The "What's your role?" facet group (Admin / Sales / Builder) was removed
// 2026-08-19 (Cal): too few roles to be useful yet. Restore it from git history
// when the role list grows — Builder should carry a "Coming soon" badge
// (comingSoon field below) until builder content on AI, APIs, and webhooks ships.
const FOCUS_AREAS: ExplorerFacet[] = [
  { id: "setting-up", label: "Setting up your platform", items: GETTING_STARTED_ITEMS },
  { id: "selling", label: "Learning how to sell", items: SALES_ITEMS },
  { id: "ai-to-work", label: "Putting AI to work", items: [...AI_FOUNDATIONS_ITEMS, ...AI_WORKFORCE_ITEMS] },
  { id: "delivering", label: "Delivering client work", items: SERVICES_ITEMS },
];

function PathCard({ path }: { path: HomePathCard }) {
  return (
    <Link to={path.to} className="vd-home-card">
      <div className={`vd-home-card__hero vd-home-card__hero--${path.tone}`}>
        <span className="vd-home-card__kicker">{path.kicker}</span>
        <span className="vd-home-card__title">{path.title}</span>
      </div>
      <div className="vd-home-card__body">
        <p className="vd-home-card__blurb">{path.blurb}</p>
        <div className="vd-home-card__chips">
          <span className="vd-home-card__chip vd-home-card__chip--dark">{path.tag}</span>
          {path.scope.map((s) => (
            <span key={s} className="vd-home-card__chip">{s}</span>
          ))}
        </div>
        <div className="vd-home-card__footer">
          <span className="vd-home-card__gate">{path.gate}</span>
          <span className="vd-home-card__cta">{path.cta} →</span>
        </div>
      </div>
    </Link>
  );
}

function LearningPaths() {
  return (
    <section aria-label="Learning paths">
      <div className="vd-home__section-head">
        <h2 className="vd-home__section-title">Learning paths</h2>
      </div>
      <div className="vd-home__grid">
        {PATHS.map((p) => (
          <PathCard key={p.id} path={p} />
        ))}
      </div>
    </section>
  );
}

function FacetGroup({
  title,
  facets,
  activeId,
  onSelect,
}: {
  title: string;
  facets: ExplorerFacet[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="vd-explore__group">
      <h3 className="vd-explore__group-title">{title}</h3>
      <ul className="vd-explore__facets">
        {facets.map((f) => {
          const active = f.id === activeId;
          return (
            <li key={f.id}>
              <button
                type="button"
                className={`vd-explore__facet${active ? " vd-explore__facet--active" : ""}`}
                aria-pressed={active}
                onClick={() => onSelect(f.id)}
              >
                <span className="vd-explore__facet-label">{f.label}</span>
                {f.comingSoon ? (
                  <span className="vd-explore__facet-badge">Coming soon</span>
                ) : (
                  <span className="vd-explore__facet-count">({f.items.length})</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Explorer() {
  const [selectedId, setSelectedId] = useState(FOCUS_AREAS[0].id);

  const facet = useMemo(
    () => FOCUS_AREAS.find((f) => f.id === selectedId) ?? null,
    [selectedId],
  );

  const items = facet?.items ?? [];

  return (
    <section className="vd-explore" aria-label="Browse by focus">
      <span className="vd-explore__kicker">Find what fits</span>
      <h2 className="vd-explore__title">Learning for how you work</h2>
      <p className="vd-explore__blurb">
        Start from what you&rsquo;re working on right now.
      </p>
      <div className="vd-explore__layout">
        <aside className="vd-explore__rail">
          <FacetGroup
            title="What are you focused on?"
            facets={FOCUS_AREAS}
            activeId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>
        <div className="vd-explore__results">
          {facet && (
            <div className="vd-explore__results-head">
              <h3 className="vd-explore__results-title">{facet.label}</h3>
              {!facet.comingSoon && (
                <span className="vd-home__count">
                  {items.length} lesson{items.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}
          {facet?.comingSoon ? (
            <p className="vd-explore__empty">{facet.comingSoon}</p>
          ) : (
            <div className="vd-explore__grid">
              {items.map((item) => (
                <Link key={item.to} to={item.to} className="vd-explore__item">
                  <span className="vd-explore__item-title">{item.title}</span>
                  <span className="vd-explore__item-cta">Start →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LearnHome() {
  return (
    <div className="vd-home">
      <LearningPaths />
      <Explorer />
    </div>
  );
}
