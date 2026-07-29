import { test, expect } from '@playwright/test';

// 测试公开页面是否能正常加载 (返回状态码 200)
test('Public pages should be available', async ({ page }) => {
  // 测试首页
  const homeResponse = await page.goto('http://localhost:3000/');
  expect(homeResponse?.status()).toBe(200);

  // 测试社团列表页
  const directoryResponse = await page.goto('http://localhost:3000/directory');
  expect(directoryResponse?.status()).toBe(200);
});

// 测试受保护的页面是否会拦截未登录用户并重定向到登录页
test('Protected pages should redirect unauthenticated users to sign-in', async ({ page }) => {
  // 尝试访问 My Dashboard
  await page.goto('http://localhost:3000/home');
  // 预期 URL 会包含 api/auth/signin
  await expect(page).toHaveURL(/.*api\/auth\/signin.*/);

  // 尝试访问 Manage Club
  await page.goto('http://localhost:3000/manage-club');
  await expect(page).toHaveURL(/.*api\/auth\/signin.*/);

  // 尝试访问 Admin
  await page.goto('http://localhost:3000/admin');
  await expect(page).toHaveURL(/.*api\/auth\/signin.*/);
});