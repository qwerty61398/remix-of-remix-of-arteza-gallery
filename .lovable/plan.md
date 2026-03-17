

## Plan: Auto-advance Quiz on Option Select

**File: `src/pages/QuizPage.tsx`**

1. **Modify `setSelectedOption` logic** — When an option is clicked, immediately record the answer and advance to the next question (with a brief ~300ms delay so the user sees their selection highlight before transitioning). On the last question, set the selection but don't auto-advance — show a "See Results" button instead.

2. **Remove the "Next" button** — Only show the "Back" button and a "See Results" button on the final question.

3. **Keep the Back button** — Still allows users to go back and change answers.

4. **Track if on last question** — When `currentQuestion === questions.length - 1`, clicking an option just highlights it without auto-advancing, and a "See Results" submit button appears.

