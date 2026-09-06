import { test, expect } from '@playwright/test';
import { AUDIT_ROUTES } from './routes';

test.describe('📱 Production Mobile & Responsive Layout Audit', () => {
  for (const route of AUDIT_ROUTES) {
    test(`Route ${route.path} (${route.name}) should not have horizontal overflow`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle').catch(() => {});

      // Check if document has horizontal overflow
      const overflow = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
        const clientWidth = docEl.clientWidth;
        return {
          hasOverflow: scrollWidth > clientWidth + 2, // 2px tolerance for subpixel rendering
          scrollWidth,
          clientWidth,
        };
      });

      expect(
        overflow.hasOverflow,
        `Horizontal overflow detected on ${route.path} (scrollWidth: ${overflow.scrollWidth}px, viewport: ${overflow.clientWidth}px)`
      ).toBeFalsy();
    });
  }
});
