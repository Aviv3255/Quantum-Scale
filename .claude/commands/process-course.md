# Process Course Landing Page

This command processes a course landing page from the template file and adds/updates it in the system.

Usage:
```
/process-course {slug}
```

Example:
```
/process-course the-social-proof
/process-course twenty-laws-sell-anything
```

The command will:
1. Read the course template at `/home/user/Quantum-Scale/course-template.txt`
2. Extract course metadata (name, price, description, etc.)
3. Extract HTML landing page code
4. Add or update the course in:
   - `genrok-app/src/data/courses.ts`
   - `genrok-app/src/data/course-html-blocks.ts`
5. Run format and type checks
6. Commit changes
7. Push to feature branch

**Template Format:**
```
COURSE_NAME: The Social Proof
SLUG: the-social-proof
PRICE: 39
ORIGINAL_PRICE: 197
BADGE: Most Popular
DESCRIPTION: The billion-dollar social proof tactic...
IMAGE_URL: https://...

================================================================================
HTML CODE STARTS BELOW - DELETE THIS LINE AND PASTE YOUR HTML
================================================================================

<!DOCTYPE html>
...your HTML landing page...
</html>
```

The slug parameter must match the SLUG in the template file.
