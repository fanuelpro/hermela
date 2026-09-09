# BLUEPRINT.md — HERMELA ASHENAFI ASSEFA
### The Living Architecture of a Digital Home
**Status:** Foundational document. Read before any file is touched. Every design or copy decision made anywhere in this codebase must trace back to a line in this file. If it doesn't, it doesn't belong on the site.

---

## 0. A CORRECTION MADE IN GOOD FAITH — READ FIRST

The build brief instructs an "Abyssal Deep" palette (graphite/obsidian) and cites it as Hermela's chosen environment for inner peace. **Her actual survey answer to 3.1 was (B) The Elevated High-Key** — "wide, open spaces dominated by optical off-whites, warm alabaster, and raw linen tones." The Abyssal Deep language appears to be a copy error carried over from a template.

This is not a small detail — it is the single most load-bearing decision in the entire system, and building on the wrong one would mean designing a home for someone who isn't her. I am overriding the brief's stated palette and building on her verbatim answer instead, for three reasons:

1. She answered A) "Sovereign Structure" for glamour and (5.3) chose Intrigue & Depth **fused with** Inspiration & Vitality — not Awe & Authority. Awe & Authority is the archetype an Abyssal Deep, all-black site would produce. High-key luminosity is what produces "fresh, luminous, deeply grounded" — her words.
2. An all-obsidian site has been done a thousand times for pageant queens and models. It is the generic default for "elite" personal brand sites. Elevated High-Key on a woman who is also a computer scientist and project manager is rarer, and true to her.
3. Depth doesn't require darkness. We build depth through *shadow within light* — deep graphite typography and imagery set into vast alabaster fields, so the darkness becomes punctuation, not environment. This gives us both: the "layers to uncover" of Intrigue & Depth, delivered through a luminous, vital field rather than a dark one.

**Resolution:** Elevated High-Key is the base environment. Graphite/obsidian survive as the *ink* — typography, hairlines, structural elements, and the deep-shadow photography grade — never as the dominant field. This is noted so any future session understands why the site is bright, not dark, despite the original brief.

---

## 1. THE PERSON (do not paraphrase her away)

**Hermela Ashenafi Assefa**, 23. Computer Science graduate, project manager, model, digital creator. 4th runner-up, Miss Ethiopia 2026. Reigning **Miss Tourism Ethiopia** (Aug 2026). Preparing to represent Ethiopia at **Miss Tourism Africa**, Nigeria (Sep 2026).

**Archetype: The Intellectual Alchemist.** She sits at the intersection of rigid structural logic and fluid aesthetic expression, and refuses to resolve that tension — it IS the brand. Leadership language: Strategic Innovation ("disrupting standard patterns, introducing novel concepts, challenging assumptions"). Brand posture: Humanistic Visionary — tech and fashion as tools for empowerment, not spectacle.

**Her own words, to be used verbatim or near-verbatim as real copy (never paraphrased into marketing-speak):**
- On influence: *"Influence is a tool best used to empower others, challenge perspectives, and create meaningful change."*
- On beauty: *"True beauty is not about becoming someone else's idea of perfection — it is about embracing who you are and having the courage to define your own."*
- On technology: *"True innovation is not just about creating more powerful systems; it is about creating technology that understands human needs, respects human values, and solves problems that truly matter."*
- On mornings: *"Every morning begins with movement. I dance to reconnect with myself... mornings are not just about productivity; they are about creating a moment of connection with myself before I give my energy to everything else."*
- On her curiosity: philosophy, psychology, neuroscience and neuroplasticity, guitar and singing, travel — *"we may have far more potential to grow, create, and transform than we currently understand."*
- On entry emotion (5.3), verbatim: *"I want them to feel curiosity first... my presence to tell a story of continuous evolution... The feeling I want to create is not just admiration, but connection."*
- Icons: Maya Angelou (voice as connection), Cleopatra (femininity fused with intellect and command), Carl Jung (self-awareness as the root of growth).
- Wardrobe commandments: (1) every outfit tells a story, (2) dress with intention and a touch of whimsy, (3) know your own silhouette and wear it with confidence.
- Sound: Cinematic Scale (Max Richter, Einaudi — neo-classical, sweeping) **and** Visceral Soul (Teddy Swims, Leon Bridges) — both registers are hers; the site should feel neo-classical in structure and soulful in warmth.

