// Routing utilities for eco-friendly delivery routes
export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteOptions {
  profile: 'driving-car' | 'cycling-regular' | 'foot-walking';
  preference: 'fastest' | 'shortest' | 'recommended';
  avoidFeatures?: string[];
  units: 'km' | 'mi';
}

export interface RouteResult {
  type: 'eco' | 'fast' | 'cheap';
  name: string;
  duration: number; // seconds
  distance: number; // meters
  carbonFootprint: number; // kg CO2
  cost: number; // rupees
  coordinates: [number, number][];
  color: string;
  instructions?: string[];
}

// OpenRouteService API wrapper
export const calculateRoute = async (
  start: RoutePoint,
  end: RoutePoint,
  options: RouteOptions = {
    profile: 'driving-car',
    preference: 'fastest',
    units: 'km'
  }
): Promise<RouteResult | null> => {
  try {
    const ORS_API_KEY = '5b3ce3597851110001cf6248YOUR_ORS_KEY'; // Replace with your ORS key
    
    const requestBody = {
      coordinates: [[start.lng, start.lat], [end.lng, end.lat]],
      preference: options.preference,
      units: options.units,
      geometry: true,
      instructions: true,
      elevation: false
    };

    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${options.profile}/geojson`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ORS_API_KEY
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      throw new Error(`ORS API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const route = data.features[0];
      const properties = route.properties;
      const coordinates = route.geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng] as [number, number]);
      
      // Calculate carbon footprint based on distance and route type
      const distanceKm = properties.summary.distance / 1000;
      let carbonFactor = 0.12; // kg CO2 per km (default)
      
      if (options.preference === 'recommended') carbonFactor = 0.08; // eco route
      if (options.preference === 'fastest') carbonFactor = 0.15; // fast route
      
      const carbonFootprint = distanceKm * carbonFactor;
      
      // Calculate cost (mock pricing)
      const baseCost = 50;
      const costPerKm = options.preference === 'fastest' ? 8 : options.preference === 'recommended' ? 5 : 6;
      const cost = baseCost + (distanceKm * costPerKm);
      
      return {
        type: options.preference === 'recommended' ? 'eco' : options.preference === 'fastest' ? 'fast' : 'cheap',
        name: options.preference === 'recommended' ? 'Green Route' : options.preference === 'fastest' ? 'Fastest Route' : 'Budget Route',
        duration: properties.summary.duration,
        distance: properties.summary.distance,
        carbonFootprint,
        cost: Math.round(cost),
        coordinates,
        color: options.preference === 'recommended' ? '#10B981' : options.preference === 'fastest' ? '#3B82F6' : '#8B5CF6',
        instructions: properties.segments?.[0]?.steps?.map((step: any) => step.instruction) || []
      };
    }
    
    return null;
  } catch (error) {
    console.error('Route calculation error:', error);
    return null;
  }
};

// Mock route generation for demo purposes (when ORS is not available)
export const generateMockRoutes = (start: RoutePoint, end: RoutePoint): RouteResult[] => {
  const baseDistance = calculateDistance(start, end);
  const baseDuration = baseDistance * 60; // rough estimate: 1km per minute
  
  return [
    {
      type: 'eco',
      name: 'Green Route',
      duration: baseDuration * 1.2, // 20% longer for eco route
      distance: baseDistance * 1000 * 1.1, // 10% longer distance
      carbonFootprint: baseDistance * 0.08, // lower carbon per km
      cost: Math.round(50 + baseDistance * 5),
      color: '#10B981',
      coordinates: generateMockCoordinates(start, end, 'eco')
    },
    {
      type: 'fast',
      name: 'Fastest Route',
      duration: baseDuration * 0.85, // 15% faster
      distance: baseDistance * 1000,
      carbonFootprint: baseDistance * 0.15, // higher carbon per km
      cost: Math.round(50 + baseDistance * 8),
      color: '#3B82F6',
      coordinates: generateMockCoordinates(start, end, 'fast')
    },
    {
      type: 'cheap',
      name: 'Budget Route',
      duration: baseDuration * 1.4, // 40% longer
      distance: baseDistance * 1000 * 0.95, // slightly shorter
      carbonFootprint: baseDistance * 0.12, // medium carbon per km
      cost: Math.round(50 + baseDistance * 4),
      color: '#8B5CF6',
      coordinates: generateMockCoordinates(start, end, 'cheap')
    }
  ];
};

// Helper functions
const calculateDistance = (start: RoutePoint, end: RoutePoint): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (end.lat - start.lat) * Math.PI / 180;
  const dLng = (end.lng - start.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const generateMockCoordinates = (start: RoutePoint, end: RoutePoint, type: string): [number, number][] => {
  const points: [number, number][] = [[start.lat, start.lng]];
  
  // Add some intermediate points based on route type
  const latDiff = end.lat - start.lat;
  const lngDiff = end.lng - start.lng;
  
  if (type === 'eco') {
    // More winding route for eco-friendly path
    points.push([start.lat + latDiff * 0.3, start.lng + lngDiff * 0.2]);
    points.push([start.lat + latDiff * 0.6, start.lng + lngDiff * 0.7]);
    points.push([start.lat + latDiff * 0.8, start.lng + lngDiff * 0.9]);
  } else if (type === 'fast') {
    // More direct route
    points.push([start.lat + latDiff * 0.4, start.lng + lngDiff * 0.4]);
    points.push([start.lat + latDiff * 0.7, start.lng + lngDiff * 0.7]);
  } else {
    // Budget route with some detours
    points.push([start.lat + latDiff * 0.2, start.lng + lngDiff * 0.4]);
    points.push([start.lat + latDiff * 0.5, start.lng + lngDiff * 0.5]);
    points.push([start.lat + latDiff * 0.8, start.lng + lngDiff * 0.6]);
  }
  
  points.push([end.lat, end.lng]);
  return points;
};