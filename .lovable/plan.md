

## Typewriter Effect on Hero Heading

Add a typewriter animation to the hero section that cycles the ending phrase. The heading will read:

**"Art That Speaks to [rotating text]"**

Where `[rotating text]` cycles through phrases like:
- Your Soul
- Your Heart
- The World
- Every Emotion
- New Heights

### Implementation

1. **Create a `useTypewriter` hook** (`src/hooks/use-typewriter.ts`) that:
   - Accepts an array of strings and typing/deleting speed config
   - Types out each phrase character by character, pauses, then deletes it before moving to the next
   - Returns the current displayed text and a blinking cursor state

2. **Update `src/pages/HomePage.tsx`**:
   - Import and use the hook with the phrase list
   - Replace the static "Your Soul" span with the dynamic typewriter text
   - Add a blinking cursor character (`|`) after the text using a CSS animation
   - The primary color styling stays on the rotating text

3. **Add cursor blink animation** in `src/index.css`:
   - Simple `@keyframes blink` toggling opacity for the cursor

