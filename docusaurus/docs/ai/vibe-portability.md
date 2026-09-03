---
id: vibe-portability
title: Vibe portability and code ownership
description: Vibe builds on open frameworks. Partners and their clients can download the complete source code and host it anywhere, with no lock-in to Vendasta hosting.
tags: [ai, vibe, app-builder, hosting, portability, open-source]
keywords: [Vibe portability, Vibe lock-in, Vibe open source, download Vibe project, self-host Vibe, TanStack Start, React, Vibe source code, Vibe hosting]
---

# Vibe portability and code ownership

Vibe is an AI builder, not a closed platform. Every project it produces is a standard web application written in open frameworks — React, TanStack Start, Vite, and Tailwind CSS — and the complete source code can be downloaded and hosted anywhere at any time.

This page is for the conversation that comes up with agencies and enterprise partners: "if we build our clients' sites here, are we locking them in?" The answer is no, and this page gives you the specifics to back it up.

## The short answer

- **The output is portable.** A Vibe project is React and TanStack Start source code. There is no proprietary format, runtime, or page-builder markup.
- **The code is downloadable.** One click in the editor toolbar produces an archive with all source, all assets, and the git history of every checkpoint.
- **It runs on standard infrastructure.** The built app is a Node.js application. It runs on a VPS, a container platform, or any managed Node host.
- **The frameworks are mainstream.** TanStack Start is the same framework family used across the major consumer hosting platforms, and React needs no introduction. Any web developer can pick the project up.
- **Hosting with Vibe stays the better deal.** Portability is the safety net; publishing with Vibe is one click, includes SSL and custom domains, and costs less than running servers.

## What a partner can tell a client

A client who insists on an open platform because they want transferability is asking for exactly what Vibe delivers. The distinction worth drawing is between the builder and the output:

- **Vibe is the AI builder component.** It is where the app gets created and edited by describing changes in plain language.
- **What it produces is a portable website or application.** That artifact is not tied to Vibe, and it is not tied to Vendasta hosting.

If a client ever wants to take a site elsewhere, they download it and go. Nothing needs to be rebuilt, and no data is held hostage.

## What's in the download

The `Download` button in the editor toolbar, available on the Pro plan, produces a `.vibe.tar.gz` archive containing:

| Contents | Description |
| --- | --- |
| Source code | All application code under `src/` — routes, components, styling, and server functions |
| Configuration | `package.json`, `vite.config.ts`, `tailwind.config.ts`, and TypeScript configuration |
| Checkpoint history | A `.git` folder with a commit for every checkpoint |
| Project metadata | A `.vibe-meta/` folder describing the project name, template, and enabled connectors |

Supabase credentials are replaced with placeholders in the download, so a self-hosted copy connects to a database the client controls.

## What moves, and what stays behind

Everything the AI wrote — pages, layout, components, styling, forms UI, business logic — is in the download and runs anywhere.

Connector-backed features are wired to Vendasta platform services and stop functioning once the app is hosted elsewhere: Forms submissions routing to CRM, Analytics, Reviews, Webchat, CRM records, and single sign-on. The screens still render; a developer repoints them at whatever the client wants to use instead. This is the practical argument for staying on Vibe hosting — those integrations are the part that is expensive to rebuild, and they come for free while the app is published with Vibe.

Generated images are served from a hosted media URL. A fully independent copy saves them into the project's `public/` folder and references the local paths.

## Running a downloaded project

The steps below need Node.js 22 or newer. They are worth knowing so you can answer the question confidently, but a client's developer will find nothing unusual here.

```bash
tar -xzf my-project.vibe.tar.gz
cd my-project
npm install --legacy-peer-deps
npm run dev
```

The dev server prints a local address and serves the app with live reload. To produce a release build:

```bash
npm run build
```

The build writes a self-contained `dist/` folder: `dist/client` holds the static assets a browser downloads, and `dist/server` holds the bundle that renders each page as complete HTML. The `dist/` folder does not need `node_modules`, so it is the only artifact that has to reach a server.

:::info
`--legacy-peer-deps` is required because the project carries a development-only plugin that powers the visual editor. It has no bearing on the built application.
:::

Because pages are server-rendered, the app needs a Node.js host rather than static file hosting. The server bundle exports a standard web request handler, so a small entry file — roughly 25 lines — serves static assets from `dist/client` and passes everything else to the renderer. The step-by-step version, including that entry file, is in the Business App help article linked below.

## Positioning against the alternative

Portability is the answer to the objection. It is not the reason to self-host.

| Included when publishing with Vibe | Taken on when self-hosting |
| --- | --- |
| Servers, scaling, and uptime | Provisioning, monitoring, and infrastructure cost |
| SSL certificates issued and renewed automatically | Certificate management |
| Custom domain setup with DNS verification | Manual DNS and certificate configuration |
| A new version live seconds after each publish | Rebuild and redeploy on every change |
| Connectors already wired to platform data | Rebuilding forms, analytics, reviews, chat, CRM, and sign-on |
| Platform security updates | Server and dependency patching |
| Editing by describing a change in chat | Editing source code, or paying a developer to |

The strongest version of the pitch is that both are true at once: clients are never locked in, and almost none of them will want to leave.

## Frequently asked questions

<details>
<summary>Is Vibe an open-source platform?</summary>

Vibe itself is Vendasta's AI builder. What it generates is built entirely on open-source frameworks — React, TanStack Start, Vite, and Tailwind CSS — so the output a client receives carries no proprietary dependency.

</details>

<details>
<summary>Does the client need a subscription to keep code they downloaded?</summary>

No. A downloaded archive is theirs to keep and run. Download before deactivating a subscription, since projects are removed from Business App when a base subscription is deactivated.

</details>

<details>
<summary>Can a site be moved back into Vibe after it is edited elsewhere?</summary>

Edits made outside Vibe do not sync back into the Vibe project. Treat a download as a snapshot and keep active editing in one place.

</details>

<details>
<summary>Can a Vibe site be hosted as static files?</summary>

Not without changes. Pages are rendered on the server so that search engines and AI assistants receive complete HTML, which is why a Node.js host is required.

</details>

<details>
<summary>What happens to forms and analytics after a move?</summary>

Those features are powered by Vendasta platform services and only work while the app is published with Vibe. The UI still renders after a move, and a developer connects it to a replacement service.

</details>

## Related

- [Vibe](./vibe.md) — Feature overview and how the builder works
- [Download and host a project elsewhere](https://docs.businessapp.io/business-app/ai/vibe/guides/download-and-self-host) — Full step-by-step guide, including the server entry file
- [TanStack Start](https://tanstack.com/start/latest) — The framework Vibe applications are built on
