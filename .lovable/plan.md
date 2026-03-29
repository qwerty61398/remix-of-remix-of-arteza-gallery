

## Plan: Immersive Magazine-Style About Page Redesign

Transform the About page from a standard timeline layout into a long-form, immersive scrolling experience inspired by editorial storytelling magazines.

### Design Concept

Full-bleed painting images alternate with narrative text sections. First-person voice throughout. Dark atmospheric sections contrasted with light ones. Large pull quotes break up the prose. Every section fades in as the user scrolls.

### Content Structure (First-Person Narrative)

1. **Hero -- Full-bleed opening image** with overlaid text: "I paint because words were never enough." Dark gradient overlay on a featured painting. Full viewport height. Text fades in on scroll.

2. **Chapter 1: The Beginning** -- "I remember the first time colour spoke to me..." Childhood inspiration story. Full-width painting image with parallax-style sticky positioning. Pull quote in large serif italic.

3. **Chapter 2: The Turning Point** -- Training in Madhubani, discovering classical forms. Side-by-side layout: large painting left, intimate text right. Another full-bleed painting break.

4. **Chapter 3: Two Worlds Collide** -- Western exploration, oil painting, impressionism. Full-bleed image section with text overlay on gradient.

5. **Chapter 4: Philosophy of Painting** -- "Every brushstroke is a conversation..." What drives the art, the meditative process. Pull quote section. Values cards reimagined as inline editorial blocks.

6. **Chapter 5: The Collections** -- Brief tour of each collection series with a representative painting. Horizontal scroll or stacked full-bleed images with collection name overlays.

7. **Chapter 6: The Studio Today** -- Daily process, commissions, teaching. Final full-bleed image with CTA overlay.

### Technical Implementation

**File: `src/pages/AboutPage.tsx`** -- Full rewrite.

- Remove the timeline data structure and alternating grid layout
- Build sequential full-bleed sections using `min-h-screen` or `min-h-[70vh]` with `relative` positioning and gradient overlays (`bg-gradient-to-t from-black/70`)
- Use existing `ScrollReveal` component (fade-up, blur-in variants) on every text block and image for scroll-triggered animations
- Pull quotes styled with `font-serif text-3xl md:text-5xl italic text-primary/80` centered with generous padding
- Alternate between dark sections (`bg-foreground text-background`) and light sections for rhythm
- Images reference `paintings[]` array from `usePaintings()` hook (cloud storage URLs)
- Responsive: single column throughout, images always full-width on mobile
- No new dependencies needed

**File: `src/index.css`** -- Add a few utility classes:
- `.text-shadow` for legible text on image overlays
- Optional parallax helper via CSS `background-attachment: fixed` on select sections

### Testing

After implementation, the Blog, Classes, Gallery, and Collection pages should be verified for image loading from cloud storage (no code changes needed for those -- just browser verification).

