# Documentation Architecture Guide

This document outlines the technical conventions and maintenance procedures for the Vendasta Partner Center Documentation. It is intended for developers and maintainers of the Docusaurus project.

## Directory Structure

*   `docusaurus/`: The root of the Docusaurus project.
    *   `docs/`: Contains all markdown content files.
    *   `src/`: Contains React components, pages, and custom CSS.
    *   `static/`: Contains static assets like images (`static/img`).
    *   `docusaurus.config.ts`: Main configuration file.
    *   `sidebars.ts`: Sidebar configuration (mostly auto-generated).

## Redirects

We use the `@docusaurus/plugin-client-redirects` plugin to handle redirects. This is crucial when moving or renaming pages to preserve SEO and existing links.

**How to add a redirect:**
1.  Open `docusaurus/docusaurus.config.ts`.
2.  Locate the `plugins` array and the `@docusaurus/plugin-client-redirects` section.
3.  Add a new object to the `redirects` array:
    ```typescript
    { from: '/old/path', to: '/new/path' },
    ```
    *   `from`: The old URL path (can be a string or array of strings).
    *   `to`: The new URL path.

## Categories & Sidebar

We use **file-system based sidebars**. The sidebar structure mirrors the folder structure in `docusaurus/docs`.

**Customizing Categories:**
To customize how a folder appears in the sidebar (label, position, collapse state), place a `_category_.json` file inside that folder.

**Example `_category_.json`:**
```json
{
  "label": "Accounts",
  "position": 10,
  "collapsed": true
}
```
*   `label`: The text displayed in the sidebar.
*   `position`: The order relative to other items (lower numbers appear first).
*   `collapsed`: Whether the category is closed by default.

## JSON-LD (Structured Data)

JSON-LD is used to provide structured data to search engines.

**Current Implementation:**
*   *Status*: Not currently implemented globally.
*   *Future Implementation*: To add JSON-LD, we should create a custom `<Head>` component or use a plugin to inject the script tag into the `<head>` of relevant pages.