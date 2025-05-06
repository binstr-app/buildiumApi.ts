const USE_MOCK = true;

const MOCK_DATA = {
  properties: [
    { id: 1, name: 'Sunset Villas', address: '123 Beach Ave' },
    { id: 2, name: 'Maple Heights', address: '456 Oak St' },
  ],
};

const BASE_URL = 'https://api.buildium.com/v1';
const API_KEY = 'YOUR_API_KEY'; // real key when ready

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,
};

async function fetchBuildium(endpoint: string, options: RequestInit = {}) {
  if (USE_MOCK) {
    console.log(`[MOCK] GET ${endpoint}`);
    await new Promise((res) => setTimeout(res, 500));
    if (endpoint.includes('properties')) return { data: MOCK_DATA.properties };
    return { data: [] };
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`Buildium API Error: ${res.status}`);
  }

  return res.json();
}

export const buildiumApi = {
  getProperties: async () => {
    return await fetchBuildium('/properties');
  },
};
