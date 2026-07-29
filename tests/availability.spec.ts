import { test, expect } from '@playwright/test';

const navPagesToTest = [
    // Tests src/app/page.tsx
    { name: 'Club Hub (Home)', label: 'Club Hub', path: '/' },

    // Tests src/app/admin/page.tsx
    { name: 'System Admin', label: 'System Admin', path: '/admin' },

    // Tests src/app/home/page.tsx
    { name: 'My Dashboard', label: 'My Dashboard', path: '/home' },

    // Tests src/app/directory/page.tsx
    { name: 'Directory', label: 'Directory', path: '/directory' },

    // Tests src/app/manage-club/page.tsx
    { name: 'Manage Club', label: 'Manage Club', path: '/manage-club' },
];

test.describe('Navbar Navigation Tests', () => {
  for (const item of navPagesToTest) {
    test(`should navigate to ${item.label}`, async ({ page }) => {
      await page.goto('/');
      
      // Click the link in the navbar
      await page.getByRole('link', { name: item.label }).click();
      
      // Verify path changed and page loaded successfully
      await expect(page).toHaveURL(new RegExp(`${item.path}$`));
      await expect(page.locator('body')).toBeVisible();
    });
  }

});