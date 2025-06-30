import { RestaurantsResponse } from '@/features/restaurants/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchRestaurantsApi(postcode: string): Promise<RestaurantsResponse> {
  if (!postcode?.trim()) {
    throw new Error('Postcode is required');
  }

  try {
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
    
    // Preserve original error if it's already an Error instance
    if (error instanceof Error) {
      throw error;
    }
    
    // Handle network/parsing errors
    throw new Error(`Failed to fetch restaurants: ${String(error)}`);
  }
}