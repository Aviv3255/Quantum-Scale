# Add Course Landing Page HTML

You are helping the user add a landing page HTML content for one of their courses.

## Available Courses (Already in System):

| # | Course Name | Slug |
|---|-------------|------|
| 1 | The Subconscious Trap | `subconscious-trap` |
| 2 | The LTV System ($1,000 per Customer) | `ltv-system` |
| 3 | Email Marketing Revenue Engine | `email-marketing` |
| 4 | Abandoned Checkout Finisher | `abandoned-checkout` |
| 5 | The Social Proof | `the-social-proof` |
| 6 | Product Mapping Manipulation | `product-mapping` |
| 7 | A/B Test Results | `ab-test-results` |
| 8 | The Quiz Tactic | `quiz-tactic` |
| 9 | Laser Targeting | `laser-targeting` |
| 10 | The $10,000 AI Photographer | `ai-photographer` |
| 11 | 1,000+ Meta Static Ad Templates | `meta-ad-templates` |
| 12 | 50+ Ad Copy Templates | `ad-copy-templates` |

## Courses to Add Later:
- 85 Meta Ad Headlines & Hooks
- Offer Workshop: Irresistible Ecom Offer
- The 20 Laws to Sell Anything
- How To Build Simple & Ugly Meta Ads

---

## Instructions:

1. First, ask the user in Hebrew: "באיזה קורס אתה רוצה להוסיף דף נחיתה? רשום את המספר (1-12):"

2. After they select a course, tell them in Hebrew:
   - "מעולה! עכשיו תדביק את כל קוד ה-HTML של דף הנחיתה עבור [COURSE NAME]."
   - "אתה יכול להדביק ישירות כאן - זה יכול להיות ארוך ככל שצריך."

3. Once they paste the HTML:
   - Open the file: `genrok-app/src/data/course-html-blocks.ts`
   - Find the entry for that course slug (or add a new one if it doesn't exist)
   - Replace the placeholder content with the actual HTML
   - Make sure to properly escape any backticks in the HTML (replace ` with \`)
   - Preserve all CSS styles, classes, and structure exactly as provided

4. After saving, confirm in Hebrew: "דף הנחיתה עבור [COURSE NAME] נוסף בהצלחה! תוכל לראות אותו בכתובת: /courses/[slug]"

## Important Rules:
- Keep the HTML exactly as the user provides it - don't modify or beautify
- The HTML should be wrapped in template literals (backticks)
- Make sure the entry in courseHTMLBlocks uses the correct slug as the key
- If there are backticks (`) in the HTML, escape them with backslash (\`)
- Always verify the slug matches an existing course in the system
