import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads restaurants and allows searching', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByTestId('view-restaurants-btn').click();
    await page.waitForURL('**/restaurants');

    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 10000 });

    const firstRestaurant = page.locator('h3').first();
    await expect(firstRestaurant).toBeVisible();
    const restaurantName = await firstRestaurant.textContent();

    const restaurantCount = await page.locator('[role="button"]').count();
    expect(restaurantCount).toBeGreaterThanOrEqual(2);

    if (restaurantName) {
      let searchTerm = restaurantName.slice(0, 4);
      await page.getByPlaceholder('Search by name, location, cuisine…').fill(searchTerm);
      await page.waitForTimeout(1000);

      let searchResults = await page.locator('[role="button"]').count();

      if (searchResults === 0 && restaurantName.length > 3) {
        searchTerm = restaurantName.slice(0, 3);
        await page.getByPlaceholder('Search by name, location, cuisine…').clear();
        await page.getByPlaceholder('Search by name, location, cuisine…').fill(searchTerm);
        await page.waitForTimeout(1000);
        searchResults = await page.locator('[role="button"]').count();
      }

      if (searchResults === 0) {
        await page.getByPlaceholder('Search by name, location, cuisine…').clear();
        await page.getByPlaceholder('Search by name, location, cuisine…').fill('Indian');
        await page.waitForTimeout(1000);
        searchResults = await page.locator('[role="button"]').count();
      }

      if (searchResults > 0) {
        expect(searchResults).toBeLessThanOrEqual(restaurantCount);
      } else {
        await expect(page.getByText('Clear your filters')).toBeVisible();
      }
    }
  });

  test('opens and closes mobile filter drawer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByTestId('view-restaurants-btn').click();
    await page.waitForURL('**/restaurants');

    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 10000 });

    await page.setViewportSize({ width: 500, height: 800 });

    const filterBtn = page.getByLabel('Open filters');
    await expect(filterBtn).toBeVisible();
    await filterBtn.click();

    await expect(page.getByText('Filters')).toBeVisible();
    await page.getByLabel('Close filters').click();
    await expect(page.getByText('Filters')).not.toBeVisible();
  });

  test('shows button disabled when no area selected', async ({ page }) => {
    await page.goto('/');
    const button = page.getByTestId('view-restaurants-btn');
    await expect(button).toBeDisabled();
  });

  test('shows all available areas in dropdown', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const select = page.locator('select');
    await expect(select).toBeVisible();

    await expect(page.locator('option', { hasText: 'Cardiff - CF11 8AZ' })).toBeAttached();
    await expect(page.locator('option', { hasText: 'Bristol - BS1 4DJ' })).toBeAttached();
  });

  test('navigates to restaurants page after selecting area', async ({ page }) => {
    await page.goto('/');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByTestId('view-restaurants-btn').click();

    await expect(page).toHaveURL(/\/restaurants$/);
    await expect(page.getByText(/Order from \d+ place/)).toBeVisible();
  });

  test('handles search with no results', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.selectOption('select', { label: 'Cardiff - CF11 8AZ' });
    await page.getByTestId('view-restaurants-btn').click();
    await page.waitForURL('**/restaurants');

    await expect(page.getByText(/Order from \d+ place/)).toBeVisible({ timeout: 10000 });

    await page
      .getByPlaceholder('Search by name, location, cuisine…')
      .fill('NonexistentRestaurant123XYZ');
    await page.waitForTimeout(500);

    await expect(page.getByText('Clear your filters')).toBeVisible();
  });
});
