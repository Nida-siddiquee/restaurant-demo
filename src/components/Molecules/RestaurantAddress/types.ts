export interface RestaurantAddressProps {
  address: {
    firstLine: string;
    city: string;
    postalCode: string;
    location: {
      coordinates: [number, number];
    };
  };
}