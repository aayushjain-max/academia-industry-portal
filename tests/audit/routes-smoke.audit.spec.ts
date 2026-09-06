import { test, expect } from '@playwright/test';
import { AUDIT_ROUTES } from './routes';

test.describe('🚀 Production Routes & Smoke Health Audit', () => {
  for (const route of AUDIT_ROUTES) {
    test(`Route ${route.path} (${route.name}) loads with HTTP 200 and renders main content`, async ({ page }) => {
      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });

      // Verify HTTP status
      expect(response?.status(), `Route ${route.path} returned HTTP status ${response?.status()}`).toBe(200);

      // Verify body is rendered and not empty
      const body = page.locator('body');
      await expect(body).toBeVisible();

      // Verify main landmark or primary container exists
      const mainOrRoot = page.locator('main, #__next, [role="main"], body > div').first();
      await expect(mainOrRoot).toBeVisible();

      // Verify header / navigation or logo exists
      const navbarOrLogo = page.locator('nav, header, a[href="/"]').first();
      await expect(navbarOrLogo).toBeVisible();
    });
  }
});
