// MapTiler configuration and utilities
export const MAPTILER_API_KEY = 'sSjTjww6fEDPfIiWCRCp';

export const MAPTILER_STYLE_URL = `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`;

export const MAPTILER_TILE_URL = `https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`;

export const getMapTilerConfig = () => ({
  apiKey: MAPTILER_API_KEY,
  styleUrl: MAPTILER_STYLE_URL,
  tileUrl: MAPTILER_TILE_URL,
});

export const MAPTILER_STYLES = {
  streets: 'streets-v2',
  satellite: 'satellite',
  hybrid: 'hybrid',
  topo: 'topo-v2',
  winter: 'winter-v2',
  outdoor: 'outdoor-v2',
} as const;

export const getMapTilerUrl = (style: keyof typeof MAPTILER_STYLES = 'streets') => {
  return `https://api.maptiler.com/maps/${MAPTILER_STYLES[style]}/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`;
};

export const getMapTilerAttribution = () => {
  return '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
};

// Geocoding utility using MapTiler
export const geocodeAddress = async (address: string) => {
  try {
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${MAPTILER_API_KEY}`
    );
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng, address: data.features[0].place_name };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};