// The Learn journey: one hand-curated record per path, in sidebar order.
// Feeds Start here (training/index.mdx): the totals strip, the stepper, and
// the router cards all read from this file, so a path that gains or loses a
// step is edited here once. Time and level mirror each path's PathHeader;
// step counts are the listed steps (skill checks are listed separately so
// the stepper can show them as the last row). Added 2026-10-08, Start here
// redesign; see OUTPUTS/learn-tab-sidebar-reorg/ in Cal's workspace.

export interface JourneyStep {
  title: string;
  to: string;
  description: string;
}

export interface JourneyStage {
  /** Anchor id: /learn#id opens this stage. Matches the path's URL slug. */
  id: string;
  title: string;
  /** One line shown under the title while collapsed. */
  tagline: string;
  /** Free text such as "2 h 15 min". Parsed for the totals strip. */
  time?: string;
  level?: string;
  /** One short format badge, or none. Keep to one so the chip row stays readable. */
  badge?: string;
  /** Paragraph shown when expanded, above the steps. */
  blurb: string;
  to: string;
  steps: JourneyStep[];
  skillCheck?: { to: string; questions: number };
  /** A reference page rather than a path: book glyph, Open instead of Start. */
  reference?: boolean;
}

export const JOURNEY: JourneyStage[] = [
  {
    id: "getting-started",
    title: "Get set up",
    tagline: "Make the platform yours, then bring in your first client.",
    time: "2 h 15 min",
    level: "Beginner",
    badge: "No code needed",
    blurb: "You leave with email sending from your own domain, payments collecting on their own, your brand on everything a client sees, an AI Receptionist on your own website, and your first client account live with a product on it.",
    to: "/learn/getting-started",
    steps: [
      { title: "How the platform works", to: "/learn/getting-started/how-the-platform-works", description: "the white-label model, the two workspaces, and where your team and your AI Employees live" },
      { title: "Connect your domain and email", to: "/learn/getting-started/connect-your-domain-and-email", description: "every email the platform sends arrives from your business" },
      { title: "Connect payments and billing", to: "/learn/getting-started/connect-payments-and-billing", description: "the wholesale-to-retail model, the Stripe decision, and billing that collects on its own" },
      { title: "Brand your platform", to: "/learn/getting-started/brand-your-platform", description: "your logo and color across both workspaces, and which pages clients see" },
      { title: "Turn on your own AI Receptionist", to: "/learn/getting-started/turn-on-your-own-ai-receptionist", description: "configure it, give it knowledge, test it, and put the widget on your site" },
      { title: "Add your first client", to: "/learn/getting-started/add-your-first-client", description: "the account, a product live on it, and the invite that opens their Business App" },
      { title: "What your client sees first", to: "/learn/getting-started/what-your-client-sees-first", description: "the onboarding email, their Home page, and the three settings on your side that decide it" },
      { title: "Where to get help", to: "/learn/getting-started/where-to-get-help", description: "the AI assistant, two documentation sites, your Client Success team, webinars, and Vendasta Services" },
    ],
    skillCheck: { to: "/learn/getting-started/skill-check", questions: 10 },
  },
  {
    id: "hire-your-first-ai-employee",
    title: "Hire your first AI Employee",
    tagline: "Run a receptionist for yourself, then deploy one for a client.",
    time: "1 h 40 min",
    level: "Beginner to Intermediate",
    badge: "No code needed",
    blurb: "Put one AI Employee to work for a real business and prove it. You run a receptionist for your own front desk first, teach it to book on a real calendar, train it to answer accurately, then deploy one for a client on their account and test it before you hand it over.",
    to: "/learn/hire-your-first-ai-employee",
    steps: [
      { title: "Meet the AI Employees", to: "/learn/hire-your-first-ai-employee/meet-the-ai-employees", description: "the five-employee team working for your own business, and the three parts they all share" },
      { title: "Put a receptionist to work", to: "/learn/hire-your-first-ai-employee/put-a-receptionist-to-work", description: "why you hire for yourself first, chat or voice, and the ten-question audit before anyone meets it" },
      { title: "Connect calendars and booking", to: "/learn/hire-your-first-ai-employee/connect-calendars-and-booking", description: "calendars, booking links, and call routing by business hours" },
      { title: "Train your AI Employee", to: "/learn/hire-your-first-ai-employee/train-your-ai-employee", description: "audit what it knows, fix the source, write a guardrail, and re-test" },
      { title: "Deploy a receptionist for a client", to: "/learn/hire-your-first-ai-employee/deploy-a-receptionist-for-a-client", description: "configure the receptionist that belongs to your client and run the go-live test" },
    ],
    skillCheck: { to: "/learn/hire-your-first-ai-employee/skill-check", questions: 12 },
  },
  {
    id: "know-what-youre-selling",
    title: "Know what you're selling",
    tagline: "Every AI Employee, the job it does on day one, and the edition that carries it.",
    time: "1 h",
    level: "Beginner",
    badge: "No code needed",
    blurb: "Meet every AI Employee you will put in front of a client. Each step takes one of the five core AI Employees, shows the job it does on day one, and names the product and edition that carry it, so you quote the right thing before you activate anything. The last step covers the Specialist AI Employees.",
    to: "/learn/know-what-youre-selling",
    steps: [
      { title: "AI Receptionist", to: "/learn/know-what-youre-selling/ai-receptionist", description: "every call, text, and web chat answered, at any hour" },
      { title: "AI Reputation Specialist", to: "/learn/know-what-youre-selling/ai-reputation-specialist", description: "every review answered on brand, sensitive cases flagged for you" },
      { title: "AI Social Media Manager", to: "/learn/know-what-youre-selling/ai-social-media-manager", description: "a social calendar generated, scheduled, and published on its own" },
      { title: "AI Blogger", to: "/learn/know-what-youre-selling/ai-blogger", description: "SEO-ready posts written and published to WordPress on schedule" },
      { title: "AI Sales Assistant", to: "/learn/know-what-youre-selling/ai-sales-assistant", description: "every conversation captured, the CRM current without typing" },
      { title: "Specialist AI Employees", to: "/learn/know-what-youre-selling/specialist-ai-employees", description: "the data analyst, support, and inside sales builds, and when to bring them in" },
    ],
    skillCheck: { to: "/learn/know-what-youre-selling/skill-check", questions: 10 },
  },
  {
    id: "make-your-first-sale",
    title: "Make your first sale",
    tagline: "The packages, the live demo, the close, and the launch to a first captured lead.",
    time: "2 h",
    level: "Beginner",
    badge: "No code needed",
    blurb: "Your prospects do not buy AI. They buy captured leads, faster response times, and lower payroll. This path covers the AI Workforce packages, your best-fit first prospects, a live demo on any prospect's website, discovery and objections, the proposal, a rehearsal against a skeptical AI business owner, and the launch sequence that takes a signed client to their first captured lead.",
    to: "/learn/make-your-first-sale",
    steps: [
      { title: "Your packages and pricing", to: "/learn/make-your-first-sale/your-packages-and-pricing", description: "the packages, the retention math behind them, and one opening line tuned to any business" },
      { title: "Find your first prospects", to: "/learn/make-your-first-sale/find-your-first-prospects", description: "your best-fit first clients, why your existing book beats any cold list, and the words that open the door" },
      { title: "Build a live demo", to: "/learn/make-your-first-sale/build-a-live-demo", description: "the five to lead with, the three to grow into, and the five-minute live demo" },
      { title: "Run the sales call", to: "/learn/make-your-first-sale/run-the-sales-call", description: "the four discovery questions, the timed demo, the objection responses, and the pre-call ROI ritual" },
      { title: "Propose and close", to: "/learn/make-your-first-sale/propose-and-close", description: "which kit to open with, the Three Baskets proposal, and the ask" },
      { title: "Practice the pitch", to: "/learn/make-your-first-sale/practice-the-pitch", description: "call Vendasta Pitch Partner and handle two live objections" },
      { title: "Get your client live", to: "/learn/make-your-first-sale/get-your-client-live", description: "live in 7 days, first lead in 14, and the proof point you capture" },
    ],
    skillCheck: { to: "/learn/make-your-first-sale/skill-check", questions: 12 },
  },
  {
    id: "connect-your-own-systems",
    title: "Connect your own systems",
    tagline: "One build end to end: a custom tool, an automation, a webhook, and a real API call.",
    time: "2 h 10 min",
    level: "Intermediate",
    badge: "Some API work",
    blurb: "An AI Employee for a home-services client that books jobs on a real calendar, saves every lead to the CRM, and checks the weather before it confirms outdoor work. Three steps need no code at all: the first, the automation handoff, and autopilot. The rest reach outside the platform with a custom tool, a webhook, a scoped API token, and a booking into a system your client already runs.",
    to: "/learn/connect-your-own-systems",
    steps: [
      { title: "Start with what the platform already does", to: "/learn/connect-your-own-systems/start-with-what-the-platform-already-does", description: "what makes a system connectable, the ladder from a setting to custom code, and the one job left over" },
      { title: "Build a custom tool", to: "/learn/connect-your-own-systems/build-a-custom-tool", description: "a working call becomes a custom tool, and a prompt gives it judgment" },
      { title: "Test the tool", to: "/learn/connect-your-own-systems/test-the-tool", description: "test where it runs, read what it did, and isolate a failing call" },
      { title: "Hand off to the automation", to: "/learn/connect-your-own-systems/hand-off-to-the-automation", description: "trigger scope, guarding a trigger, and the follow-through worker" },
      { title: "Put your workforce on autopilot", to: "/learn/connect-your-own-systems/put-your-workforce-on-autopilot", description: "automations that run when nobody is in the conversation" },
      { title: "Send data out with a webhook", to: "/learn/connect-your-own-systems/send-data-out-with-a-webhook", description: "send data out with a webhook and start an automation from outside" },
      { title: "Call the API yourself", to: "/learn/connect-your-own-systems/call-the-api-yourself", description: "a real call against your own data, in the browser, with no code" },
      { title: "Book into an outside system", to: "/learn/connect-your-own-systems/book-into-an-outside-system", description: "a booking that lands in the scheduling system your client already runs" },
      { title: "When to hand off to a developer", to: "/learn/connect-your-own-systems/when-to-hand-off-to-a-developer", description: "the custom-code line, handing it off well, and productizing what you built" },
    ],
    skillCheck: { to: "/learn/connect-your-own-systems/skill-check", questions: 12 },
  },
  {
    id: "sales-assets",
    title: "Your sales assets",
    tagline: "Rebrandable kits, the ROI calculator, success stories, and the sales videos.",
    badge: "Reference",
    blurb: "Everything you reach for during a sale, on one page. Not a path: open it when you need it and keep it open while you work through Make your first sale.",
    to: "/learn/sales-assets",
    reference: true,
    steps: [
      { title: "Sales kits, ready to rebrand", to: "/learn/sales-assets#sales-kits-ready-to-rebrand", description: "pitch decks, one-pagers, and images for the whole AI Workforce and for each AI Employee" },
      { title: "Numbers and proof", to: "/learn/sales-assets#numbers-and-proof", description: "the AI ROI Calculator and the success stories library, filtered by AI Employee" },
      { title: "Sales videos", to: "/learn/sales-assets#sales-videos", description: "the pitch foundation, the live demo, the discovery framework, and the Three Baskets proposal" },
      { title: "Rehearse and keep learning", to: "/learn/sales-assets#rehearse-and-keep-learning", description: "the Vendasta Pitch Partner line and the on-demand webinar bootcamps" },
    ],
  },
];

/** "2 h 15 min" -> 135. Unparseable or missing -> 0. */
export function parseMinutes(time?: string): number {
  if (!time) return 0;
  const h = /(\d+)\s*h/.exec(time);
  const m = /(\d+)\s*min/.exec(time);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

export function formatHours(minutes: number): string {
  const h = Math.round(minutes / 60);
  return `about ${h} hour${h === 1 ? "" : "s"}`;
}

export function journeyTotals(stages: JourneyStage[]) {
  const paths = stages.filter((s) => !s.reference);
  return {
    paths: paths.length,
    steps: paths.reduce((n, s) => n + s.steps.length, 0),
    minutes: paths.reduce((n, s) => n + parseMinutes(s.time), 0),
    skillChecks: paths.filter((s) => s.skillCheck).length,
  };
}
