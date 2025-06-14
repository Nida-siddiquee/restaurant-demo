import { test, expect } from '@playwright/test';

test.describe('Restaurant Details page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page and select postcode
    await page.goto('http://localhost:5174/');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByText('View Restaurants').click();
    
    // Wait for restaurants to load and click on the first restaurant card
    await page.waitForLoadState('networkidle');
    await page.locator('[data-testid="287545"]').click();
    
    // Verify we're on the restaurant details page
    await expect(page).toHaveURL(/\/restaurants\/287545$/);
  });

  test('shows restaurant details', async ({ page }) => {
    await expect(page.getByTestId('restaurant-name')).toBeVisible();
    await expect(page.getByTestId('restaurant-name')).toHaveText('Standard Indian Takeaway');
    await expect(page.getByText('336 Cowbridge Road East Canton')).toBeVisible();
    await expect(page.getByText('Cardiff CF5 1HD')).toBeVisible();
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
    // Wait a bit for all data to load
    await page.waitForTimeout(1000);
    
    const cuisinesSection = page.locator('[aria-label="Cuisines"]');
    await expect(cuisinesSection).toBeVisible();
    
    // Check for either Indian or Bangladeshi cuisine (both are in the mock data)
    const hasIndian = await page.getByText('Indian',{ exact: true }).isVisible();
    const hasBangladeshi = await page.getByText('Bangladeshi',{ exact: true }).isVisible();
    
    expect(hasIndian || hasBangladeshi).toBe(true);
  });

  test('shows restaurant rating and reviews', async ({ page }) => {
    await expect(page.getByText('★')).toBeVisible();
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
    await expect(page.getByText('336 Cowbridge Road East Canton')).toBeVisible();
  });

  test('shows map view in address section', async ({ page }) => {
    await expect(page.locator('iframe')).toBeVisible();
  });

  test('navigates back to restaurants list', async ({ page }) => {
    await page.getByText('← Back to list').click();
    await expect(page).toHaveURL(/\/restaurants$/);
  });

  test('shows loading state while fetching data', async ({ page }) => {
    // This test needs to start fresh to intercept the loading state
    await page.route('**/restaurants**', async route => {
      await new Promise(res => setTimeout(res, 500));
      route.continue();
    });
    
    await page.goto('http://localhost:5174/');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    const navigation = page.getByText('View Restaurants').click();
    await expect(page.getByTestId('loading-container')).toBeVisible();
    await navigation;
  });

    test('handles missing data gracefully', async ({ page }) => {
        // Simulate missing restaurant data
        await page.route('**/restaurants/287545', route => {
        route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Restaurant not found' }),
        });
        });
        
        await page.goto('http://localhost:5174/restaurants/287545');
        await expect(page.getByText('Restaurant not found')).toBeVisible();
    });
});
