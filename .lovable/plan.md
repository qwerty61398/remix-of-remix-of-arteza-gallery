

## Plan: Update Social Links Across All Pages

Two files contain social links that need updating:

### 1. `src/components/layout/Footer.tsx`
- Replace the current socialLinks array (Instagram, YouTube, Facebook) with Facebook, WhatsApp, Instagram, Pinterest
- Update lucide-react imports: remove `Youtube`, add `MessageCircle` (for WhatsApp) and a Pinterest icon (lucide has no Pinterest icon, so I'll use an inline SVG or a suitable alternative)
- Note: Lucide doesn't have WhatsApp or Pinterest icons. I'll use `MessageCircle` for WhatsApp and create a small custom SVG component for Pinterest, or use text-based approach.

### 2. `src/pages/ContactPage.tsx`
- Same changes: replace socialLinks with Facebook, WhatsApp, Instagram, Pinterest
- Update imports accordingly

### Icon Strategy
- **Facebook**: `Facebook` from lucide-react ✓
- **WhatsApp**: No native lucide icon — use inline SVG
- **Instagram**: `Instagram` from lucide-react ✓
- **Pinterest**: No native lucide icon — use inline SVG

Both WhatsApp and Pinterest will use small inline SVG components for their icons to maintain visual consistency.

