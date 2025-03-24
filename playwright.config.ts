import {defineConfig, devices} from '@playwright/test';

const DEV = (process.env.NODE_ENV ?? 'production') === 'development';
const TEMPLATE = process.env.TEMPLATE ?? 'test';

export default defineConfig({
  webServer: [
    {
      command: 'npm run dev --prefix templates/angular-starter',
      reuseExistingServer: true,
      port: 4200
    }
  ],
  testDir: 'e2e',
  testMatch: ['**/*.e2e.ts', '**/*.spec.ts'],
  timeout: 60000,
  use: {
    testIdAttribute: 'data-tid',
    trace: 'on',
    ...(DEV && {headless: false}),
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:4200'
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {...devices['Desktop Chrome'], channel: 'chrome'}
    }
  ],
  workers: process.env.CI ? 1 : undefined,
  snapshotPathTemplate: `{testDir}/__screenshots__/${TEMPLATE}/{testFilePath}/{arg}{ext}`
});
