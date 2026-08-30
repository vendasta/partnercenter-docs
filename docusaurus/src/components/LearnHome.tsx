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
// - Build with Vibe: stub path, hidden via its _category_.json file.
// (Builder and Build lab were merged into one visible path, Wire your AI
//  Workforce to act, on 2026-08-29 and are no longer hidden.)

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
    title: "Get set up",
    blurb: "Run your business on Vendasta: the platform, the ecosystem, setup, and getting paid.",
    tag: "Platform",
    scope: ["6 lessons", "1 video", "5 labs"],
    gate: "About 1 hour 50 minutes",
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
    scope: ["7 lessons", "5 labs"],
    gate: "About 2 hours 30 minutes",
    cta: "Start",
    to: "/learn/ai-workforce",
    tone: "purple",
  },
  {
    id: "grow-your-ai-workforce",
    kicker: "Staff the team",
    title: "Grow your AI Workforce",
    blurb: "Every member of the fleet, one at a time: watch each one work, learn its day-one job, and know the edition that carries it.",
    tag: "AI",
    scope: ["6 lessons", "8 videos"],
    gate: "About 1 hour",
    cta: "Start",
    to: "/learn/grow-your-ai-workforce",
    tone: "purple",
  },
  {
    id: "sell-the-ai-workforce",
    kicker: "Sell it",
    title: "Sell the AI Workforce",
    blurb: "The packages, the live demo, the ROI numbers, the close, and the launch that gets a client to their first captured lead.",
    tag: "Sales",
    scope: ["7 lessons", "4 videos", "2 labs"],
    gate: "About 2 hours",
    cta: "Start",
    to: "/learn/sell-the-ai-workforce",
    tone: "purple",
  },
  {
    id: "builder",
    kicker: "Build it",
    title: "Wire your AI Workforce to act",
    blurb: "One build end to end: a custom tool for the job the platform does not cover, an automation that follows through, and a real API call against your own data.",
    tag: "Build",
    scope: ["7 lessons", "6 labs"],
    gate: "About 1 hour 30 minutes",
    cta: "Start",
    to: "/learn/builder",
    tone: "teal",
  },
  {
    id: "sales",
    kicker: "Learn to sell",
    title: "The master sales series",
    blurb: "Sales craft with George Leith: prospecting, the pitch, the presentation, and handling objections.",
    tag: "Sales",
    scope: ["5 lessons", "6 videos"],
    gate: "About 1 hour 20 minutes",
    cta: "Start",
    to: "/learn/sales",
    tone: "navy",
  },
  {
    id: "vendasta-services",
    kicker: "Done for you",
    title: "Work with Vendasta Services",
    blurb: "Decide what to run yourself and what to hand over, then implement an AI workforce with expert help.",
    tag: "Services",
    scope: ["5 lessons"],
    gate: "About 45 minutes",
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
  { title: "Connect your domain and email", to: "/learn/getting-started/connect-your-domain-and-email" },
  { title: "Connect payments and billing", to: "/learn/getting-started/connect-payments-and-billing" },
  { title: "Brand your platform", to: "/learn/getting-started/brand-it" },
  { title: "Turn on your own AI Receptionist", to: "/learn/getting-started/turn-on-your-own-ai-receptionist" },
  { title: "Where to get help", to: "/learn/getting-started/where-to-get-help" },
  { title: "Get set up skill check", to: "/learn/getting-started/get-set-up-skill-check" },
];

const AI_FOUNDATIONS_ITEMS: ExplorerItem[] = [
  { title: "From work to AI workforce", to: "/learn/ai-foundations/from-work-to-ai-workforce" },
  { title: "How AI Employees think", to: "/learn/ai-foundations/how-ai-employees-think" },
  { title: "Context is everything", to: "/learn/ai-foundations/context-is-everything" },
  { title: "Instructions that scale", to: "/learn/ai-foundations/instructions-that-scale" },
  { title: "Taking action", to: "/learn/ai-foundations/taking-action" },
  { title: "Agents and automations, together", to: "/learn/ai-foundations/agents-and-automations-together" },
];

const AI_WORKFORCE_ITEMS: ExplorerItem[] = [
  { title: "Meet your AI Workforce", to: "/learn/ai-workforce/meet-your-workforce" },
  { title: "Put a receptionist to work", to: "/learn/ai-workforce/put-a-receptionist-to-work" },
  { title: "Teach it to book", to: "/learn/ai-workforce/teach-it-to-book" },
  { title: "Train your AI Employee", to: "/learn/ai-workforce/train-your-employee" },
  { title: "Build a Custom AI Employee", to: "/learn/ai-workforce/custom-employee-lab" },
  { title: "Put your workforce on autopilot", to: "/learn/ai-workforce/autopilot" },
  { title: "Sell and manage your AI Workforce", to: "/learn/ai-workforce/sell-and-manage" },
];

