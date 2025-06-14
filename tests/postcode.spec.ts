import { test, expect } from '@playwright/test';

test.describe('Postcode select page', () => {
  test('can select postcode and see restaurants', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.getByText('Select Your Area')).toBeVisible();
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByText('View Restaurants').click();
    await expect(page).toHaveURL(/\/restaurants/);
    await expect(page.getByText('Standard Indian Takeaway')).toBeVisible();
  });

  test('shows loading state when fetching postcodes', async ({ page }) => {
    await page.route('**/postcodes*', async route => {
      await new Promise(res => setTimeout(res, 1000));
      route.continue();
    });
    await page.goto('http://localhost:5174/');
    await expect(page.getByText('Loading')).toBeVisible();
  });

  test('button is disabled when no postcode is selected', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.getByTestId('view-restaurants-btn')).toBeDisabled();
  });

  test('button is enabled when postcode is selected', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await expect(page.getByTestId('view-restaurants-btn')).not.toBeDisabled();
  });

  test('navigates back to postcode select from restaurants page', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByText('View Restaurants').click();
    await page.getByRole('link', { name: /Cardiff/i }).click();
    await expect(page.getByText('Select Your Area')).toBeVisible();
  });

  test('shows correct page title', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.getByText('Select Your Area')).toBeVisible();
    await expect(page.getByText('Choose a postcode:')).toBeVisible();
  });

  test('select has proper accessibility label', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await expect(page.locator('select[aria-label="Postcode Select"]')).toBeVisible();
  });
});
