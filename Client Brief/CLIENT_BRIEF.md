# Client Brief — Wolf Nutrition

> Fill this out once per client. Every `BRIEF.*` marker in the codebase
> maps to a field below. Hand this to Claude (or work through it
> yourself) and the site comes together in a single pass.

---

## 1. Identity — `BRIEF.brand`

| Field | Value |
|---|---|
| **Business name** | Wolf Nutrition |
| **Alternate name** | Wolf Nutrition |
| **Tagline** | none |
| **Logo file** | `assets/logo/wolf-nutrition.jpg` |
| **Brand colors** | Primary: `#7A2236`  ·  Secondary: `#F5C518` |
| **Color source** | Pulled from logo (`assets/logo/wolf-nutrition.jpg`) — maroon disc + gold ring |
| **Vibe** | clean, modern, premium, energetic, health |

## 2. Contact — `BRIEF.contact`

| Field | Value |
|---|---|
| **Street address** | 1759 Airport Rd, Suite C |
| **City, State, ZIP** | Hot Springs, AR 71913 |
| **GPS lat/lng** | 34.4631887559142, -93.14547950273685 |
| **Phone** | (501) 463-4144 |
| **Google Business Profile** | https://share.google/L0grmqgFYNhysCUSI |
| **Facebook** | https://www.facebook.com/wolfnutritionhotsprings |
| **Instagram / TikTok / other** | https://www.instagram.com/wolfnutritionhotsprings/ |

## 3. Hours — `BRIEF.hours`

> Must match in 3 places: HTML hours table, JS HOURS array, JSON-LD schema.

| Day | Open | Close | (or Closed) |
|---|---|---|---|
| Sunday | | | Closed |
| Monday | 6:00 AM | 5:30 PM | |
| Tuesday | 6:00 AM | 5:30 PM | |
| Wednesday | 6:00 AM | 5:30 PM | |
| Thursday | 6:00 AM | 5:30 PM | |
| Friday | 6:00 AM | 5:30 PM | |
| Saturday | 8:00 AM | 5:00 PM | |

Special-hours note (one sentence, eg. "Closed Mondays" or "Late Saturday hours"): Closed Sundays. Saturday opens later (8 AM).

## 4. Categories — `BRIEF.categories`

> Usually 6 tiles. Use 4 if the business has fewer specialties.
> Tile #3 spans wider — put the strongest specialty there.

| # | Name | One-line hint | Hero photo |
|---|---|---|---|
| 01 | Energizing Teas | Loaded with electrolytes, B-vitamins, and clean energy | `cat-1.jpg` |
| 02 | Protein Coffee | Cold-brewed coffee packed with protein for the morning grind | `cat-2.jpg` |
| 03 (featured wide) | Healthy Shakes | Meal-replacement protein shakes in dozens of flavors | `cat-3.jpg` |
| 04 | Good Vibes | Friendly faces, fast service, your new favorite stop | `cat-4.jpg` |

## 5. Trust pillars — `BRIEF.trust`

> Pick 1–3 of the strongest. Drop the third tile if you only have 2.

- [x] **Google rating** — `★ 4.7 on Google` (124 reviews)
- [ ] **Award / recognition** — name, awarding org, month/year
- [ ] **Scale claim** — square footage, vendor count, years in business
- [ ] **Press mention** — publication + headline (link if possible)
- [x] **Locally owned since** — 2018 (8 years)

## 6. Photos — `BRIEF.photos`

> Drop everything into `assets/photos/` first.
> Naming convention for the curated copies that go into `site/images/`:

**Required:**
- `storefront.jpg` — wide exterior with signage (this becomes the hero)
- `intro-bleed.jpg` — wide bleed shot under the intro (interior, award certificate, signature space, etc)

**Categories (one per category):**
- `cat-1.jpg` through `cat-6.jpg`

**Gallery (12–24 photos for the collage):**
- `gallery-1.jpg` through `gallery-N.jpg`

**Tips for the owner:**
- Hold the phone **horizontally** (landscape) for wide shots.
- Take a step back so the whole booth/section/dish fits.
- Avoid shooting the ceiling, floor, or random walls.
- A few intentional close-ups of standout items are great.
- 15–20 good photos beats 60 mixed-quality ones.

## 7. Reviews — `BRIEF.reviews`

> 4–6 reviews from the GBP. The first one (featured) gets a wider card.

**Aggregate:** `★ 4.7` average · `124` total reviews

| # | Author (First L.) | Stars | Text (full or excerpt) |
|---|---|---|---|
| Featured | Melissa W. | 5 | I absolutely love this place. My son Michael started getting these delicious drinks and I was like what is this and where do I get it? He told me it was an Astro Pop tea from Wolf Nutrition... They greeted me with open arms and smiles. They answered all my questions and helped me determine the teas that would be on my favorites list and I was hooked. I love how my son has become a part of this amazing family. |
| 2 | Cody R. | 5 | If you haven't tried any of these products you are not achieving your goals right! With teas to energize and shakes to fuel you, you'll gain results fast and naturally! |
| 3 | Ricky W. | 5 | Very friendly and professional staff. Explained the menu thoroughly. Very relaxing atmosphere. Highly recommend if you are looking for shakes and teas. |
| 4 (short) | Al B. | 5 | Excellent Herbalife establishment that was willing to open up extra early (6:15 AM) so I could continue with my morning shakes for breakfast. |
| 5 (short) | Jordan L. | 5 | GREAT drinks and can always switch it up for different flavors! I love the atmosphere and always being welcomed! 10/10 |

## 8. Final CTA — `BRIEF.cta`

> The bottom-of-page section. Pick the variant that fits.

- [ ] **Vendors welcome** (flea markets, farmers markets, retail collectives)
- [ ] **Book a table** (restaurants — replace phone CTA with reservations link)
- [ ] **Schedule a service** (service businesses — link to booking)
- [x] **Visit us today** (generic — drop the inverse button)
- [ ] **Other:** ____________

CTA copy (1–2 sentences): Stop in for a loaded tea, a protein shake, or a cold-brew protein coffee — and find out why Hot Springs has trusted Wolf Nutrition since 2018.

## 9. Domain & deploy — `BRIEF.meta`

| Field | Value |
|---|---|
| **Custom domain** | pending |
| **GitHub repo** | `ruvalbaka/wolf-nutrition-hs` |
| **Vercel project** | `wolf-nutrition-hs` (auto-named after repo) |
| **Owner email for handoff** | pending |

---

## Notes / weird stuff

> Anything the owner mentioned that doesn't fit a field above. Quirks, history, things to absolutely include or absolutely avoid.

- **Authorized Herbalife distributor / Nutrition Club.** Disclosure confirmed — owner is comfortable with an "Independent Herbalife Member" / "Independent Herbalife Distributor" line in the footer. Al B.'s review keeps its "Herbalife establishment" wording.
- **Brand emphasis: Wolf Nutrition first, Herbalife as disclosure only.** The site is about Wolf Nutrition's identity (the wolf logo, the maroon + gold palette, the Hot Springs community). Herbalife is acknowledged honestly but stays out of the headlines and category copy.
- **Health claims: stay grounded.** Avoid weight-loss promises, "boosts immunity," "increases metabolism," or anything implying medical effect. Lifestyle / energy / community framing only ("fuel your morning," "protein for the grind," "real flavor, real energy" — not "lose 10 lbs in a week"). FTC + Herbalife brand-compliance reasons.
- Owner conversation pending — may surface additional preferences. Revisit this section after the next call.