const GROW_AI_ITEMS: ExplorerItem[] = [
  { title: "AI Receptionist", to: "/learn/grow-your-ai-workforce/ai-receptionist" },
  { title: "AI Reputation Specialist", to: "/learn/grow-your-ai-workforce/ai-reputation-specialist" },
  { title: "AI Social Media Manager", to: "/learn/grow-your-ai-workforce/ai-social-media-manager" },
  { title: "AI Blogger", to: "/learn/grow-your-ai-workforce/ai-blogger" },
  { title: "AI Sales Assistant", to: "/learn/grow-your-ai-workforce/ai-sales-assistant" },
  { title: "The specialist bench", to: "/learn/grow-your-ai-workforce/the-specialist-bench" },
  { title: "Grow your AI Workforce skill check", to: "/learn/grow-your-ai-workforce/grow-ai-workforce-skill-check" },
];

const SELL_AI_ITEMS: ExplorerItem[] = [
  { title: "Know your offer", to: "/learn/sell-the-ai-workforce/know-your-offer" },
  { title: "Get in the room", to: "/learn/sell-the-ai-workforce/get-in-the-room" },
  { title: "Demo with confidence", to: "/learn/sell-the-ai-workforce/demo-with-confidence" },
  { title: "Sell the outcome", to: "/learn/sell-the-ai-workforce/sell-the-outcome" },
  { title: "Execute the play", to: "/learn/sell-the-ai-workforce/execute-the-play" },
  { title: "Practice the pitch", to: "/learn/sell-the-ai-workforce/practice-the-pitch" },
  { title: "From signed to activated", to: "/learn/sell-the-ai-workforce/from-signed-to-activated" },
  { title: "Sell the AI Workforce skill check", to: "/learn/sell-the-ai-workforce/sell-ai-workforce-skill-check" },
];

const SALES_ITEMS: ExplorerItem[] = [
  { title: "Run the perfect sales day", to: "/learn/sales/build-your-brand-and-your-day" },
  { title: "Six habits for better prospecting", to: "/learn/sales/find-your-next-prospect" },
  { title: "Master the elevator pitch", to: "/learn/sales/open-the-conversation" },
  { title: "A killer sales presentation", to: "/learn/sales/present-so-it-lands" },
  { title: "Handle objections like a master", to: "/learn/sales/handle-objections" },
  { title: "Master sales skill check", to: "/learn/sales/master-sales-skill-check" },
];

const BUILDER_ITEMS: ExplorerItem[] = [
  { title: "Start with what the platform already does", to: "/learn/builder/start-with-what-exists" },
  { title: "Build the doorway", to: "/learn/builder/build-the-doorway" },
  { title: "Watch it work", to: "/learn/builder/watch-it-work" },
  { title: "Hand off to the automation", to: "/learn/builder/hand-off-to-the-automation" },
  { title: "Wire it to your own systems", to: "/learn/builder/wire-it-to-your-systems" },
  { title: "Call the API yourself", to: "/learn/builder/call-the-api-yourself" },
  { title: "Where the platform ends", to: "/learn/builder/where-the-platform-ends" },
  { title: "Wire to act skill check", to: "/learn/builder/wire-to-act-skill-check" },
];

const SERVICES_ITEMS: ExplorerItem[] = [
  { title: "What Vendasta Services does", to: "/learn/vendasta-services/what-vendasta-services-does" },
  { title: "Choose how the work gets done", to: "/learn/vendasta-services/choose-how-the-work-gets-done" },
  { title: "Implement your AI Workforce", to: "/learn/vendasta-services/implement-your-ai-workforce" },
  { title: "Order and launch a service", to: "/learn/vendasta-services/order-and-launch-a-service" },
  { title: "Run the work over time", to: "/learn/vendasta-services/run-the-work-over-time" },
];

// The "What's your role?" facet group (Admin / Sales / Builder) was removed
// 2026-08-19 (Cal): too few roles to be useful yet. Restore it from git history
// when the role list grows — Builder should carry a "Coming soon" badge
// (comingSoon field below) until builder content on AI, APIs, and webhooks ships.
const FOCUS_AREAS: ExplorerFacet[] = [
  { id: "setting-up", label: "Setting up your platform", items: GETTING_STARTED_ITEMS },
  { id: "selling-ai", label: "Selling the AI Workforce", items: SELL_AI_ITEMS },
  { id: "selling", label: "Learning how to sell", items: SALES_ITEMS },
  { id: "ai-to-work", label: "Putting AI to work", items: [...AI_FOUNDATIONS_ITEMS, ...AI_WORKFORCE_ITEMS, ...GROW_AI_ITEMS] },
  { id: "connecting", label: "Connecting your own systems", items: BUILDER_ITEMS },
  { id: "delivering", label: "Partnering with our services team", items: SERVICES_ITEMS },
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
