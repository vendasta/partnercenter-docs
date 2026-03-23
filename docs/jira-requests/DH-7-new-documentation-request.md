# Jira documentation request intake: DH-7

## Source issue
- Jira key: `DH-7`
- Jira link: [https://vendasta.jira.com/browse/DH-7](https://vendasta.jira.com/browse/DH-7)
- Project: `DH` (Document Hackathon)
- Issue type: `Task`
- Status: `STARTED - DOCUMENTATION`
- Priority: `Minor`
- Reporter: `Haley Serrano`
- Assignee: _Unassigned_

## Parsed request details
### Title
`New Documentation Request`

### Description
Submitted via Google Form with request to update an existing help article:
- Target URL: `https://partners.vendasta.com/customize-business-app/add-your-customers`
- Reported issue: Snapshot Report link on the page was not working
- Broken URL provided: `https://docs.vendasta.com/snapshot-report/what-is-a-snapshot-report`
- Additional asset reference: `https://drive.google.com/open?id=1Kkhau30_10xBZKr5kptkUwrhtmcVTK3J`

### Acceptance criteria
Explicit acceptance criteria were not provided. Interpreted acceptance criterion:
- The Snapshot Report link on the Add Your Customers page resolves to an active Snapshot Report documentation page.

### Linked documentation
- URL reference in Jira description: `https://partners.vendasta.com/customize-business-app/add-your-customers`
- No remote issue links were present at parse time.

## Automation outcome
Published documentation was updated based on the new issue description:
1. Updated the broken Snapshot Report link in:
   - `docusaurus/docs/administration/platform-settings/customize-business-app/add-your-customers-settings.mdx`
2. Added redirects for the old Snapshot Report path in:
   - `docusaurus/docusaurus.config.ts`

These redirects preserve compatibility for both old path variants:
- `/snapshot-report/what-is-a-snapshot-report`
- `/docs/snapshot-report/what-is-a-snapshot-report`
