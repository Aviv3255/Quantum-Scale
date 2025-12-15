# Course Landing Page Builder - Windows PowerShell Version

Write-Host "`n" -NoNewline
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║     QUANTUM SCALE - COURSE LANDING PAGE BUILDER       ║" -ForegroundColor Blue
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Blue
Write-Host "`n"

# Existing courses
$existingCourses = @(
    @{slug="ab-test-results"; name="37 A/B Tests Results"},
    @{slug="abandoned-checkout"; name="Abandoned Checkout Finisher"},
    @{slug="ad-copy-templates"; name="Ad Copy Templates"},
    @{slug="ai-photographer"; name="The `$10,000 AI Photographer"},
    @{slug="email-marketing"; name="Email Marketing"},
    @{slug="laser-targeting"; name="Laser Targeting"},
    @{slug="ltv-system"; name="The Automatic System That Earn `$1,000"},
    @{slug="meta-ad-templates"; name="Meta Ad Templates"},
    @{slug="product-mapping"; name="Product Mapping"},
    @{slug="product-mapping-manipulation"; name="Product Mapping Manipulation"},
    @{slug="quiz-tactic"; name="The Quiz Tactic"},
    @{slug="subconscious-trap"; name="The Subconscious Trap"},
    @{slug="the-social-proof"; name="The Social Proof"}
)

# New courses
$newCourses = @(
    @{slug="twenty-laws-sell-anything"; name="The 20 Laws to Sell Anything"},
    @{slug="meta-ad-headlines"; name="85 Meta ad Headlines & Hooks"},
    @{slug="irresistible-offer"; name="Offer workshop: Irresistible ecom offer"},
    @{slug="ugly-meta-ads"; name="How To Build Simple & Ugly Meta Ad Creatives"}
)

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "EXISTING COURSES (UPDATE):" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

for ($i = 0; $i -lt $existingCourses.Count; $i++) {
    $num = $i + 1
    Write-Host "$num) " -ForegroundColor White -NoNewline
    Write-Host $existingCourses[$i].name -ForegroundColor Cyan
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "NEW COURSES (ADD):" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

for ($i = 0; $i -lt $newCourses.Count; $i++) {
    $num = $existingCourses.Count + $i + 1
    Write-Host "$num) " -ForegroundColor White -NoNewline
    Write-Host $newCourses[$i].name -ForegroundColor Cyan
}

Write-Host "`n════════════════════════════════════════════════════════" -ForegroundColor Green
$choice = Read-Host -Prompt "Choose course number"

# Validate input
$choiceNum = [int]$choice
$totalCourses = $existingCourses.Count + $newCourses.Count

if ($choiceNum -lt 1 -or $choiceNum -gt $totalCourses) {
    Write-Host "❌ Invalid choice!" -ForegroundColor Red
    exit 1
}

# Get selected course
if ($choiceNum -le $existingCourses.Count) {
    $selectedSlug = $existingCourses[$choiceNum - 1].slug
    $selectedName = $existingCourses[$choiceNum - 1].name
    $courseType = "UPDATE"
} else {
    $selectedSlug = $newCourses[$choiceNum - $existingCourses.Count - 1].slug
    $selectedName = $newCourses[$choiceNum - $existingCourses.Count - 1].name
    $courseType = "NEW"
}

Write-Host "`n✓ Selected: " -ForegroundColor Green -NoNewline
Write-Host $selectedName -ForegroundColor Cyan
Write-Host "Type: " -ForegroundColor Green -NoNewline
Write-Host $courseType -ForegroundColor Yellow

$templateFile = "$PSScriptRoot\course-template.txt"

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host "Template file location:" -ForegroundColor Green
Write-Host $templateFile -ForegroundColor Cyan
Write-Host "`nSteps:" -ForegroundColor Yellow
Write-Host "1. Open the template file in your editor"
Write-Host "2. Fill in course details (COURSE_NAME, SLUG, PRICE, etc.)"
Write-Host "3. Paste the HTML landing page code"
Write-Host "4. Save the file"
Write-Host "5. Run: " -ForegroundColor Yellow -NoNewline
Write-Host "/process-course $selectedSlug" -ForegroundColor Cyan
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow

# Ask to open in editor
$openEditor = Read-Host -Prompt "Open template file in Notepad now? (y/n)"

if ($openEditor -eq "y" -or $openEditor -eq "Y") {
    notepad $templateFile
}

Write-Host "`n✓ Done! When ready, run:" -ForegroundColor Green
Write-Host "/process-course $selectedSlug" -ForegroundColor Cyan
Write-Host "`n"
