

## Plan: Vinyl Disk Animation with Spotify Playlist on Quiz Results

### Overview
Add a vinyl record animation to the quiz results page. Each collection gets a playlist name, track list, and a spinning vinyl disk with a play button. When clicked, the vinyl spins and (once Spotify URLs are added) plays the embedded playlist. For now, the vinyl animation and track list will be visual, with placeholder Spotify URIs ready to swap in later.

### Data Structure
Add playlist data (name, tracks, placeholder Spotify URI) for each collection slug directly in `QuizPage.tsx`.

### Vinyl Component
Create `src/components/quiz/VinylPlayer.tsx`:
- A vinyl disk with grooves rendered via CSS (radial gradients, concentric circles)
- Center label showing the playlist name
- Play/Pause button overlay in the center
- CSS `@keyframes spin` animation that activates when "playing"
- Hidden Spotify iframe embed (loaded via iFrame API) that will be controllable once real URLs are provided
- Track list displayed below the vinyl in a scrollable list

### Quiz Results Page Changes
**File: `src/pages/QuizPage.tsx`**
- Add playlist data mapping (collection slug → playlist name + tracks)
- Replace the check icon with the VinylPlayer component
- Keep existing "Explore Collection" and "Retake Quiz" buttons below
- Show playlist name as a subtitle (e.g. "Emotional Chaos: Abstract Echoes")

### CSS Additions
**File: `src/index.css`**
- Add `@keyframes vinyl-spin` (continuous rotation)
- Vinyl grooves via layered box-shadows or radial gradients
- Tonearm animation (optional subtle lift/drop)

### Visual Design
- Vinyl disk: ~250px diameter, dark with subtle groove lines, primary-colored center label
- Play button: white triangle in a translucent circle at center
- Spinning: smooth 2s rotation when playing
- Track list: scrollable container below vinyl, showing track name, artist, duration

### Files to create/modify
1. **Create** `src/components/quiz/VinylPlayer.tsx` — vinyl disk + play/pause + track list
2. **Modify** `src/pages/QuizPage.tsx` — integrate playlist data and VinylPlayer into results
3. **Modify** `src/index.css` — add vinyl spin animation

