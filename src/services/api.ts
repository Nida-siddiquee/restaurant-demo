import { RestaurantsResponse } from "@/features/restaurants/types"

export async function fetchRestaurantsApi(postcode: string): Promise<RestaurantsResponse[]> {
  const res = await fetch(`/api/discovery/uk/restaurants/enriched/bypostcode/${encodeURIComponent(postcode)}`)
  if (!res.ok) throw new Error('Network response was not ok')
  const json = await res.json()
console.log('Fetched restaurants:', json)
  return json as RestaurantsResponse[]
}