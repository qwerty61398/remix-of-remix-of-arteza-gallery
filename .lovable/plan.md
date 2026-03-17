

## Quiz Page Verification & Animation Plan

**Header Status**: The quiz page header is correctly implemented with:
- Rounded `bg-primary/10` icon container with floating Lightbulb
- "Get Inspired" subtitle in primary color
- Full heading matching homepage CTA
- Supporting description text

All consistent with the homepage CTA styling.

---

## Plan: Add Entrance Animation to Quiz Question Transitions

**File: `src/pages/QuizPage.tsx`**

When `currentQuestion` changes, the question card should animate in with a subtle fade-up effect. This can be done with a CSS transition keyed on `currentQuestion`:

1. **Add a `key` prop** to the question card `div` (line 204) set to `currentQuestion` — this forces React to remount the element on each question change, triggering the CSS animation.

2. **Add the `animate-fade-in` class** (already defined in tailwind config) to the question card, giving it a smooth fade+slide entrance on each transition.

3. **Also animate the result screen** (the `showResult` block) with the same `animate-fade-in` class for consistency.

This is a minimal change — just adding `key={currentQuestion}` and `className="animate-fade-in"` to the question card wrapper. No new CSS or hooks needed since `animate-fade-in` already exists.

