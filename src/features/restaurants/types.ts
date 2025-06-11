export interface Point {
  type: 'Point';
  coordinates: [number, number];
}

export interface Address {
  city: string;
  firstLine: string;
  postalCode: string;
  location: Point;
}

export interface Rating {
  count: number;
  starRating: number;
  userRating: number | null;
}

export interface Deal {
  description: string;
  offerType: string;
}

export interface Cuisine {
  name: string;
  uniqueName: string;
}

export interface AvailabilityDetail {
  isOpen: boolean;
  canPreOrder: boolean;
  isTemporarilyOffline: boolean;
  nextAvailability?: { from: string };
  etaMinutes?: {
    rangeLower?: number;
    rangeUpper?: number;
    approximate?: number;
  };
}

export interface Availability {
  delivery?: AvailabilityDetail;
  collection?: AvailabilityDetail;
}

export interface Restaurant {
  id: string;
  name: string;
  uniqueName: string;
  address: Address;
  rating: Rating;
  isNew: boolean;
  driveDistanceMeters: number;
  openingTimeLocal: string;
  deliveryOpeningTimeLocal: string;
  deliveryEtaMinutes: {
    rangeLower: number;
    rangeUpper: number;
  };
  isCollection: boolean;
  isDelivery: boolean;
  isOpenNowForCollection: boolean;
  isOpenNowForDelivery: boolean;
  isOpenNowForPreorder: boolean;
  isTemporarilyOffline: boolean;
  deliveryCost: number;
  minimumDeliveryValue: number;
  defaultDisplayRank: number;
  isTemporaryBoost: boolean;
  isPremier: boolean;
  logoUrl: string;
  isTestRestaurant: boolean;
  deals: Deal[];
  tags: unknown[];
  cuisines: Cuisine[];
  availability: Availability;
  description?: string;
}

export interface MetaData {
  canonicalName: string;
  district: string;
  postalCode: string;
  area: string;
  location: Point;
  cuisineDetails: Array<{
    name: string;
    uniqueName: string;
    count: number;
  }>;
  resultCount: number;
  searchedTerms: string | null;
  tagDetails: Array<{
    displayName: string;
    key: string;
    priority: number;
  }>;
  deliveryArea: string;
}

export interface DeliveryFeeBand {
  minimumAmount: number;
  fee: number;
}

export interface DeliveryFees {
  restaurants: Record<
    string,
    {
      restaurantId: string;
      minimumOrderValue: number;
      bands: DeliveryFeeBand[];
    }
  >;
}

export interface PromotedPlacement {
  filteredSearchPromotedLimit: number;
  rankedIds: string[];
  restaurants: Record<
    string,
    {
      restaurantId: string;
      defaultPromoted: boolean;
    }
  >;
}

export interface FilterOption {
  displayName: string;
  imageName: string;
  group: string;
  restaurantIds: string[];
}

export type Filters = Record<string, FilterOption>;

export interface LayoutItem {
  type: string;
  id: string;
  title: string;
  contents: Array<{ type: string; id: string; title: string }>;
}

export type Layout = Record<string, LayoutItem>;

export interface EnrichedList {
  trackingId: string;
}

export interface EnrichedLists {
  [key: string]: EnrichedList;
}
export interface LayoutFilterItem {
  type: 'filter';
  id: string;
  title: string;
}
export interface LayoutSection {
  type: 'list';
  id: string;
  title: string;
  contents: LayoutFilterItem[];
}
export interface RestaurantsResponse {
  metaData: MetaData;
  restaurants: Restaurant[];
  deliveryFees: DeliveryFees;
  promotedPlacement: PromotedPlacement;
  filters: Filters;
  layout: {
    'search-refine-filters': LayoutSection;
    'search-filter-carousel': LayoutSection;
  };
  enrichedLists: EnrichedLists;
}
