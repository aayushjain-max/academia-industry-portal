import { test, expect } from '@playwright/test';
import { AUDIT_ROUTES } from './routes';

test.describe('🚨 Production Console & Network Error Audit', () => {
  for (const route of AUDIT_ROUTES) {
    test(`Route ${route.path} (${route.name}) should render with zero unhandled JS exceptions or fatal network errors`, async ({ page }) => {
      const uncaughtErrors: string[] = [];
      const failedRequests: { url: string; status: number }[] = [];

      // Listen for runtime errors on the page
      page.on('pageerror', (exception) => {
        uncaughtErrors.push(`Uncaught Error: ${exception.message}\n${exception.stack || ''}`);
      });

      // Listen for failed responses (4xx or 5xx), ignoring harmless third-party / favicon misses if any
      page.on('response', (response) => {
        if (response.status() >= 400) {
          const url = response.url();
          // Filter out optional analytics or favicon 404s if desired
          if (!url.includes('favicon.ico')) {
            failedRequests.push({ url, status: response.status() });
          }
        }
      });

      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(response?.ok(), `Page failed to load: ${route.path} returned status ${response?.status()}`).toBeTruthy();

      await page.waitForLoadState('networkidle').catch(() => {});

      // Assert no uncaught JS runtime exceptions
      expect(uncaughtErrors, `Uncaught JS errors found on ${route.path}:\n${uncaughtErrors.join('\n\n')}`).toEqual([]);

      // Assert no critical 500 server errors
      const serverErrors = failedRequests.filter((r) => r.status >= 500);
      expect(serverErrors, `Server 5xx error responses detected on ${route.path}`).toEqual([]);
    });
  }
});
