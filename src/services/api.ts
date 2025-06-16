import { RestaurantsResponse } from '@/features/restaurants/types';

export async function fetchRestaurantsApi(postcode: string): Promise<RestaurantsResponse> {
  try {
    const API_BASE = process.env.VITE_API_BASE_URL ||'/api'

    const apiUrl = `${API_BASE}/discovery/uk/restaurants/enriched/bypostcode/${encodeURIComponent(postcode)}`;

    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();

    if (!json || !Array.isArray(json.restaurants)) {
      throw new Error("Unexpected API response format (missing 'restaurants' array).");
    }

    return json as RestaurantsResponse;
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}
