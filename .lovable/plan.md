

## Plan: Parallax Effect + Medium/Material for Paintings

### 1. Add parallax scrolling to About page full-bleed images

**File: `src/pages/AboutPage.tsx`**

Update the `FullBleedImage` component's `<img>` tag to use a fixed-position background technique for parallax. Replace the `<img>` with a `div` using `background-image` + `background-attachment: fixed` + `background-size: cover` + `background-position: center`. This creates a natural parallax scroll effect without JavaScript.

Fallback: On mobile (where `background-attachment: fixed` is poorly supported), use standard `object-cover` image via a media query or Tailwind responsive class.

### 2. Add `medium` and `material` columns to the `paintings` table

**Database migration:**
```sql
ALTER TABLE public.paintings
  ADD COLUMN medium text DEFAULT 'Oil on Canvas',
  ADD COLUMN material text DEFAULT 'Canvas';
```

This gives all existing paintings sensible defaults.

### 3. Update the data hook to map `medium` and `material`

**File: `src/hooks/use-paintings.ts`**

- Add `medium` and `material` to the `DbPainting` interface
- Map them in `mapDbToPainting` instead of hardcoding empty strings

### 4. Display medium/material on the Shop page (ArtworkCard)

**File: `src/components/artwork/ArtworkCard.tsx`**

Add a small line below dimensions showing medium info, e.g.:
```
<p className="text-xs text-muted-foreground">{painting.medium}</p>
```

### 5. Detail page already shows medium/material

The `PaintingDetailPage` already conditionally renders medium and material (lines 98-99), so it will automatically display once the hook provides real data.

### Files to modify
- `src/pages/AboutPage.tsx` — parallax effect on full-bleed images
- `src/hooks/use-paintings.ts` — map new DB columns
- `src/components/artwork/ArtworkCard.tsx` — show medium info on shop cards
- Database migration — add `medium` and `material` columns

