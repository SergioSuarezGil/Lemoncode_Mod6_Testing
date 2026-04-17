import { test, expect } from '@playwright/test';

test.describe('Login and Submodule List', () => {
  test('should show error on invalid credentials', async ({ page }) => {
    // Arrange
    await page.goto('/login');

    // Act
    await page.fill('input[name="user"]', 'wrong');
    await page.fill('input[name="password"]', 'wrong');
    await page.click('button[type="submit"]');

    // Assert
    await expect(page.locator('body')).toContainText('Usuario y/o password no válidos');
    await expect(page).toHaveURL(/.*login/);
  });

  test('should login and navigate to submodule list', async ({ page }) => {
    // Arrange
    await page.goto('/login');

    // Act
    await page.fill('input[name="user"]', 'admin');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    // Assert
    await expect(page).toHaveURL(/.*submodule-list/);
  });
});
