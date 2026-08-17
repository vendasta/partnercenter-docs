---
name: embed-wistia-video
description: Embed a Wistia video in a Partner Center docs page (docs/ or training/). Use whenever adding, replacing, or reviewing a Wistia video embed. Encodes the responsive embed pattern already used across docusaurus/training/sales/*.mdx and several docusaurus/docs/ pages — do not hand-roll a different markup shape or fall back to the old fixed-size iframe pattern still lingering in a few legacy pages.
---

# Embedding a Wistia video

## The canonical embed

```mdx
{/* VIDEO: "<Video title>" — Wistia ID `<id>`, <where it came from / who confirmed it>, confirmed <YYYY-MM-DD>. */}

<Sentence introducing what the video shows, e.g. "Watch sales expert George Leith build an elevator pitch that earns the next meeting.">

<div
  className="wistia_responsive_padding"
  style={{ padding: '56.25% 0 0 0', position: 'relative' }}
>
  <div
    className="wistia_responsive_wrapper"
    style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
  >
    <iframe
      src="https://fast.wistia.net/embed/iframe/<id>?web_component=true&seo=true"
      title="<Video title>"
      allow="autoplay; fullscreen"
      allowTransparency
      frameBorder="0"
      scrolling="no"
      className="wistia_embed"
      name="wistia_embed"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</div>
<script src="https://fast.wistia.net/player.js" async></script>
```

Reference implementations: [open-the-conversation.mdx](../../../docusaurus/training/sales/open-the-conversation.mdx) and [meeting-details-page.mdx](../../../docusaurus/docs/crm/my-meetings/meeting-details-page.mdx).

## Rules

1. **Always the responsive wrapper, never a bare fixed-size iframe.** A handful of legacy pages (e.g. `docs/legacy/customer-voice/index.mdx`, `docs/administration/data-management/crm-objects/index.mdx`) still use `<iframe src="//fast.wistia.com/embed/iframe/<id>" width="560" height="315">` with no wrapper and no `player.js`. That pattern is a holdover, not the target — do not copy it into new or edited content. If you touch a page that still has it, migrate it to the responsive pattern above.
2. **The `56.25% 0 0 0` padding is a fixed 16:9 ratio hack** — do not change it per video; it is what makes the iframe scale responsively instead of using a hardcoded `width`/`height` in pixels.
3. **`<script src="https://fast.wistia.net/player.js" async>` loads once per page**, immediately after the *first* embed. If a page has multiple Wistia videos (e.g. `handle-objections.mdx`), do not repeat the script tag for the second, third, etc. embed.
4. **Provenance comment above every embed.** Wistia IDs are opaque and easy to mix up (near-duplicate cuts of the same recording exist — see `build-your-brand-and-your-day.mdx`'s comment about the "Ep. 1" near-duplicate). Always leave an MDX comment directly above the embed recording: the video title, the Wistia ID, where/how it was sourced or who confirmed it, and the date. This is the only record of that provenance — the embed markup itself has no room for it.
5. **One lead-in sentence, no heading required.** The existing pattern is a short "Watch \<presenter/expert\> \<do the thing\>" sentence directly above the embed, then the embed. It does not need its own subheading; it sits under whatever heading already introduces that part of the page.
6. **`title` and the surrounding sentence should describe the video's content**, not just restate the page title — screen readers and the browser tab both surface `title`.
7. **`allowTransparency` on the iframe** is part of the current standard snippet; keep it even though a couple of older embeds predate it.

## Getting the Wistia ID

The ID is the token after `/embed/iframe/` in the share/embed URL Wistia gives you (e.g. `mbeqpwbrjx` in `fast.wistia.net/embed/iframe/mbeqpwbrjx`). Ask the user for the Wistia share link or ID and the provenance detail (who found/confirmed it and when) if it is not already given — do not guess or invent a Wistia ID.
