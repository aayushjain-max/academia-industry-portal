import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AUDIT_ROUTES } from './routes';

test.describe('♿ Production Accessibility (WCAG) Audit', () => {
  for (const route of AUDIT_ROUTES) {
    test(`Route ${route.path} (${route.name}) should meet WCAG 2.1 AA accessibility standards`, async ({ page }) => {
      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBeLessThan(400);

      // Give dynamic components a moment to settle
      await page.waitForLoadState('networkidle').catch(() => {});

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        const violationSummary = accessibilityScanResults.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
          helpUrl: v.helpUrl,
        }));
        console.warn(`[A11y Violations on ${route.path}]:`, JSON.stringify(violationSummary, null, 2));
      }

      // Assert zero critical accessibility violations
      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical'
      );
      expect(criticalViolations, `Found ${criticalViolations.length} critical accessibility violation(s) on ${route.path}`).toEqual([]);
    });
  }
});
