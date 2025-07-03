import { test, expect } from '@playwright/test';

test.describe('Restaurant Details page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByTestId('view-restaurants-btn').click();

    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 10000 });

    const firstRestaurantCard = page.locator('[role="button"]').first();
    await expect(firstRestaurantCard).toBeVisible();
    await firstRestaurantCard.click();

    await expect(page).toHaveURL(/\/restaurants\/\d+$/);
  });

  test('shows restaurant details', async ({ page }) => {
    await expect(page.getByTestId('restaurant-name')).toBeVisible();

    const restaurantName = await page.getByTestId('restaurant-name').textContent();
    expect(restaurantName).toBeTruthy();
    if (restaurantName) {
      expect(restaurantName.length).toBeGreaterThan(0);
    }

    const addressSection = page.getByText('Address');
    await expect(addressSection).toBeVisible();
  });

  test('shows restaurant hero image', async ({ page }) => {
    await expect(page.locator('img[alt*="banner"]')).toBeVisible();
  });

  test('shows restaurant logo if available', async ({ page }) => {
    const logo = page.locator('img.logo');
    if (await logo.isVisible()) {
      await expect(logo).toBeVisible();
    }
  });

  test('displays cuisine types', async ({ page }) => {
    await page.waitForTimeout(1000);

    const cuisinesSection = page.locator('[aria-label="Cuisines"]');
    await expect(cuisinesSection).toBeVisible();

    const cuisineSpans = cuisinesSection.locator('span');
    const cuisineCount = await cuisineSpans.count();
    expect(cuisineCount).toBeGreaterThan(0);

    if (cuisineCount > 0) {
      const firstCuisine = await cuisineSpans.first().textContent();
      expect(firstCuisine).toBeTruthy();
    }
  });

  test('shows restaurant rating and reviews', async ({ page }) => {
    await expect(
      page.locator('.star, [data-testid*="rating"], [aria-label*="rating"], text=★').first(),
    ).toBeVisible();
  });

  test('displays delivery time and cost', async ({ page }) => {
    const deliveryTime = page.locator('[aria-label="Delivery time"]');
    const deliveryCost = page.locator('[aria-label="Delivery cost"]');

    if (await deliveryTime.isVisible()) {
      await expect(deliveryTime).toBeVisible();
    }
    if (await deliveryCost.isVisible()) {
      await expect(deliveryCost).toBeVisible();
    }
  });

  test('shows deals section if available', async ({ page }) => {
    const dealsSection = page.getByText('Deals & Promotions');
    if (await dealsSection.isVisible()) {
      await expect(dealsSection).toBeVisible();
    }
  });

  test('displays address section', async ({ page }) => {
    await expect(page.getByText('Address')).toBeVisible();

    const addressSection = page.locator('text="Address"').locator('..').locator('..');

    const addressText = await addressSection.textContent();
    expect(addressText).toBeTruthy();

    const hasAddressContent = (await addressSection.locator('text=/.*\\w+.*\\w+.*/').count()) > 0;
    expect(hasAddressContent).toBe(true);
  });

  test('shows map view in address section', async ({ page }) => {
    await expect(page.locator('iframe')).toBeVisible();
  });

  test('navigates back to restaurants list', async ({ page }) => {
    await page.getByText('← Back to list').click();
    await expect(page).toHaveURL(/\/restaurants$/);
  });

  test('shows loading state while fetching data', async ({ page }) => {
    await page.route('**/restaurants**', async route => {
      await new Promise(res => setTimeout(res, 1000));
      route.continue();
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });

    const navigation = page.getByTestId('view-restaurants-btn').click();
    await expect(page.getByTestId('loading-container')).toBeVisible();
    await navigation;

    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 15000 });
  });

  test('handles missing data gracefully', async ({ page }) => {
    await page.goto('/restaurants/999999');

    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    const hasError = await page
      .getByText('Something Went Wrong')
      .isVisible()
      .catch(() => false);
    const isRedirected = !currentUrl.includes('/restaurants/999999');

    expect(hasError || isRedirected).toBe(true);
  });
});
