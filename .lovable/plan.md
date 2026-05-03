

## Plan: Fix Build Error + Vinyl Player Enhancements

### 1. Fix CSS Build Error
**File: `src/index.css` (line 377)**
Remove the stray `}` after the `mosaic-float` keyframe. The keyframe closes on line 376 but there's an extra `}` on line 377 that breaks the CSS parser.

### 2. Replace Center Label with Playlist Cover Image
**File: `src/components/quiz/VinylPlayer.tsx`**
- Add a `coverImage` prop to VinylPlayer
- Replace the center purple circle text with a circular image showing each playlist's cover art
- Use Spotify's CDN to extract cover images from playlist IDs: `https://mosaic.scdn.co/...` — since we can't reliably extract from the embed, we'll use the Spotify oEmbed API (`https://open.spotify.com/oembed?url=...`) or hardcode cover image URLs
- For playlists without a Spotify URI, show the primary-colored circle with no text

### 3. Make Embed Visible and Interactable
**File: `src/components/quiz/VinylPlayer.tsx`**
- Make the Spotify embed always visible (not hidden) with a reasonable height (~152px for compact player)
- Remove the track list display entirely (already done)

### 4. Sync Vinyl Play Button with Embed
Due to iframe security restrictions, we cannot programmatically control the Spotify embed's play/pause. However, we can use Spotify's embed API approach:
- Use `https://open.spotify.com/embed/playlist/{id}?utm_source=generator&theme=0&autoplay=1` — when the vinyl is clicked, reload the iframe with `autoplay=1` to trigger playback
- When paused, reload without autoplay or remove the src temporarily

### 5. Add Cover Images to Playlist Data
**File: `src/pages/QuizPage.tsx`**
- Add a `coverImage` field to each playlist entry, using the Spotify oEmbed endpoint or a static fallback
- Pass `coverImage` to VinylPlayer

### Files to modify
1. `src/index.css` — remove stray `}` on line 377
2. `src/components/quiz/VinylPlayer.tsx` — add cover image prop, sync play with embed autoplay, ensure embed is visible
3. `src/pages/QuizPage.tsx` — pass cover image URLs to VinylPlayer

