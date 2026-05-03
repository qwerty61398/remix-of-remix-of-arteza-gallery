## Homepage restructure

New section order (top → bottom):

```text
1. Hero (shorter, simplified)
2. Meet the Artist (moved up from bottom)
3. Featured Artworks — dynamic rotating carousel
4. Explore Collections
5. Instagram / Social feed
6. Newsletter signup
+ Sticky "Find Your Style" quiz button (floating, bottom-right)
```

The standalone "Light Up Your Art Journey" full-width quiz block is removed; quiz access becomes a small sticky element + a subtle link in the hero.

---

### 1. Hero — shorter & simplified

- Reduce height from `min-h-[90vh]` → `min-h-[60vh]`.
- Keep the parallax background image, typewriter headline, and tagline.
- CTAs: keep only **"Explore Collection"** as the single primary button. Remove the secondary "Get Inspired" button (quiz access moves to the sticky element).
- Keep the small stats row (Original Paintings · 20+ Artworks).

### 2. Meet the Artist (moved here)

- Move the existing "Meet the Artist" two-column block (image + bio + button) to immediately after the hero. Content unchanged.
- Remove it from the bottom of the page.

### 3. Featured Artworks — dynamic carousel

Replace the current static 4-card masonry grid with a rotating carousel:

- Use the existing `@/components/ui/carousel` (Embla) component.
- Source: first ~8 paintings from `usePaintings()` (later can be filtered by `is_featured` if desired — out of scope for now).
- Show 1 card on mobile, 2 on `md`, 3 on `lg` per view; auto-advance every ~5s with pause on hover; arrow + dot navigation.
- Each slide reuses `ArtworkCard` (already includes title, price, "Add" button → cart). The card already links to `/shop/:id` for quick-view → no new component required.
- Section header keeps the "View All" link to `/shop`.

### 4. Explore Collections

Keep current implementation (3 + 2 grid of `CollectionCard`). No changes.

### 5. Instagram / Social feed (new)

- New `InstagramFeed` section component under `src/components/home/`.
- Static MVP: a 6-image responsive grid (`grid-cols-3 md:grid-cols-6`) sourced from the most recent paintings as placeholder thumbnails (no Instagram API integration yet — flagged so we can wire to a real handle later).
- Each tile links out to the Instagram profile URL stored in the existing social links config (read from the footer/social-links memory; fallback `https://instagram.com/`).
- Section heading: "Follow @upasna_art on Instagram" with a subtitle and an outline button "View on Instagram".

### 6. Newsletter signup (new)

- New `NewsletterSignup` section component under `src/components/home/`.
- Centered card: heading "Join the studio newsletter", short copy, single email input + Subscribe button.
- Submit handler stores nothing yet — shows a success toast ("Thanks! We'll be in touch."). Backend wiring (table + edge function) is **out of scope for this restructure**; we'll add a TODO comment so we can attach it later.

### 7. Sticky "Find Your Style" quiz button

- New `StickyQuizButton` component, fixed `bottom-6 right-6`, z-50.
- Pill-shaped button with `Lightbulb` icon + "Find Your Style", links to `/quiz`.
- Subtle entrance animation; hidden on `/quiz` route itself.
- Mounted from `Layout.tsx` so it appears across the site (or homepage-only — see open question below).

---

## Files touched

- `src/pages/HomePage.tsx` — re-order sections, swap featured grid for carousel, drop quiz CTA section & bottom artist preview, add Instagram + Newsletter sections.
- `src/components/home/FeaturedCarousel.tsx` *(new)* — Embla carousel of `ArtworkCard`s with autoplay.
- `src/components/home/InstagramFeed.tsx` *(new)*
- `src/components/home/NewsletterSignup.tsx` *(new)*
- `src/components/StickyQuizButton.tsx` *(new)*
- `src/components/layout/Layout.tsx` — mount `StickyQuizButton` (hidden on `/quiz`).
- May add `embla-carousel-autoplay` dependency for autoplay behavior.

No database, no edge function, no routing changes.

---

## Open question

The sticky "Find Your Style" button — show it **site-wide** (so it follows users everywhere) or **homepage-only** (less intrusive on shop/checkout pages)? Default in plan: site-wide, hidden on `/quiz` and `/checkout`. Let me know if you'd prefer homepage-only.
