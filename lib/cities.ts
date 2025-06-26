export interface City {
  name: string;
  state: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export const majorIndianCities: City[] = [
  // Metro Cities
  { name: "Mumbai", state: "Maharashtra", coordinates: [72.8777, 19.0760] },
  { name: "Delhi", state: "Delhi", coordinates: [77.2090, 28.6139] },
  { name: "Bangalore", state: "Karnataka", coordinates: [77.5946, 12.9716] },
  { name: "Hyderabad", state: "Telangana", coordinates: [78.4867, 17.3850] },
  { name: "Chennai", state: "Tamil Nadu", coordinates: [80.2707, 13.0827] },
  { name: "Kolkata", state: "West Bengal", coordinates: [88.3639, 22.5726] },
  
  // Major Cities - West
  { name: "Pune", state: "Maharashtra", coordinates: [73.8567, 18.5204] },
  { name: "Ahmedabad", state: "Gujarat", coordinates: [72.5714, 23.0225] },
  { name: "Surat", state: "Gujarat", coordinates: [72.8311, 21.1702] },
  { name: "Nagpur", state: "Maharashtra", coordinates: [79.0882, 21.1458] },
  
  // Major Cities - North
  { name: "Lucknow", state: "Uttar Pradesh", coordinates: [80.9462, 26.8467] },
  { name: "Jaipur", state: "Rajasthan", coordinates: [75.7873, 26.9124] },
  { name: "Chandigarh", state: "Punjab", coordinates: [76.7794, 30.7333] },
  { name: "Bhopal", state: "Madhya Pradesh", coordinates: [77.4126, 23.2599] },
  
  // Major Cities - South
  { name: "Kochi", state: "Kerala", coordinates: [76.2673, 9.9312] },
  { name: "Visakhapatnam", state: "Andhra Pradesh", coordinates: [83.2185, 17.6868] },
  { name: "Coimbatore", state: "Tamil Nadu", coordinates: [76.9558, 11.0168] },
  { name: "Thiruvananthapuram", state: "Kerala", coordinates: [76.9366, 8.5241] },
  
  // Major Cities - East
  { name: "Patna", state: "Bihar", coordinates: [85.1376, 25.5941] },
  { name: "Bhubaneswar", state: "Odisha", coordinates: [85.8245, 20.2961] },
  { name: "Guwahati", state: "Assam", coordinates: [91.7362, 26.1445] },
  { name: "Ranchi", state: "Jharkhand", coordinates: [85.3096, 23.3441] }
];

export function findNearestCity(coordinates: [number, number]): City {
  let nearestCity = majorIndianCities[0];
  let shortestDistance = calculateDistance(coordinates, majorIndianCities[0].coordinates);

  for (const city of majorIndianCities) {
    const distance = calculateDistance(coordinates, city.coordinates);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestCity = city;
    }
  }

  return nearestCity;
}

// Calculate distance between two points using the Haversine formula
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
} 