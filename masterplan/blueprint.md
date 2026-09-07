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
