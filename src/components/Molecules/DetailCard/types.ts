export interface RestaurantCardProps {
  heroUrl?: string;
  logoUrl?: string;
  name: string;
  highlight?: string;
  rating: number;
  reviewCount: string;
  deliveryTime: string;
  deliveryFee: string;
  offer?: string;
  testId?: string;
  badge?: 'Sponsored' | 'StampCard' | null;
  onClick?: () => void;
}
