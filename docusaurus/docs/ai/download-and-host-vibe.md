---
id: download-and-host-vibe
title: Download and host a Vibe project elsewhere
sidebar_position: 5
description: Vibe projects are built on open frameworks. On the Pro plan, download the complete source code and run it on any host that supports Node.js.
tags: [ai, vibe, app-builder, hosting, portability, open-source]
keywords: [Vibe portability, download Vibe project, self-host Vibe, TanStack Start, React, Vibe source code, Vibe hosting, Vibe export]
---

# Download and host a Vibe project elsewhere

Every project Vibe generates is a standard web application built on open frameworks — React, TanStack Start, Vite, and Tailwind CSS. There is no proprietary format, runtime, or page-builder markup. The complete source code can be downloaded and run on any host that supports Node.js.

Publishing with Vibe remains the fastest and least expensive way to put a project online. This article covers what the download contains and what is involved in hosting a project somewhere else.

:::info
Downloading a project requires the Pro plan. On the Free and Standard plans, `Download` shows a lock and opens an upgrade prompt instead. See the plan comparison in [Vibe credits](https://docs.businessapp.io/business-app/ai/vibe/credits).
:::

:::warning
Deactivating a base subscription removes the Vibe projects from Business App, whether the deactivation is deliberate or follows a failed payment. Download a copy of anything worth keeping while the subscription is active, and save the generated images into the project's `public/` folder before the project is removed.
:::

## What the download contains

The `Download` button in the editor toolbar produces a `.vibe.tar.gz` archive named after the project:

| Contents | Description |
| --- | --- |
| Source code | All application code under `src/` — routes, components, styling, and server functions |
| Configuration | `package.json`, `vite.config.ts`, `tailwind.config.ts`, and TypeScript configuration |
| Checkpoint history | A `.git` folder with a commit for every checkpoint |
| Project metadata | A `.vibe-meta/` folder describing the project name, template, and enabled connectors |

Three things are not in the archive:

- **Generated images.** Images Vibe created are served from a hosted media URL that the code points at. They keep loading after a move, but they are not files in the project, and they are not under the client's control. Save them into the project's `public/` folder and update the paths before a move or a deactivation, and the copy is fully independent.
- **Discovery files.** `robots.txt`, `sitemap.xml`, and `llms.txt` are generated on each publish with Vibe. A build run elsewhere does not produce them.
- **Database credentials.** Vibe projects can store data in a Supabase database through the Supabase connector. The archive carries placeholder values such as `YOUR_SUPABASE_PROJECT` in place of the real connection details. A developer searches the project for those placeholders and fills in the client's own Supabase project URL and keys before the self-hosted copy can reach a database. A Supabase project has two keys, and they are not interchangeable: the anon key is meant for code that runs in the browser, and the service-role key bypasses row-level security and belongs only in server code. Never give the service-role key a `VITE_` prefix, because Vite puts every `VITE_` variable into the browser bundle, where any visitor can read it.

:::warning
The `.git` folder holds earlier versions of every file. A credential that was written into a project at any point can remain readable in that history even when the current files show a placeholder. Do this before sharing the folder with anyone, pushing the project to a git host, or deploying it: delete the `.git` folder with `rm -rf .git` if the checkpoint history is not needed, or rotate every key that was ever used in the project if it is. Delete the original `.vibe.tar.gz` file as well, because it carries the same history.
:::

## What runs elsewhere, and what does not

Everything Vibe generated — pages, layout, components, styling, form interfaces, and application logic — is in the download and runs on any Node.js host.

Connector-backed features depend on Vendasta platform services and stop working once the application is hosted elsewhere:

- Form submissions routing into CRM
- Analytics data
- Reviews content
- Webchat
- CRM records

The screens continue to render after a move. Reconnecting them to another service is development work.

Single sign-on is different, because it decides who sees a page rather than what a page displays. The OAuth client stays on the Vendasta platform, so a moved copy cannot complete a sign-in. Open every gated page in a private browser window after a move and confirm it does not show its contents to a visitor who is not signed in. If one does, stop the move: leave the domain pointed at the published site until a developer repairs the sign-in check.

## Requirements for hosting elsewhere

- Node.js 22 or newer
- A host that runs Node.js — a virtual server, a container platform, or a managed Node hosting service. Pages are rendered on the server so that search engines and AI assistants receive complete HTML, so static file hosting is not sufficient on its own.
- A developer to run the build, deploy it, and maintain the server

<!-- The commands in this section and in "Build for production" below also
     appear in businessapp-docs at
     docusaurus/docs/business-app/ai/vibe/guides/download-and-self-host.md,
     which is the canonical copy and owns the server entry file. Change both. -->

## Run a downloaded project

The archive has no folder of its own inside it, so extract it into one you create. The file name below is an example; use the name of the downloaded file:

```bash
mkdir my-project
tar -xzf my-project.vibe.tar.gz -C my-project
cd my-project
npm install --legacy-peer-deps
```

If the shell reports that the folder already exists, choose a name that is not in use. The extraction runs into the existing folder otherwise.

:::info
`--legacy-peer-deps` is required because the project includes a development-only plugin that supports the visual editor. It has no effect on the built application.
:::

Start the development server:

```bash
npm run dev
```

The terminal prints a local address, which serves the application with live reload.

<!-- Second copy: see the note above "Run a downloaded project". -->

## Build for production

```bash
npm run build
```

The build writes a `dist/` folder:

- `dist/client` — the static files a browser downloads
- `dist/server` — the bundle that renders each page as complete HTML

`dist/` does not require `node_modules`. The server bundle exports a standard web request handler rather than starting a server itself, so hosting it also needs a small entry file that serves static assets from `dist/client` and passes every other request to the renderer. Those two things — the `dist/` folder and that entry file — are what reach the server.

The complete entry file, along with the HTTPS and restart configuration a production server needs, is in the Business App help article linked below.

## Moving a live site

A site on a custom domain is moved in this order, which makes the interruption as short as it can be:

1. Download the project and save the generated images into `public/`.
2. Build the new host and test it on a temporary address.
3. Point the domain's DNS at the new host.
4. Issue the certificate. Most hosts use an HTTP-01 challenge, which only succeeds once the DNS points at the new host, so this step follows step 3. A host using a DNS-01 challenge can issue the certificate earlier.
5. Test the domain over HTTPS, including every page that sits behind a sign-in.
6. Deactivate the Business App subscription.

There is a gap between steps 3 and 4 on a host that uses an HTTP-01 challenge: the domain points at the new host, and the certificate is not issued yet, so visitors see an HTTPS error for the minutes that takes. A host that uses a DNS-01 challenge issues the certificate before the DNS change and removes the gap. Getting the order wrong costs more than the gap does: deactivating first takes the published site down while the new host is not yet serving the domain.

## What changes after a move

| Publishing with Vibe | Hosting elsewhere |
| --- | --- |
| Servers, scaling, and uptime are managed | Infrastructure is provisioned, monitored, and paid for separately |
| A failed process is restarted automatically | The process is monitored and restarted manually |
| SSL certificates are issued and renewed automatically | Certificates are managed separately |
| Custom domains are configured with guided DNS verification | DNS and certificates are configured manually |
| A new version is live seconds after each publish | Each change requires a rebuild and redeploy |
| Discovery files are generated on every publish | `robots.txt`, `sitemap.xml`, and `llms.txt` are produced and maintained separately |
| Connectors are already wired to platform data | Forms, analytics, reviews, chat, CRM, and sign-on are rebuilt against other services |
| Platform security updates are applied automatically | The server and its dependencies are patched manually |
| Changes are made by describing them in chat | Changes are made by editing source code |

## Frequently asked questions

<details>
<summary>Which plan includes downloading a project?</summary>

The Pro plan. On the Free and Standard plans, `Download` shows a lock and opens an upgrade prompt instead. See the plan comparison in [Vibe credits](https://docs.businessapp.io/business-app/ai/vibe/credits).

</details>

<details>
<summary>Which frameworks does Vibe generate?</summary>

React with TypeScript, TanStack Start for routing and server rendering, Vite for builds, Tailwind CSS for styling, and the shadcn/ui component library. All of them are open source. [Vibe](./vibe.md) lists the stack in full.

</details>

<details>
<summary>Does a downloaded archive keep working after a subscription ends?</summary>

A downloaded archive runs independently of Business App. Download a copy before deactivating a subscription, because projects are removed from Business App when a base subscription is deactivated. Generated images are the exception: they are served from a hosted URL rather than stored in the archive, so save the ones worth keeping into the project's `public/` folder first.

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
- [Business App: the full procedure, with the server entry file](https://docs.businessapp.io/business-app/ai/vibe/guides/download-and-self-host)
- [TanStack Start](https://tanstack.com/start/latest) — The framework Vibe applications are built on
