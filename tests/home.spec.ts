import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads restaurants and allows searching', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    // Wait for postcodes to load
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByText('View Restaurants').click();
    await page.waitForURL('**/restaurants');

    // Wait for restaurants to load - check for restaurant names instead of test ID
    await expect(page.getByText('Standard Indian Takeaway')).toBeVisible({ timeout: 10000 });
    
    await expect(page.getByText('Ostro')).toBeVisible();

    await page.getByPlaceholder('Search by name, location, cuisine…').fill('Ostro');
    await page.waitForTimeout(500);

    await expect(page.getByText('Ostro')).toBeVisible();
    await expect(page.getByText('Standard Indian Takeaway')).not.toBeVisible();
  });

  test('opens and closes mobile filter drawer', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByText('View Restaurants').click();
    await page.waitForURL('**/restaurants');

    // Wait for restaurants to load - check for restaurant names instead of test ID
    await expect(page.getByText('Standard Indian Takeaway')).toBeVisible({ timeout: 10000 });

    await page.setViewportSize({ width: 500, height: 800 });

    const filterBtn = page.getByLabel('Open filters');
    await expect(filterBtn).toBeVisible();
    await filterBtn.click();

    await expect(page.getByText('Filters')).toBeVisible();
    await page.getByLabel('Close filters').click();
    await expect(page.getByText('Filters')).not.toBeVisible();
  });

  test('shows button disabled when no area selected', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    const button = page.getByTestId('view-restaurants-btn');
    await expect(button).toBeDisabled();
  });

  test('shows all available areas in dropdown', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.waitForLoadState('networkidle');
    
    const select = page.locator('select');
    await expect(select).toBeVisible();
    
    // Check for specific postcodes we know exist - use exact text match from mock data
    await expect(page.locator('option', { hasText: 'Cardiff - CF11 8AZ' })).toBeAttached();
    await expect(page.locator('option', { hasText: 'Bristol - BS1 4DJ' })).toBeAttached();
  });

  test('navigates to restaurants page after selecting area', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByText('View Restaurants').click();
    
    await expect(page).toHaveURL(/\/restaurants$/);
    await expect(page.getByText(/Order from \d+ place/)).toBeVisible();
  });

  test('handles search with no results', async ({ page }) => {
    await page.goto('http://localhost:5174/');
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByText('View Restaurants').click();
    await page.waitForURL('**/restaurants');

    // Wait for any restaurants to load - look for the restaurant count first
    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 10000 });
    
    // Then search for something that won't exist
    await page.getByPlaceholder('Search by name, location, cuisine…').fill('NonexistentRestaurant123XYZ');
    await page.waitForTimeout(500);
    
    // Check for the clear filters empty state
    await expect(page.getByText('Clear your filters')).toBeVisible();
  });
});
   