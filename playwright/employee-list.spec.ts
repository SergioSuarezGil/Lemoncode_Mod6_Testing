import { test, expect } from '@playwright/test';

test.describe('Employee List - Buscar empleado', () => {
  test('should login, navigate to employees and search for Jose Gomez', async ({
    page,
  }) => {
    // Arrange
    await page.goto('/login');
    await page.fill('input[name="user"]', 'admin');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*submodule-list/);
    await page.goto('/#/employees');

    // Act
    const searchInput = page.locator(
      'input[placeholder*="Buscar" i], input[aria-label*="Buscar" i], input[name*="search" i]'
    );
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Jose Gomez');
    const searchButton = page.locator(
      'button[type="submit"], button[aria-label*="Buscar" i]'
    );
    if (await searchButton.count()) {
      await searchButton.first().click();
    } else {
      await searchInput.press('Enter');
    }

    // Assert
    await expect(page.locator('body')).toContainText('Jose Gomez');
  });
});
