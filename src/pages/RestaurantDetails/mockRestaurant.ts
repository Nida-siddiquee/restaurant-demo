export const mockRestaurant = {
  id: '200586',
  name: 'Ostro',
  logoUrl: 'https://example.com/logo.gif',
  rating: { starRating: 4.5, count: 134 },
  cuisines: [
    { name: 'Chicken', uniqueName: 'chicken' },
    { name: 'Peri Peri', uniqueName: 'peri-peri' },
  ],
  deliveryEtaMinutes: { rangeLower: 35, rangeUpper: 50 },
  deliveryCost: 2.99,
  address: {
    city: 'Cardiff',
    firstLine: '29 - 31 City Road',
    postalCode: 'CF24 3BJ',
    location: { coordinates: [-3.166535, 51.486684] },
  },
  deals: [
    { description: '', offerType: 'StampCard' },
    { description: '£8 off when you spend £25', offerType: 'Notification' },
  ],
};
