export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { postcode } = req.query;

  if (!postcode || typeof postcode !== 'string') {
    res.status(400).json({ error: 'Postcode parameter is required' });
    return;
  }

  try {
    const apiUrl = `https://uk.api.just-eat.io/api/discovery/uk/restaurants/enriched/bypostcode/${encodeURIComponent(postcode)}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Restaurant-Demo/1.0.0',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch restaurants',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
