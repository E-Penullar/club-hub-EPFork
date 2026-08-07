import { test, expect } from '@playwright/test';

test.describe('Club Hub Core User Flows', () => {

  // Flow 1: 访客 (Guest) 的核心浏览流程
  test('Guest user can navigate directory and see real clubs', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    const signInBtn = page.getByRole('button', { name: 'Sign In' });
    const directoryLink = page.getByRole('link', { name: 'Directory' });
    
    await expect(signInBtn).toBeVisible();
    await expect(directoryLink).toBeVisible();

    await expect(page.getByRole('link', { name: 'My Dashboard' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Manage Club' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'System Admin' })).not.toBeVisible();

    await directoryLink.click();
    await expect(page.getByRole('heading', { name: 'Club Directory', exact: true })).toBeVisible();

    await expect(page.getByText('ACM Manoa')).toBeVisible();
    await expect(page.getByText('Association for Computing Machinery at UH Manoa.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Details' }).first()).toBeVisible();
  });

  // Flow 2: 登录页面的跳转拦截验证
  test('Clicking Sign In redirects to standard NextAuth login page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/.*api\/auth\/signin.*/);
  });

  // Flow 3: Student (普通学生) 登录流程及权限验证
  test('Student user can log in and access Dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin');
    
    // 机器人在这里自动填写邮箱，并在密码框自动输入 'changeme'
    await page.locator('input[name="email"], input[name="username"]').fill('test@test.com');
    await page.locator('input[name="password"]').fill('changeme'); 
    await page.getByRole('button', { name: /sign in/i }).click();

    //await expect(page).toHaveURL(/.*home/); 

    await expect(page.getByRole('link', { name: 'My Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Manage Club' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'System Admin' })).not.toBeVisible();
  });

  // Flow 4: Admin (系统管理员) 登录流程及最高权限验证
  test('Admin user can log in and access System Admin', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin');
    
    // 机器人在这里自动填写管理员邮箱，并输入密码 'changeme'
    await page.locator('input[name="email"], input[name="username"]').fill('admin@test.com');
    await page.locator('input[name="password"]').fill('changeme'); 
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByRole('link', { name: 'My Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Manage Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'System Admin' })).toBeVisible();
  });

});