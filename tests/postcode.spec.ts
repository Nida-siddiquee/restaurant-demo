import { test, expect } from '@playwright/test';

test.use({
  actionTimeout: 15000,
  navigationTimeout: 15000,
});

test.describe('Postcode select page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    await expect(page.getByRole('heading', { name: 'Select Your Area' })).toBeVisible({
      timeout: 15000,
    });
  });

  test('can select postcode and see restaurants', async ({ page }) => {
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByTestId('view-restaurants-btn').click();
    await expect(page).toHaveURL(/\/restaurants/);
    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 15000 });
    const restaurantCount = await page.locator('[role="button"]').count();
    expect(restaurantCount).toBeGreaterThan(0);
  });

  test('shows loading state when fetching postcodes', async ({ page }) => {
    await page.route('**/postcodes*', async route => {
      await new Promise(res => setTimeout(res, 1000));
      route.continue();
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Loading')).toBeVisible({ timeout: 5000 });
  });

  test('button is disabled when no postcode is selected', async ({ page }) => {
    await expect(page.getByTestId('view-restaurants-btn')).toBeDisabled();
  });

  test('button is enabled when postcode is selected', async ({ page }) => {
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await expect(page.getByTestId('view-restaurants-btn')).not.toBeDisabled();
  });

  test('navigates back to postcode select from restaurants page', async ({ page }) => {
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByTestId('view-restaurants-btn').click();

    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: /Cardiff/i }).click();
    await expect(page.getByText('Select Your Area')).toBeVisible();
  });

  test('shows correct page title and content', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Select Your Area' })).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
    await expect(page.getByTestId('view-restaurants-btn')).toBeVisible();
  });

  test('select has proper accessibility label', async ({ page }) => {
    await expect(page.locator('select[aria-label="Postcode Select"]')).toBeVisible();
  });
});
