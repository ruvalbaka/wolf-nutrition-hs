# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wolf Nutrition is a client project built from the **local-business-template** (`e:/antigrav projects/_templates/local-business-template`). It's a premium scroll-animated landing page — vanilla HTML/CSS/JS, no build step, deployed to Vercel as a static site.

The project is in early setup — the client brief needs to be filled out before the site can be built.

## Workflow

1. Fill out `Client Brief/CLIENT_BRIEF.md` with all business details
2. Copy the template's `site/` directory into this project
3. Drop raw photos into `assets/photos/`, convert HEIC/DNG to JPG with ffmpeg
4. Replace every `BRIEF.*` marker in the site files with values from the brief
5. Local preview: `cd site && python -m http.server 8000`
6. Deploy to Vercel with root directory set to `site/`

## Architecture (from template)

- **`site/`** — deployable root (set this as Vercel root directory)
  - `index.html` — single-page site with `BRIEF.*` swap markers throughout
  - `css/styles.css` — brand color tokens (`--primary*`, `--secondary*`) at top need replacing
  - `js/main.js` — `HOURS` array at top needs editing per client; handles today's-hours highlighting
  - `schema/localbusiness.json` — reference copy of embedded JSON-LD
  - `robots.txt`, `llms.txt`, `sitemap.xml` — all need domain/content updates
- **`assets/`** — raw originals (not deployed)
- **`Client Brief/`** — the filled-out client brief drives all content

## Key Gotchas

- **Hours must match in 3 places:** HTML table, JS `HOURS` array, JSON-LD `openingHoursSpecification`
- **Category tiles use `<img>` tags**, not CSS `background-image` — don't refactor to CSS backgrounds (causes z-index rendering bug)
- **HEIC conversion** requires ffmpeg with `-filter_complex` syntax (simple `-vf scale=` fails on HEIC)
- **Reviews schema** needs both `aggregateRating` AND individual `review[]` entries for Google rich results
- **OpenStreetMap bbox** format is `west,south,east,north` (~0.024 wide); marker is `lat,lng`

## Tech Stack

- HTML / CSS / JavaScript — no frameworks, no build step
- GSAP + ScrollTrigger (CDN) for scroll animations
- Google Fonts: Instrument Serif, Allura, Inter
- Respects `prefers-reduced-motion`, targets WCAG-AA contrast

## Image Naming Convention

- `storefront.jpg` — hero (wide exterior with signage)
- `intro-bleed.jpg` — wide bleed shot under intro section
- `cat-1.jpg` through `cat-6.jpg` — one per category tile
- `gallery-1.jpg` through `gallery-N.jpg` — collage gallery (12-24 photos)
