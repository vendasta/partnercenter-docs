---
id: vibe-portability
title: Download and host a Vibe project elsewhere
sidebar_position: 5
description: Vibe projects are built on open frameworks. Download the complete source code and run it on any host that supports Node.js.
tags: [ai, vibe, app-builder, hosting, portability, open-source]
keywords: [Vibe portability, download Vibe project, self-host Vibe, TanStack Start, React, Vibe source code, Vibe hosting, Vibe export]
---

# Download and host a Vibe project elsewhere

Every project Vibe generates is a standard web application built on open frameworks — React, TanStack Start, Vite, and Tailwind CSS. There is no proprietary format, runtime, or page-builder markup. The complete source code can be downloaded and run on any host that supports Node.js.

Publishing with Vibe remains the fastest and least expensive way to put a project online. This article covers what the download contains and what is involved in hosting a project somewhere else.

:::warning
Downloading a project requires the Pro plan. On the Free and Standard plans, the `Download` button is not available.
:::

## What the download contains

The `Download` button in the editor toolbar produces a `.vibe.tar.gz` archive:

| Contents | Description |
| --- | --- |
| Source code | All application code under `src/` — routes, components, styling, and server functions |
| Configuration | `package.json`, `vite.config.ts`, `tailwind.config.ts`, and TypeScript configuration |
| Checkpoint history | A `.git` folder with a commit for every checkpoint |
| Project metadata | A `.vibe-meta/` folder describing the project name, template, and enabled connectors |

Supabase credentials are replaced with placeholders in the archive, so a self-hosted copy connects to a database configured separately.

## What runs elsewhere, and what does not

Everything Vibe generated — pages, layout, components, styling, form interfaces, and application logic — is in the download and runs on any Node.js host.

Connector-backed features depend on Vendasta platform services and stop working once the application is hosted elsewhere:

- Forms submissions routing into CRM
- Analytics data
- Reviews content
- Webchat
- CRM records
- Single sign-on

The screens continue to render after a move. Reconnecting them to another service is development work.

Generated images are served from a hosted media URL. To make a self-hosted copy fully independent of it, save those images into the project's `public/` folder and update the code to reference the local paths.

## Requirements for hosting elsewhere

- Node.js 22 or newer
- A host that runs Node.js — a virtual server, a container platform, or a managed Node hosting service. Pages are rendered on the server so that search engines and AI assistants receive complete HTML, so static file hosting is not sufficient on its own.
- A developer to run the build, deploy it, and maintain the server

## Run a downloaded project

Extract the archive and install the dependencies:

```bash
tar -xzf my-project.vibe.tar.gz
cd my-project
npm install --legacy-peer-deps
```

:::info
`--legacy-peer-deps` is required because the project includes a development-only plugin that supports the visual editor. It has no effect on the built application.
:::

Start the development server:

```bash
npm run dev
```

The terminal prints a local address, such as `http://localhost:8080`, which serves the application with live reload.

## Build for production

```bash
npm run build
```

The build writes a self-contained `dist/` folder:

- `dist/client` — the static files a browser downloads
- `dist/server` — the bundle that renders each page as complete HTML

The `dist/` folder does not require `node_modules`, so it is the only artifact that has to reach a server.

The server bundle exports a standard web request handler rather than starting a server itself, so hosting it requires a small entry file that serves static assets from `dist/client` and passes every other request to the renderer. The complete entry file is in the [Business App help article](https://docs.businessapp.io/business-app/ai/vibe/guides/download-and-self-host).

## What changes after a move

| Publishing with Vibe | Hosting elsewhere |
| --- | --- |
| Servers, scaling, and uptime are managed | Infrastructure is provisioned, monitored, and paid for separately |
| SSL certificates are issued and renewed automatically | Certificates are managed separately |
| Custom domains are configured with guided DNS verification | DNS and certificates are configured manually |
| A new version is live seconds after each publish | Each change requires a rebuild and redeploy |
| Connectors are already wired to platform data | Forms, analytics, reviews, chat, CRM, and sign-on are rebuilt against other services |
| Platform security updates are applied automatically | The server and its dependencies are patched manually |
| Changes are made by describing them in chat | Changes are made by editing source code |

## Frequently asked questions

<details>
<summary>Which plan includes downloading a project?</summary>

The Pro plan. The `Download` button is not available on the Free or Standard plans. See the plan comparison in [Vibe credits](https://docs.businessapp.io/business-app/ai/vibe/credits).

</details>

<details>
<summary>Which frameworks does Vibe generate?</summary>

React 19 with TypeScript, TanStack Start for routing and server rendering, Vite for builds, Tailwind CSS for styling, and the shadcn/ui component library. All of them are open source.

</details>

<details>
<summary>Does a downloaded archive keep working after a subscription ends?</summary>

A downloaded archive runs independently of Business App. Download a copy before deactivating a subscription, because projects are removed from Business App when a base subscription is deactivated.

</details>

<details>
<summary>Do edits made outside Vibe sync back into the project?</summary>

No. A download is a snapshot. Editing continues in one place at a time — either in Vibe, or in the downloaded copy.

</details>

<details>
<summary>Can a Vibe project be hosted as static files?</summary>

Not without changes. Pages are rendered on the server, which is what allows search engines and AI assistants to read complete HTML, so a Node.js host is required.

</details>

<details>
<summary>What happens to forms and analytics after a move?</summary>

Those features are powered by Vendasta platform services and work while the application is published with Vibe. The interface still renders after a move, and reconnecting it to a replacement service is development work.

</details>

## Related

- [Vibe](./vibe.md) — Feature overview and how the builder works
- [Download and host your project elsewhere](https://docs.businessapp.io/business-app/ai/vibe/guides/download-and-self-host) — Step-by-step guide, including the server entry file
- [TanStack Start](https://tanstack.com/start/latest) — The framework Vibe applications are built on