---

## 2. DESIGN TOKEN SYSTEM

### Color — "Elevated High-Key, Ink-Deep"
| Token | Hex | Role |
|---|---|---|
| `--alabaster` | `#F6F3EC` | primary field / page background |
| `--linen` | `#EEE7D9` | secondary field, card backgrounds, section breaks |
| `--paper` | `#FBFAF6` | lightest lift, hero overlays |
| `--ink` | `#161513` | primary text, the "ink" — near-black, warmed not blued |
| `--graphite` | `#3A362F` | secondary text, muted headlines |
| `--umber` | `#8B6F4E` | the single warm mineral accent — bronze-umber, used only for the crown/pageant material and key emphasis. Never decorative filler. |
| `--sovereign` | `#5B4636` | deep bronze-brown, hover/active states, structural rules |

No terracotta-Claude-orange, no acid green, no SaaS card-grey shadows. Shadows are warm and low-opacity umber (`rgba(91,70,54,0.08)`), never cool grey.

### Typography — "The Editorial Wordmark" (her explicit answer, 3.2-A)
- **Display / Wordmark:** `Cormorant SC` or `Cormorant Garamond` at high tracking for her name lockup — a real editorial serif wordmark, VOGUE-adjacent, not a novelty display font. (Cinzel Decorative was suggested in the brief but reads costume/medieval; a refined high-contrast serif with generous letter-spacing achieves the Saint Laurent/VOGUE reference more truthfully. Using **Cormorant Garamond** for the wordmark and large editorial numerals, weight 300–600.)
- **Headlines:** `Fraunces` (variable, optical size + soft/hard axis) — gives us the variable-font-weight-on-scroll motion effect (#12) authentically, and a slight "made" quality no template uses by default.
- **Body / UI:** `Inter` — quiet, legible, structural. CS-graduate precision married to the fashion-editorial display type.
- Scale (desktop): Wordmark 11–14vw / H1 clamp(2.75rem,5vw,5.5rem) / H2 clamp(2rem,3.4vw,3.25rem) / body 1.0625rem / eyebrow 0.75rem tracked +0.14em (used sparingly, only where content is genuinely a label, not decoration).
- Line length: body copy capped at ~68ch.

### Layout
- Left-aligned editorial grid for long-form (Philosophy, Identity) — mirrors her CS precision.
- Center-pinned for ceremonial moments (Hero wordmark, Crown page milestone).
- 12-col grid, generous 96–140px outer margins on desktop, collapsing to 20px mobile. Mobile-first throughout.
- Asymmetry is intentional: image blocks break the grid by one column to feel art-directed, not templated. No identical rounded cards; corners are sharp (0 radius) except on portrait imagery, which gets a single soft 2px radius — a tell that says "this was chosen," not defaulted.

### Motion System (the vocabulary, assigned deliberately — not "all effects everywhere")
| Technique | Where | Why |
|---|---|---|
| Lenis smooth scroll | Global, every page | Baseline "cinematic scale" weight to all scrolling |
| Per-character stagger reveal, mask-from-baseline, `power3.out`, 0.03s stagger, 0.7s | Every H1/H2 on first view | Her "editorial wordmark," delivered as an event, not a static label |
| Variable font-weight-on-scroll (Fraunces `wght`/`opsz`) | Philosophy page pull-quotes | Literalizes neuroplasticity — the type itself changes shape as you move through it |
| Depth-layered z-parallax w/ far-layer blur | Every hero | Cinematic scale, real depth not gimmick parallax |
| Scroll-velocity skew (Lenis velocity → subtle skewY, returns to 0 on rest) | Portfolio gallery, Crown timeline | Gives scrolling "weight" |
| Sticky stacked sections | Identity page (four-pillar breakdown), Crown page (pageant milestones) | Both are genuinely sequences — this earns the sequence treatment |
| Pinned horizontal gallery | Portfolio page main gallery | Lookbook behaves like a lookbook, not a vertical Pinterest grid |
| Scroll-driven odometer counters | Home stats strip (only if real numbers exist — see §4 caution) | Digit-roll for pageant dates/rank, not vanity metrics |
| Magnetic buttons (GSAP quickTo, spring return) | All primary CTAs, nav links | Highest cost:effect ratio, used everywhere something is clickable |
| Smoothed, state-morphing cursor | Global, desktop only | Dot → ring → "VIEW" / "READ" per hover target |
| Perspective tilt + specular highlight | Icon cards (Angelou/Cleopatra/Jung), Portfolio thumbnails | 3D response with an actual highlight sweep, never bare rotation |
| Animated film-grain overlay (SVG feTurbulence, ~5%, fixed, pointer-events:none) | Global | Kills flat/sterile AI-default look |
| Clip-path curtain page transition | All internal nav links | One continuous world, page to page, never a hard reload cut |
| Shared-element / FLIP morph | Portfolio grid → future case-study expansion | Thumbnail persists into hero on click |
| WebGL displacement hover | ONE hero image only per page, max | Reserved — this is the studio-tell, must stay rare or it cheapens |

Durations: entrances 0.6–0.8s, hovers 0.2–0.3s. Easing: `power3.out` (reveals), `expo.out` (magnetic snap), custom cubic-bezier(0.16,1,0.3,1) for curtain transitions. **Every single motion rule ships with a `prefers-reduced-motion` branch that disables transform/opacity animation and shows the end-state immediately** — enforced once in `motion.js` as a gate, not per-effect.

---

## 3. TECHNICAL ARCHITECTURE

- Mobile-first HTML5, Tailwind CDN (Play CDN + inline config for our token system as Tailwind theme extensions), vanilla JS, GSAP 3 + ScrollTrigger + Flip (CDN), Lenis (CDN).
- **No inline handlers.** All interaction wired through `assets/js/main.js` via `addEventListener`, translating cleanly to `useEffect` later.
- **Component-minded HTML.** Every logical section wrapped in `<section id="..." data-component="Hero">` etc. with clear comment boundaries `<!-- ============ COMPONENT: Hero ============ -->` so each becomes a `.jsx` file with minimal effort.
- **State via data-attributes**: `data-nav-state="open|closed"`, `data-cursor="link|drag|view"`, `data-motion="enabled|reduced"`.
- Shared files loaded on every page: `/assets/css/tokens.css` (design tokens + base styles + grain SVG), `/assets/js/main.js` (Lenis/GSAP boot, nav, cursor, grain, reduced-motion gate, curtain transition).
- Images: curated Unsplash editorial fashion/architecture/portrait photography as placeholders, wrapped in `<figure data-asset-slot="hero-portrait">` with a `data-prod-src` config comment showing exactly where the Google-Drive/repo production URL swaps in.

## 4. A SECOND HONESTY NOTE — STATS

The brief gestures at an odometer stats strip and "trusted by X" style social proof. I'm not inventing follower counts or fabricated metrics for her — that would be exactly the kind of externally-imposed "standard of success" she explicitly rejects in her own 5.1 answer. Where the Home page uses a numeric strip, the numbers are the **real, factual milestones she gave us** (Miss Ethiopia 2026 placement, Miss Tourism Ethiopia year, Miss Tourism Africa Nigeria date), rendered with the odometer motion — not invented vanity metrics.

---

## 5. THE SEVEN PAGES

1. **`index.html` — Home / The Threshold.** Cinematic entry. Wordmark reveal, depth-parallax hero portrait, her 5.3 quote as the first line spoken, three-pillar teaser (Mind / Form / Reign) each linking onward, real-milestone odometer strip, closing invitation line.
2. **`identity.html` — Identity / The Intellectual Alchemist.** The archetype essay. Sticky-stacked four-pillar breakdown (Computer Science → Project Management → Modeling → Digital Creation), leadership language, influence quote, morning ritual as a full editorial moment.
3. **`portfolio.html` — Portfolio / Visual Grammar.** Pinned horizontal lookbook gallery, WebGL-displacement hero image, wardrobe commandments as an editorial pull-quote set, tactility section (structural × fluid).
4. **`reign.html` — Reign / The Crown Chronicle.** The crown jewel page. Sticky-stacked pageant milestone sequence: Miss Ethiopia 2026 (4th RU) → Miss Tourism Ethiopia (Aug 2026) → Miss Tourism Africa, Nigeria (Sep 2026, forward-looking). Odometer dates. This is the "Awe & Authority" register, deliberately concentrated on one page rather than smeared across the whole site.
5. **`mind.html` — Mind / The Evolving Field.** Her manifesto page. The beauty-standard essay, the technology essay, neuroplasticity + philosophy + psychology + music, and the three-icon perspective-tilt cards (Angelou, Cleopatra, Jung) with her actual reasoning for each.
6. **`codes.html` — Codes / Rituals & Commandments.** Personal codes: morning ritual, dietary architecture (rigorous/functional + cultural/ritualistic), the three wardrobe commandments, glamour definition (Sovereign Structure).
7. **`contact.html` — Contact / Begin Something.** Low-noise, high-intent contact moment. Her influence quote closing the loop. Booking/partnership form (front-end only), press/media line, social.

Shared chrome: sticky nav (wordmark logotype + 7-item menu + magnetic underline), mega-footer with three columns (Narrative / World / Protocol) echoing the reference architecture's proven structure, grain overlay, custom cursor — present identically across all seven pages for the "one intentional seamless storyline" requirement.

---

## 6. BUILD ORDER

`blueprint.md` → shared `tokens.css` + `main.js` → `index.html` → `identity.html` → `portfolio.html` → `reign.html` → `mind.html` → `codes.html` → `contact.html`. Each page ships complete and copy-paste ready; nothing is a snippet.

---

## 7. STRUCTURAL DNA ADOPTED FROM A REFERENCE PROJECT (v2 rebuild)

Client requested we adopt the **section vocabulary, media volume, and motion grammar** of a previous project (Liya Elias — architect/model/TV host, https://korenty.github.io/liya-elias-portfolio/), while keeping Hermela's own identity, copy, and survey-sourced voice fully separate. This section is the hard boundary between "structural inspiration" (allowed, adopted) and "identity bleed" (not allowed, never happens).

**What was studied:** all eight pages, read in full via direct fetch — Home, Interiors (architecture.html), Branding (branding.html), Ambassador (culture.html), Modeling, Awards, Portfolio (work.html), Contact. Nothing below is inferred; every pattern was read verbatim before being catalogued.

**Component types catalogued across all eight pages:**
1. **Preloader** — 0%→100% numeric loader gating first paint, then dissolving.
2. **Nav numbering with arrow glyph** — "01 Home ↗" tracked numbering on every link.
3. **Meta-chip row under every H1** — short *Label*Value fragments (Height / Award / Category / Service / Founder / Based, etc.), repeated on literally every page, not just Home. This is a bigger structural signature than first realized — it's how every single page opens.
4. **Credentials marquee** (Home only) — infinite horizontal ticker of career fragments.
5. **Numbered "explore" triad** (Home) — three large 01/03–03/03 cards into the site's three arms.
6. **Origin/stat block** — bio paragraph + 2–3 odometer counters.
7. **Full-bleed pull-quote / philosophy statement** — one italic line alone in its own section. Appears on Home, Interiors, Branding, Ambassador, Modeling — effectively every page has one.
8. **Roman-numeral process breakdown** (Branding page: "I. Cognitive Discovery / II. Visual Architecture / III. Market Dominance") — a three-step methodology block.
9. **Numbered category chips** (Interiors page: "Residential Couture — Category 01" etc.) — a lighter-weight numbered list than the full chronicle rows, used for sub-categorizing one page's offerings.
10. **Numbered flat recognition/chronicle list** — "01, 02, 03…" rows with year + status tag.
11. **Numbered heritage chapters** (Ambassador/culture page) — 01 through 07, each pairing a short essay with an in-voice blockquote and photography, closing on a single bridge statement.
12. **Business/venture page anatomy** (Interiors, Branding — both ventures Liya founded): video hero → chip row → philosophy quote → numbered categories or process → gallery → closing CTA. This is a page *type*, not just a section.
13. **Case-study portfolio page** (work.html): stat grid (4 metrics) at the top, then numbered case studies (01, 02, 03) each with category tag, title, description, and an "Inquire about this work" link, alternating image/video.
14. **Archive/masonry preview grid with lightbox** on Home, full grid on Modeling.
15. **Video triptych / video-first heroes** — several subpages open with video rather than a photo; several run three videos side by side mid-page.
16. **Contact success overlay** — full checkmark confirmation replacing the form on submit.
17. **Two-tier footer** — full mega-footer on Home only; every subpage gets a minimal one-line credit + "← Return Home."
18. **Asset/IP disclaimer** — a small closing note on media provenance, tucked into the footer or a lightbox note.

**The honest limit of the mapping — two of Liya's eight pages have no true equivalent for Hermela, and were not force-fit:**
Liya's site includes two pages built around businesses she personally founded — **Liyu Interior Design** and **Leyu Branding Agency** — complete with fabricated-for-demo metrics ("0% average increase in premium inquiries"). Hermela has no equivalent founded ventures in her survey. Rather than invent a business for her (which would be fabrication, not adaptation), her two "arms" beyond Modeling and Reign are built from what she actually told us: **the CS/PM discipline** and **the digital-creator/evolving-mind practice** — both already core to `identity.html` and `mind.html`. The *page anatomy* of the venture pages (video hero → chip row → philosophy quote → numbered process/categories → gallery → CTA) is reused for Identity and Mind. The *content* — no agency name, no clients, no invented conversion percentages — is 100% hers.

Liya's Ambassador/Culture page catalogues seven named Ethiopian cultural ceremonies (Gamo, Ashenda, Irrecha, coffee ceremony, Timkat, Shadey, Ramadan) with in-voice quotes about each. Hermela's survey never discusses specific festivals, so none are invented or attributed to her — that would be putting words in her mouth about things she never said. Instead, `reign.html` adopts the *chapter anatomy* (numbered chapter → essay → in-voice blockquote → photography → closing bridge line) applied only to her three real, disclosed chapters: Miss Ethiopia, Miss Tourism Ethiopia, Miss Tourism Africa.

**Revised page-by-page mapping (v2):**
1. **`index.html`** — Home. Preloader, meta-chip row, credentials marquee (real facts only), hero, milestone odometer, numbered 01/03–03/03 explore triad, archive preview grid + lightbox, full mega-footer.
2. **`identity.html`** — adopts the *venture-page anatomy*: video-slot hero, meta-chip row, philosophy quote ("Influence is a tool..."), roman-numeral process block (her actual four pillars: I–IV), morning ritual, minimal footer.
3. **`portfolio.html`** — adopts Modeling's anatomy: meta-chip row (profile facts, not fabricated measurements), philosophy quote, video triptych, full masonry gallery with lightbox, wardrobe commandments, minimal footer.
4. **`reign.html`** — adopts Awards + Ambassador anatomy: numbered chronicle rows (year/status) AND the seven-chapter essay format compressed to her three real chapters, each with an in-voice quote drawn only from her actual survey answers.
5. **`mind.html`** — adopts the second venture-page anatomy (Branding's): meta-chip row, philosophy quote, roman-numeral process (how she actually described her curiosity: Philosophy → Psychology → Neuroscience/Neuroplasticity → Music/Travel), numbered category chips, no fabricated stat.
6. **`codes.html`** — unchanged in role, restructured with meta-chip row + numbered category chips for the wardrobe commandments and dietary architecture.
7. **`contact.html`** — adopts Contact's full success-overlay pattern, meta-chip row, minimal footer.

Every page gains the meta-chip row (#3 above) and a minimal two-tier footer; only Home keeps the mega-footer, marquee, and explore triad.

**What was explicitly NOT taken:** any of Liya's actual words, stats, awards, birth date, family names, physical measurements, business names, client names, video/image files, cultural-ceremony content, or color/type system. Hermela's palette (Elevated High-Key, corrected in §0), her Cormorant/Fraunces/Inter type system, and every line of copy remain hers alone, sourced only from her own survey answers per §1. The two women's content never appears in the same file, section, or sentence.

---

## 8. V3 EXPANSION — Selamawit reference, invented-attribute policy, Academy page, dual back-office, light/dark system

Client supplied a second reference, read in full: Selamawit Tsuruy (https://korenty.github.io/selamawit-tsuruy/) — a single flagship page, far richer than Liya's multi-page site. Catalogued sections: Story hero with a real follower-count stat line, "Selected Works" masonry (commission-style, category+year tags), "The Movement" (motion-focused sub-gallery), "In Motion" (video carousel), "Comp Card & Digitals" (headshot grid + measurement panel + agency line), "Representation," a ten-chapter numbered **"The [Name] Edit"** (Morning Ritual, Movement & Discipline, Nutrition Philosophy, Personal Philosophy, Fashion Statement, Signature Fabrics, The Accessory Edit, Wardrobe Commandments, Wellness Rituals, The Wishlist), a full **Academy** business page (free downloads + a signature paid course + 1-on-1 mentorship + newsletter), a venture page (Tseruy's Pajama), Beauty Close-Up carousel, "In the Spotlight" achievement list, Brands & Partners logos, and a closing booking form. Client also supplied a third reference — Liya's password-gated Private Office (`vault-lock` → `client-vault` / `admin-portal`) — for the back-office pattern.

### 8.1 The invented-attribute policy (read this before writing any new copy)

The client has explicitly authorized going beyond the survey: *"the survey is extremely limited... we have to compile attributes for her archetype and craft her world exceptionally perfect... feel free, utilize your imaginative genius... once she sees the final work, she can comment and we will polish it."* This changes what's allowed, but not without limits:

- **Lifestyle, taste, and philosophy details** (favorite fabrics, an accessory rule, a wellness habit, an aspirational wishlist) may now be invented in her voice, consistent with what she already told us (Sovereign Structure, dance as ritual, rigorous+cultural eating, neuroplasticity curiosity). These are creative studio proposals awaiting her sign-off — every new invented section carries a visible `<!-- STUDIO PROPOSAL — pending Hermela's review -->` comment in the source so a future editor (or she herself) can instantly find and revise anything invented versus anything she actually said.
- **Physical measurements (height, bust, waist, hips, shoe size) are not invented**, even under this authorization. That's specific, identifying data about a real private person's body — a materially different category from a lifestyle preference. The Digitals/Comp Card section ships with those fields structurally present but marked "To be confirmed" rather than filled with fabricated numbers.
- **The follower count is client-supplied, not invented**: *"100,000+ and growing every day"* — used verbatim, on Instagram, exactly as instructed.
- Nothing invented ever contradicts a real survey answer, and nothing here is presented to the end viewer as uncertain — the disclosure lives in code comments and blueprint.md for the client/Hermela's benefit, not as a visible on-page caveat that would undercut the site's confidence.

### 8.2 New/expanded pages

- **`codes.html` → "The Hermela Edit"** — expanded from 2 chapters to a fuller numbered set in the same spirit as Selamawit's ten: Morning Ritual (hers, real), Movement & Discipline (invented, consistent with "I dance to reconnect"), Dietary Architecture (hers, real), Personal Philosophy on Beauty (hers, real — cross-linked from Mind), Signature Fabrics (invented, consistent with Sovereign Structure + fluid/structural juxtaposition), The Accessory Edit (invented), Wardrobe Commandments (hers, real, already built), Wellness Rituals (invented, consistent with neuroplasticity/self-reflection curiosity).
- **`portfolio.html`** gains a **Selected Works** section (commission-style tiles: category + year, matching Selamawit's masonry) and a **Digitals & Comp Card** panel (headshot grid + representation/experience facts, measurement fields marked "to be confirmed," no fabricated numbers).
- **`academy.html` — NEW page.** Hermela's mentorship/education arm for aspiring Ethiopian models and creators. Deliberately NOT a copy of Selamawit's Academy: Selamawit's angle is runway-insider craft; Hermela's differentiator, true to her Intellectual Alchemist archetype, is **structured, project-managed career-building** — she treats "become a model/creator" as a system to architect, not just a craft to imitate. Working name: **"The Alchemist Method."** Contains: 2 free downloadable guides, 1 signature paid course, 1-on-1 mentorship booking, and a newsletter signup — same anatomy as the reference, different substance and voice.
- **`office.html` — NEW page.** Dual password-gated back office, pattern taken from Liya's `vault-lock`/`client-vault`/`admin-portal` structure. Her password → an internal dashboard of bookings/inquiries (sample/placeholder entries, clearly marked as demo data since there's no real backend to source them from) with reply affordances and newsletter-subscriber count. Client/partner password → a portal with newsletter signup, digitals/comp-card download, press kit, and document center. **Critical honesty note, stated plainly to the client in-chat, not buried:** this is a client-side JS password gate exactly like Liya's reference — meaning the "passwords" are visible to anyone who views the page source, and this is cosmetic access control, not real security. It's suitable for keeping casual visitors out of a back-office *concept*, not for protecting genuinely confidential business data. A real deployment needs actual server-side auth.

### 8.3 Light / dark mode system

A second, complete token set under `[data-theme="dark"]`, toggled by a pill-style switch (sun/moon) added to every page's nav, persisted via `localStorage`, defaulting to the visitor's OS preference on first visit. Design uniformity is the goal: identical layout, spacing, and motion in both themes — only the ink/paper relationship inverts. Dark theme is NOT the rejected "Abyssal Deep" from §0 revisited as a default — it's an optional, user-chosen state, which is a different design decision than defaulting the whole brand to it.

| Token | Light (existing) | Dark (new) |
|---|---|---|
| `--alabaster` (page bg) | `#F6F3EC` | `#141311` |
| `--linen` (section bg) | `#EEE7D9` | `#1C1A17` |
| `--paper` (lift) | `#FBFAF6` | `#211E1A` |
| `--ink` (primary text) | `#161513` | `#F3F0E9` |
| `--graphite` (secondary text) | `#3A362F` | `#C9C3B6` |
| `--umber` / `--sovereign` (accent) | unchanged | unchanged — the one constant that reads as "Hermela" in both states |

**Implementation correction, logged for future sessions:** the first pass of this system was broken — every page uses Tailwind utility classes (`bg-ink`, `text-paper`, etc.), and Tailwind compiles those to fixed hex from the config, not CSS variables, so toggling `--ink` alone would have silently done nothing. Fixed by pointing the Tailwind config at `var(--x)` for every invertible token, and introducing a separate **fixed, non-inverting pair — `--obsidian` / `--porcelain`** — for the deliberate dark "punctuation" bands (footer, milestone strip, chronicle rows, glamour sections) that are supposed to stay dark in both themes rather than flip to light. Any new dark-banded section must use `bg-obsidian text-porcelain`, never `bg-ink text-paper`.

---

## 9. V4 CORRECTIONS — client review pass

A detailed client review surfaced real bugs and craft issues. Logged here so no future session re-introduces them.

**Bugs fixed:**
- **Nav overlay clipping (mobile + desktop).** Root cause: `#nav-overlay` was a centered flex container with no scroll and link font sizes up to 5rem — with 9 nav items, total content height exceeded most viewports, and centered overflow clips symmetrically top-and-bottom with no way to reach the clipped items. Fixed with `overflow-y: auto`, `justify-content: flex-start`, adequate top padding to clear the fixed header, and a smaller responsive type scale (`clamp(1.6rem, 4.2vw, 2.65rem)`). The header wordmark now also fades out while the menu is open, removing any residual visual overlap with the first link.
- **Odometer digit misalignment.** Root cause: digit reel spans had no explicit `line-height`, so each digit's rendered box height drifted slightly from the `1em` the JS assumed when computing `translateY`, causing reels to land mid-digit instead of flush — worse the more digits scrolled. Fixed with `line-height: 1` enforced on the wrapper and every digit span.

**Factual correction — read before writing any new copy:** the national pageant she placed 4th Runner-Up in is **"Miss International Ethiopia"**, not "Miss Ethiopia." Corrected everywhere. Her three titles, precisely: 4th Runner-Up, **Miss International Ethiopia** (2026) → reigning **Miss Tourism Ethiopia** (Aug 2026) → contesting **Miss Tourism Africa**, Nigeria (Sep 2026).

**Home milestone strip, corrected to client spec:** 4th / Miss International Ethiopia — 1st / Miss Tourism Ethiopia, Reigning — 9/2026 / Miss Tourism Africa (Nigeria) — 3 / Ambassadorship Initiatives (linking to the new `ambassador.html`).

**The 5.3 survey quote was misused, site-wide.** *"I want them to feel curiosity first... a story of continuous evolution"* was her answer to how *viewers* should feel visiting the site — a design brief, not a self-description — and was wrongly displayed as if she were saying it about herself, on the Home hero, two Reign blockquotes, and Reign's closing statement. All four replaced with original copy; the actual quote no longer appears anywhere on the site (it remains in this blueprint as design-intent context only).

**Repetition and voice pass:**
- "Sovereign Structure" was appearing as a headline/chip on three different pages (Home, Portfolio, Codes). Codes' Glamour Definition section is now its one canonical home; Home's teaser became "Precision, worn.," Portfolio's chip became "Architectural Tailoring."
- The "Influence" quote (*"Influence is a tool best used to..."*) was repeated verbatim across four pages (Home, Identity, Reign, Contact). Identity is now its one home; the other three got original copy.
- **POV consistency rule established:** third-person magazine narration is the site's default voice everywhere; first-person only appears inside actual quoted material, visually marked as a quote (quotation marks, italic/blockquote treatment). Two real violations existed — her Morning Ritual and Beauty quotes were unmarked first-person prose sitting in the middle of otherwise third-person copy — both fixed. A related issue: the full Morning Ritual quote was duplicated near-verbatim across Identity and Codes with inconsistent POV between the two (first-person on one, third-person on the other). Identity now owns the full quote; Codes has a short third-person teaser linking to it.
- "Alchemist" and "Architecture" survive as deliberate, singular uses (Identity's H1 archetype reveal; Academy's actual product names, "The Alchemist Method" / "The Alchemist Letter") — proper nouns and one true canonical introduction are fine; decorative reuse as a personality adjective elsewhere was trimmed (e.g. Academy's process-step "Architecture." → "Blueprint." to stop echoing its own chip label one line above).

**Home hero decluttered and contrast-fixed:** the meta-chip row overlaying the hero photo is gone (those facts now live only in the marquee below, as plain values with no labels — "Project Manager," "100K+ Instagram, growing daily," "Miss Tourism Africa, Nigeria — Sep 2026," etc., mixed with real personal-attribute fragments like "Guitar & Voice, self-taught" and "Dancer at heart," not just achievements). The hero photo is dark-toned, which made light-mode text unreadable — fixed with a **fixed, non-inverting scrim** (`rgba(20,19,17,...)` gradient) and fixed-porcelain text color for the hero specifically, since it sits on a photograph rather than page chrome and shouldn't invert with the theme toggle.

**Identity page — the magazine biography.** Added a full third-person feature (`#profile`, "Twenty-Three Years in the Making") in the register of a top-tier fashion-magazine profile: born and raised in Addis Ababa, age 23, educated at St Mary's University in Addis Ababa (client-supplied facts), with character/belief-system/worldview prose as a flagged STUDIO PROPOSAL consistent with her disclosed survey answers.

**New page — `ambassador.html`.** Structural reference: Hasset Dereje's ambassador.html (fetched and read in full — hero, "Spheres of Influence" 6-pillar grid, Keynote Speaker section, roman-numeral "Strategic Partnerships"). Adapted, not copied: Hermela's version uses her real three initiatives rather than padding to six generic ones. **Mental Health Advocacy** (real — condensed and paraphrased from her own Instagram post about the Gergesenon Association film, with short pull-quotes preserved in her actual words). **African Union Women's Projects** and **STEM Empowerment for Girls / "Girls Who Build"** are STUDIO PROPOSALS — crafted concepts explicitly pending confirmation of real project scope, per the client's direction. Added to nav for every page as item 05, renumbering Mind/Codes/Academy/Contact up by one. Home's "Ambassadorship Initiatives" stat and Reign's closing CTA now link to it.

**Real social links wired in everywhere:** Instagram (`vetusmeam__`) and TikTok (`velvet_paradox_`) now appear in Home's mega-footer and every subpage's minimal footer, replacing all `href="#"` placeholders.
