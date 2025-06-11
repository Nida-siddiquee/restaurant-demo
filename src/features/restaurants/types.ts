// src/features/restaurants/types.ts

/** GeoJSON Point */
export interface Point {
  type: "Point"
  coordinates: [number, number]
}

/** Address details for a restaurant */
export interface Address {
  city: string
  firstLine: string
  postalCode: string
  location: Point
}

/** Rating info */
export interface Rating {
  count: number
  starRating: number
  userRating: number | null
}

/** A special deal or offer */
export interface Deal {
  description: string
  offerType: string
}

/** Cuisine category */
export interface Cuisine {
  name: string
  uniqueName: string
}

/** Availability window detail */
export interface AvailabilityDetail {
  isOpen: boolean
  canPreOrder: boolean
  isTemporarilyOffline: boolean
  nextAvailability?: { from: string }
  etaMinutes?: {
    rangeLower?: number
    rangeUpper?: number
    approximate?: number
  }
}

/** Combined availability info */
export interface Availability {
  delivery?: AvailabilityDetail
  collection?: AvailabilityDetail
}

/** Core restaurant model */
export interface Restaurant {
  id: string
  name: string
  uniqueName: string
  address: Address
  rating: Rating
  isNew: boolean
  driveDistanceMeters: number
  openingTimeLocal: string
  deliveryOpeningTimeLocal: string
  deliveryEtaMinutes: {
    rangeLower: number
    rangeUpper: number
  }
  isCollection: boolean
  isDelivery: boolean
  isOpenNowForCollection: boolean
  isOpenNowForDelivery: boolean
  isOpenNowForPreorder: boolean
  isTemporarilyOffline: boolean
  deliveryCost: number
  minimumDeliveryValue: number
  defaultDisplayRank: number
  isTemporaryBoost: boolean
  isPremier: boolean
  logoUrl: string
  isTestRestaurant: boolean
  deals: Deal[]
  tags: unknown[]        // refine if you have a shape for tags
  cuisines: Cuisine[]
  availability: Availability
  description?: string
}

/** Metadata about the search area */
export interface MetaData {
  canonicalName: string
  district: string
  postalCode: string
  area: string
  location: Point
  cuisineDetails: Array<{
    name: string
    uniqueName: string
    count: number
  }>
  resultCount: number
  searchedTerms: string | null
  tagDetails: Array<{
    displayName: string
    key: string
    priority: number
  }>
  deliveryArea: string
}

/** Delivery fee band for a restaurant */
export interface DeliveryFeeBand {
  minimumAmount: number
  fee: number
}

/** Fees structure keyed by restaurant ID */
export interface DeliveryFees {
  restaurants: Record<
    string,
    {
      restaurantId: string
      minimumOrderValue: number
      bands: DeliveryFeeBand[]
    }
  >
}

/** Promoted placement config */
export interface PromotedPlacement {
  filteredSearchPromotedLimit: number
  rankedIds: string[]
  restaurants: Record<
    string,
    {
      restaurantId: string
      defaultPromoted: boolean
    }
  >
}

/** A single filter option */
export interface FilterOption {
  displayName: string
  imageName: string
  group: string
  restaurantIds: string[]
}

/** All filters keyed by filter-id */
export type Filters = Record<string, FilterOption>

/** Layout block content */
export interface LayoutItem {
  type: string
  id: string
  title: string
  contents: Array<{ type: string; id: string; title: string }>
}

/** Whole layout object keyed by layout-id */
export type Layout = Record<string, LayoutItem>

/** Enriched list tracking info */
export interface EnrichedList {
  trackingId: string
}

/** Collection of enriched lists keyed by list-name */
export interface EnrichedLists {
  [key: string]: EnrichedList
}
export interface LayoutFilterItem {
  type: 'filter';
  id: string;     // e.g. "free_delivery"
  title: string;  // e.g. "Free Delivery"
}
export interface LayoutSection {
  type: 'list';
  id: string;            // "search-refine-filters"
  title: string;         // "Filters"
  contents: LayoutFilterItem[];
}
/** Top‐level response */
export interface RestaurantsResponse {
  metaData: MetaData
  restaurants: Restaurant[]
  deliveryFees: DeliveryFees
  promotedPlacement: PromotedPlacement
  filters: Filters
  layout: {
    'search-refine-filters': LayoutSection;
    'search-filter-carousel': LayoutSection;
  }
  enrichedLists: EnrichedLists
}
