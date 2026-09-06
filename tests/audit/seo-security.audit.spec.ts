import { test, expect } from '@playwright/test';
import { AUDIT_ROUTES } from './routes';

test.describe('🔍 Production SEO & Metadata Audit', () => {
  for (const route of AUDIT_ROUTES) {
    test(`Route ${route.path} (${route.name}) should have proper document title, viewport, and meta tags`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });

      // 1. Check Document Title
      const title = await page.title();
      expect(title.trim().length, `Missing document title on ${route.path}`).toBeGreaterThan(0);

      // 2. Check Viewport Meta Tag
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport, `Missing viewport meta tag on ${route.path}`).toHaveCount(1);
      const viewportContent = await viewport.getAttribute('content');
      expect(viewportContent).toContain('width=device-width');

      // 3. Check HTML Lang attribute
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang, `<html> element is missing a lang attribute on ${route.path}`).toBeTruthy();
    });
  }
});

test.describe('🛡️ Production Security Headers Audit', () => {
  test('Landing page response should include baseline security headers in production', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();

    const headers = response?.headers() || {};

    // Note: When running on localhost dev server, certain prod headers (like Strict-Transport-Security) may be absent.
    // In production environment (HTTPS), verify security headers:
    const isProductionHttps = page.url().startsWith('https://');

    if (isProductionHttps) {
      expect(
        headers['strict-transport-security'] || headers['x-content-type-options'] || headers['x-frame-options'],
        'Expected standard security headers in production'
      ).toBeDefined();
    }
  });
});
