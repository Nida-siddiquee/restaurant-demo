import { RestaurantsResponse } from '@/features/restaurants/types';
import {
  createApiError,
  createValidationError,
  createNetworkError,
  createTimeoutError,
} from '@/utils/errors';

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
    throw createValidationError('Postcode is required');
  }

  try {
    const apiUrl = `${API_BASE}/discovery/uk/restaurants/enriched/bypostcode/${encodeURIComponent(postcode)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(apiUrl, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw createApiError(
        res.status,
        `Failed to fetch restaurants: ${res.status} ${res.statusText}`,
      );
    }

    const json = await res.json();

    if (!json || !Array.isArray(json.restaurants)) {
      throw createApiError(502, "Invalid API response format (missing 'restaurants' array)");
    }

    return json as RestaurantsResponse;
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw createTimeoutError('Request timed out after 10 seconds');
    }

    if (error instanceof TypeError || (error instanceof Error && error.message.includes('fetch'))) {
      throw createNetworkError(
        'Unable to connect to the server. Please check your internet connection.',
      );
    }

    if (error && typeof error === 'object' && 'type' in error) {
      throw error;
    }

    if (error instanceof Error) {
      throw createApiError(500, error.message);
    }

    throw createApiError(500, 'An unexpected error occurred while fetching restaurants');
  }
}
