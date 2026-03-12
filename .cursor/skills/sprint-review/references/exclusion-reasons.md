# Exclusion reason reference

Detailed catalog of exclusion reasons for the sprint review skill. Use this to classify items consistently across transcript reviews.

## Reason categories

### 1. Not explicitly stated as released

The item was mentioned but the transcript contains no explicit statement that it is GA, live, shipped, or available to partners. This is the default exclusion reason when release-status language is absent.

**Applies when:**
- A feature is demonstrated but no one says it is released
- A feature is described technically but availability is not mentioned
- A speaker says "we built this" without saying it is live

### 2. Unreleased; roadmap or future work

The transcript explicitly places the item in a future timeframe.

**Trigger phrases:**
- "Next sprint" / "next quarter" / "Q3" / "by end of year"
- "Coming soon" / "planned" / "on the roadmap"
- "We'll be working on" / "scheduled for"
- "Should be ready by"

### 3. Pre-release; not GA

The item is explicitly described as being in a pre-release state.

**Trigger phrases:**
- "Beta" / "alpha" / "preview" / "early access"
- "Limited release" / "invite only" / "selected partners"
- "Opt-in" (when combined with pre-release context)

### 4. Internal; not partner-facing

The item is described as internal tooling, process improvement, or something not visible to partners.

**Trigger phrases:**
- "Internal only" / "internal tool" / "for our team"
- "Admin-side only" / "back-office"
- "Not partner-facing" / "not customer-visible"

### 5. Speculative; not committed

The item is discussed as an idea, exploration, or possibility without commitment.

**Trigger phrases:**
- "We're exploring" / "thinking about" / "considering"
- "Might" / "could" / "if we decide to"
- "Nothing committed" / "TBD"
- "One option is" / "we could potentially"

### 6. Behind a feature flag; not generally available

The item exists in production but is gated and not available to all partners.

**Trigger phrases:**
- "Behind a feature flag" / "flag-gated"
- "Dark launch" / "soft launch"
- "Only enabled for [specific group]"

### 7. Ambiguous; cannot safely document

The transcript gives contradictory or unclear signals about release state.

**Examples:**
- "It's released but still in beta" (contradictory)
- Speaker A says released, Speaker B says not yet (conflicting)
- Feature described without any context about availability

### 8. Not relevant to Partner Center docs

The item is about infrastructure, architecture, internal tooling, or a product outside the scope of Partner Center documentation.

**Examples:**
- Database migration details
- CI/CD pipeline changes
- Internal monitoring or alerting
- Products with separate documentation (e.g. Yesware/Yeswware, Broadly)

**Note:** Sprint reviews may cover multiple product teams. Items related to Yesware, Broadly, or other products that are not documented in this repository should always be excluded, even if explicitly stated as released.

### 9. Mentioned in discussion but not actionable

The item came up in Q&A, side conversation, or commentary but is not a discrete feature or change that can be documented.

**Examples:**
- "We should probably also look at X sometime"
- Casual mention during unrelated discussion
- Opinion or feedback without a concrete change

## Using multiple reasons

Some items may fit more than one category. Use the **most specific** reason. If equally applicable, list the primary reason first.

**Example:** A feature described as "we're exploring adding it behind a feature flag next quarter" fits reasons 2, 5, and 6. Use: "Speculative; described as future exploration behind a feature flag."
