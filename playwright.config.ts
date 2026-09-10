import { defineConfig, devices } from '@playwright/test';

/**
 * Production Playwright Audit Configuration
 *
 * Configured to audit deployed production URLs or local instances.
 * Pass AUDIT_URL environment variable to audit a specific production target:
 * e.g. AUDIT_URL=https://your-production-domain.com pnpm audit:prod
 */
const targetUrl = process.env.AUDIT_URL || process.env.BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './tests/audit',
  timeout: 45 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/audit-report.json' }],
  ],
  use: {
    baseURL: targetUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    bypassCSP: false,
    ignoreHTTPSErrors: false,
  },

  projects: [
    {
      name: 'Desktop Chrome (Audit)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'Mobile Chrome (Audit)',
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],

  // If testing against localhost without a running server, automatically start it
  ...(targetUrl.includes('localhost') || targetUrl.includes('127.0.0.1')
    ? {
        webServer: {
          command: process.platform === 'win32' ? 'pnpm.cmd --filter web dev' : 'pnpm --filter web dev',
          url: 'http://localhost:3000',
          reuseExistingServer: true,
          timeout: 120 * 1000,
        },
      }
    : {}),
});
