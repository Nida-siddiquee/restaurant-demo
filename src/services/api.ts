import { RestaurantsResponse } from '@/features/restaurants/types';

function getEnvVar(key: string): string | undefined {

  let importMeta: { env?: Record<string, string> } | undefined;
  try {
    importMeta = (new Function('return import.meta')  )();
    if (importMeta && importMeta.env) {
      return importMeta.env[key];
    }
  } catch {
    console.warn('Failed to access import.meta.env, falling back to globalThis');
  }
  
  if (typeof window === 'undefined' && typeof globalThis.process !== 'undefined' && globalThis.process.env) {
    return globalThis.process.env[key];
  }
  return undefined;
}

export async function fetchRestaurantsApi(postcode: string): Promise<RestaurantsResponse> {
  try {
    const API_BASE = getEnvVar('VITE_API_BASE_URL') || '/api';

    const apiUrl = `${API_BASE}/discovery/uk/restaurants/enriched/bypostcode/${encodeURIComponent(postcode)}`;

    const res = await fetch(apiUrl, { mode: 'no-cors' });
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
