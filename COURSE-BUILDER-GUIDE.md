# 🚀 Course Landing Page Builder - Quick Start Guide

## Setup (Do This Once)

The system is ready to go! You have:
- ✅ `/home/user/Quantum-Scale/course-template.txt` - Template file
- ✅ `/home/user/Quantum-Scale/add-course.sh` - Interactive menu script
- ✅ Claude Code slash command: `/process-course {slug}`

## Workflow

### Step 1: Select Course
```bash
bash /home/user/Quantum-Scale/add-course.sh
```

This shows you:
- All existing courses (to update)
- All new courses (to add)

Choose a number, and it opens the template file automatically.

### Step 2: Fill Template
The template opens in your editor (nano/vi). Fill in:

```
COURSE_NAME: The Social Proof
SLUG: the-social-proof
PRICE: 39
ORIGINAL_PRICE: 197
BADGE: Most Popular
DESCRIPTION: The billion-dollar social proof tactic...
IMAGE_URL: https://quantum-scale.co/...

================================================================================
HTML CODE STARTS BELOW
================================================================================

<paste your HTML landing page code here>
```

### Step 3: Process Course
After saving the template, run:

```bash
# In Claude Code or terminal
/process-course the-social-proof
```

Or if you're in terminal:
```bash
cd /home/user/Quantum-Scale
claude-code
# Then in Claude Code: /process-course the-social-proof
```

### Step 4: Repeat
1. Run the menu script again
2. Select next course
3. Update template
4. Process with `/process-course`

---

## Template File Location
```
/home/user/Quantum-Scale/course-template.txt
```

Always use this same file - just clear it and add new content each time.

---

## Available Courses

### Existing (Update)
1. ab-test-results
2. abandoned-checkout
3. ad-copy-templates
4. ai-photographer
5. email-marketing
6. laser-targeting
7. ltv-system
8. meta-ad-templates
9. product-mapping
10. product-mapping-manipulation
11. quiz-tactic
12. subconscious-trap
13. the-social-proof

### New (Add)
1. twenty-laws-sell-anything
2. meta-ad-headlines
3. irresistible-offer
4. ugly-meta-ads

---

## Quick Reference

| Action | Command |
|--------|---------|
| Start menu | `bash add-course.sh` |
| Template file | `/home/user/Quantum-Scale/course-template.txt` |
| Process course | `/process-course {slug}` |

---

Ready? Run: `bash /home/user/Quantum-Scale/add-course.sh`
