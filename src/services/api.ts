import { RestaurantsResponse } from '@/features/restaurants/types';

function getApiBase(): string {
  if (typeof window !== 'undefined' && 'import' in window) {
    try {
      const importMeta = new Function('return import.meta')() as { env?: Record<string, string> };
      return importMeta?.env?.VITE_API_BASE_URL || '/api';
    } catch {
      return '/api';
    }
  }
  if (typeof globalThis !== 'undefined' && globalThis.process?.env) {
    return globalThis.process.env.VITE_API_BASE_URL || '/api';
  }
  return '/api';
}

const API_BASE = getApiBase();

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

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(`Failed to fetch restaurants: ${String(error)}`);
  }
}
