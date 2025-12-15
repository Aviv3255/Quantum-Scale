#!/bin/bash

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════╗"
echo "║     QUANTUM SCALE - COURSE LANDING PAGE BUILDER       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Existing courses
declare -a EXISTING=(
  "ab-test-results|37 A/B Tests Results"
  "abandoned-checkout|Abandoned Checkout Finisher"
  "ad-copy-templates|Ad Copy Templates"
  "ai-photographer|The $10,000 AI Photographer"
  "email-marketing|Email Marketing"
  "laser-targeting|Laser Targeting"
  "ltv-system|The Automatic System That Earn \$1,000"
  "meta-ad-templates|Meta Ad Templates"
  "product-mapping|Product Mapping"
  "product-mapping-manipulation|Product Mapping Manipulation"
  "quiz-tactic|The Quiz Tactic"
  "subconscious-trap|The Subconscious Trap"
  "the-social-proof|The Social Proof"
)

# New courses (not in system yet)
declare -a NEW=(
  "twenty-laws-sell-anything|The 20 Laws to Sell Anything"
  "meta-ad-headlines|85 Meta ad Headlines & Hooks"
  "irresistible-offer|Offer workshop: Irresistible ecom offer"
  "ugly-meta-ads|How To Build Simple & Ugly Meta Ad Creatives"
)

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}EXISTING COURSES (UPDATE):${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

for i in "${!EXISTING[@]}"; do
  IFS='|' read slug name <<< "${EXISTING[$i]}"
  printf "%2d) ${BLUE}%-30s${NC}\n" $((i+1)) "$name"
done

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}NEW COURSES (ADD):${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

for i in "${!NEW[@]}"; do
  IFS='|' read slug name <<< "${NEW[$i]}"
  printf "%2d) ${BLUE}%-30s${NC}\n" $((i + ${#EXISTING[@]} + 1)) "$name"
done

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}Choose course number:${NC} "
read -p "" choice

# Validate input
if ! [[ "$choice" =~ ^[0-9]+$ ]] || [ "$choice" -lt 1 ] || [ "$choice" -gt $((${#EXISTING[@]} + ${#NEW[@]})) ]; then
  echo -e "${RED}❌ Invalid choice!${NC}"
  exit 1
fi

# Get selected course
if [ "$choice" -le "${#EXISTING[@]}" ]; then
  IFS='|' read SELECTED_SLUG SELECTED_NAME <<< "${EXISTING[$((choice-1))]}"
  COURSE_TYPE="UPDATE"
else
  IFS='|' read SELECTED_SLUG SELECTED_NAME <<< "${NEW[$((choice - ${#EXISTING[@]} - 1))]}"
  COURSE_TYPE="NEW"
fi

echo ""
echo -e "${GREEN}✓ Selected:${NC} ${BLUE}${SELECTED_NAME}${NC}"
echo -e "${GREEN}Type:${NC} ${YELLOW}${COURSE_TYPE}${NC}"
echo ""

# Show template file path
TEMPLATE_FILE="/home/user/Quantum-Scale/course-template.txt"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Template file location:${NC}"
echo -e "${BLUE}${TEMPLATE_FILE}${NC}"
echo ""
echo -e "${YELLOW}Steps:${NC}"
echo "1. Open the template file in your editor"
echo "2. Fill in course details (COURSE_NAME, SLUG, PRICE, etc.)"
echo "3. Paste the HTML landing page code"
echo "4. Save the file"
echo "5. Run: ${BLUE}claude-code add-course:${SELECTED_SLUG}${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Open template in default editor (if available)
if command -v nano &> /dev/null; then
  echo -e "${YELLOW}Opening template in nano...${NC}"
  nano "$TEMPLATE_FILE"
elif command -v vi &> /dev/null; then
  echo -e "${YELLOW}Opening template in vi...${NC}"
  vi "$TEMPLATE_FILE"
else
  echo -e "${YELLOW}Please open the template file manually in your editor${NC}"
fi

echo ""
echo -e "${GREEN}✓ Done! When ready, run:${NC}"
echo -e "${BLUE}claude-code add-course:${SELECTED_SLUG}${NC}"
