export const getRestaurantsAPI = async () => {
  const res = await fetch('/api/restaurants');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};