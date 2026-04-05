

## Plan: Update Nature's Palette Mediums, Descriptions, and Simplify Shop Cards

### 1. Update medium to "Acrylic" for Nature's Palette paintings

Use the database insert tool to run UPDATE statements changing `medium` from "Oil on Canvas" to "Acrylic" for these 8 paintings (Harmony of Seasons excluded, 3 others already Acrylic):
- Azure Petals: Summer's Whisper
- Cherry Blossoms: Pink Cascade
- Crimson Cascade: Blooms in Red
- Garden Riot: Roses Unbound
- Midnight Dahlias: Cobalt Embrace
- Sapphire Irises: Marbled Dreams
- Sunlit Harvest: Sunflowers in Clay
- Teal Window: Red Roses Ascending

### 2. Expand short descriptions to 5+ sentences

11 paintings in Nature's Palette have only 1 sentence descriptions. Will update each with rich, 5-sentence descriptions that capture the painting's mood, colors, technique, composition, and emotional impact. Cherry Blossoms (3 sentences) is the only one already close but still needs expansion to 5.

### 3. Simplify ArtworkCard on shop page

**File: `src/components/artwork/ArtworkCard.tsx`**

Remove the description block (lines 71-75) from the default variant so the card only shows:
- Painting image (clickable)
- Title
- Dimensions
- Medium
- Price + Add to Cart button

Description will only be visible on the painting detail page when clicked.

### Files to modify
- `src/components/artwork/ArtworkCard.tsx` — remove description from card
- Database — UPDATE medium and descriptions for Nature's Palette paintings

