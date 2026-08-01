import { test, expect } from '@playwright/test';

test.describe('Manage Club Form Tests', () => {

 test.beforeEach(async ({ page }) => {
   // Navigate to the page
   await page.goto('/manage-club');
 });


 test('should render all form inputs and action buttons', async ({ page }) => {
   // Locate inputs by their HTML `id` attributes from your page.tsx
   await expect(page.locator('#description')).toBeVisible();
   await expect(page.locator('#email')).toBeVisible();
   await expect(page.locator('#meetingTime')).toBeVisible();
   await expect(page.locator('#location')).toBeVisible();


   // Match the main submit button text ("Save Changes")
   const saveBtn = page.getByRole('button', { name: 'Save Changes' });
   await expect(saveBtn).toBeVisible();
   await expect(saveBtn).toBeEnabled();
 });


 test('should allow user to type and submit form changes', async ({ page }) => {
   // Fill test values into form controls
   await page.locator('#description').fill('Updated club details for testing');
   await page.locator('#email').fill('test@hawaii.edu');
   await page.locator('#meetingTime').fill('Mondays at 4:00 PM');
   await page.locator('#location').fill('POST 101');


   // Click Save Changes to trigger Server Action
   await page.getByRole('button', { name: 'Save Changes' }).click();


   // Verify fields retain inputs
   await expect(page.locator('#description')).toHaveValue('Updated club details for testing');
 });


 test('should verify right-side disabled announcement controls', async ({ page }) => {
   // Match the disabled "Post Now" button on the right side
   const postNowBtn = page.getByRole('button', { name: 'Post Now' });
   await expect(postNowBtn).toBeVisible();
   await expect(postNowBtn).toBeDisabled();
 });

});
