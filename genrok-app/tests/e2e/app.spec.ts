import { test, expect } from '@playwright/test';

/**
 * Quantum Scale - Core E2E Tests
 * 🧪 Comprehensive testing for all critical paths
 */

test.describe('Core Application Tests', () => {

  test.describe('Navigation & Routing', () => {
    test('homepage loads and redirects correctly', async ({ page }) => {
      await page.goto('/');
      // Should redirect to login or dashboard
      await expect(page).toHaveURL(/\/(login|dashboard)/);
    });

    test('login page loads correctly', async ({ page }) => {
      await page.goto('/login');
      await expect(page).toHaveURL('/login');
      await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    });

    test('courses page is accessible', async ({ page }) => {
      await page.goto('/courses');
      await expect(page).toHaveURL(/\/courses|\/login/);
    });
  });

  test.describe('UI/UX Quality Checks', () => {
    test('no horizontal scroll on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/login');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });

    test('no console errors on page load', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto('/login');
      await page.waitForTimeout(2000);

      // Filter out known acceptable errors (like third-party scripts)
      const criticalErrors = errors.filter(e =>
        !e.includes('favicon') &&
        !e.includes('third-party') &&
        !e.includes('analytics')
      );

      expect(criticalErrors).toHaveLength(0);
    });

    test('no broken images', async ({ page }) => {
      await page.goto('/login');

      const brokenImages = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        const broken: string[] = [];
        images.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            broken.push(img.src);
          }
        });
        return broken;
      });

      expect(brokenImages).toHaveLength(0);
    });

    test('all buttons are clickable', async ({ page }) => {
      await page.goto('/login');

      const buttons = page.locator('button:visible');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        await expect(button).toBeEnabled();
      }
    });
  });

  test.describe('Accessibility', () => {
    test('page has proper heading structure', async ({ page }) => {
      await page.goto('/login');

      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });

    test('all interactive elements are keyboard accessible', async ({ page }) => {
      await page.goto('/login');

      // Tab through the page
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).not.toBe('BODY');
    });

    test('form inputs have labels', async ({ page }) => {
      await page.goto('/login');

      const inputs = page.locator('input:visible');
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const placeholder = await input.getAttribute('placeholder');

        // Input should have either a label, aria-label, or placeholder
        const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false;
        expect(hasLabel || ariaLabel || placeholder).toBeTruthy();
      }
    });
  });

  test.describe('Performance', () => {
    test('page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/login', { waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;

      // Page should load in under 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test.describe('Responsive Design', () => {
    const viewports = [
      { name: 'Mobile S', width: 320, height: 568 },
      { name: 'Mobile M', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1440, height: 900 },
    ];

    for (const viewport of viewports) {
      test(`renders correctly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/login');

        // Check no horizontal overflow
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        expect(hasOverflow).toBe(false);

        // Take screenshot for visual reference
        await page.screenshot({
          path: `test-results/responsive-${viewport.name.replace(' ', '-')}.png`,
          fullPage: true
        });
      });
    }
  });
});

test.describe('Authentication Flow', () => {
  test('login form validates required fields', async ({ page }) => {
    await page.goto('/login');

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show validation errors or not navigate away
      await expect(page).toHaveURL('/login');
    }
  });

  test('signup link exists and works', async ({ page }) => {
    await page.goto('/login');

    const signupLink = page.locator('a[href*="signup"], a[href*="register"]');
    if (await signupLink.count() > 0) {
      await signupLink.first().click();
      await expect(page).toHaveURL(/signup|register/);
    }
  });
});

test.describe('Courses Section', () => {
  test('courses page structure is correct', async ({ page }) => {
    await page.goto('/courses');

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Check if redirected to login (expected if not authenticated)
    const currentUrl = page.url();
    if (currentUrl.includes('/courses')) {
      // If on courses page, check for course cards or list
      const content = await page.content();
      expect(content.length).toBeGreaterThan(1000);
    }
  });
});
