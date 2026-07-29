import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: 'html',

    use: {
        baseURL: process.env.BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
        trace: 'on-first-retry',
    },

    // Configure projects for major browsers.
    projects: [
        { 
            name: 'chromium', 
            use: { ...devices['Desktop Chrome'] } 
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

  // Run your local dev server before starting the tests.
    webServer: process.env.BASE_URL || process.env.VERCEL_URL ? undefined :{
        command: 'npm run build && npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});