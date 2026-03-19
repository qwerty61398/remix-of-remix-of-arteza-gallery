

## Plan: Sync Paintings to Database + Redesign About Page

### Task 1: Sync all 23 paintings to the database

Insert all 23 paintings from `src/data/paintings.ts` into the `paintings` table using SQL INSERT statements. The database table has columns: `title`, `description`, `dimensions`, `collection`, `price`, `image_url`, `is_available`, `is_featured`. 

Since the static file uses local asset imports for `image`, the `image_url` values will be set to descriptive placeholder paths (e.g. `/paintings/floral-vase.jpg`) — these can later be replaced with actual storage URLs if the app migrates to database-driven image serving.

**Approach**: Use the database insert tool to run a single INSERT with all 23 rows. The `story` field will be left null and `is_featured` false for all.

### Task 2: Redesign About Page with storytelling timeline

**File: `src/pages/AboutPage.tsx`** — Full rewrite with a modern layout:

1. **Hero Section** — Full-width with a large heading, artistic tagline, and a featured painting as background/accent image. More dramatic spacing and typography.

2. **Storytelling Timeline** — A vertical timeline with alternating left/right content blocks, each milestone showing:
   - Year or period
   - Title of the milestone
   - Description paragraph
   - Accompanying painting image from the catalog
   
   Timeline milestones:
   - **Early Years** — Childhood discovery of art, first experiments with colour
   - **Traditional Training** — Learning Madhubani, classical Indian techniques
   - **Western Exploration** — Studying oil painting, impressionism, and expressionism
   - **Finding Her Voice** — Blending Eastern and Western styles into a unique voice
   - **ARTEZA Born** — Launching the collection, sharing art with the world
   - **Today & Beyond** — Current work, commissions, teaching

3. **Values Section** — Keep the 3-card grid (Authentic Artistry, Cultural Heritage, Emotional Connection) but with refined styling.

4. **Call-to-Action** — End with a "View the Collection" or "Get in Touch" CTA section.

Uses existing `ScrollReveal` and `StaggerItem` animation components. Timeline implemented with Tailwind CSS (vertical line, alternating cards with dots/connectors). No new dependencies needed.

