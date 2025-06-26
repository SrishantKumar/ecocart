"use client";

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MAPTILER_API_KEY } from '@/lib/maptiler';

interface RouteMapProps {
  pickupCoordinates: [number, number];
  deliveryCoordinates: [number, number];
  selectedRoute?: 'eco' | 'fast' | 'cheap';
}

const RouteMap: React.FC<RouteMapProps> = ({
  pickupCoordinates,
  deliveryCoordinates,
  selectedRoute
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const mapIsReady = useRef<boolean>(false);

  const routeColors = {
    eco: '#10B981', // Green
    fast: '#3B82F6', // Blue
    cheap: '#F59E0B' // Orange
  };

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      // Initialize map
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`,
        center: [(pickupCoordinates[0] + deliveryCoordinates[0]) / 2, 
                (pickupCoordinates[1] + deliveryCoordinates[1]) / 2],
        zoom: 5
      });

      // Add markers for pickup and delivery locations
      new maplibregl.Marker({ color: '#10B981' })
        .setLngLat(pickupCoordinates)
        .addTo(map.current);

      new maplibregl.Marker({ color: '#EF4444' })
        .setLngLat(deliveryCoordinates)
        .addTo(map.current);

      map.current.on('load', () => {
        mapIsReady.current = true;
        drawRoutes();
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [pickupCoordinates, deliveryCoordinates]);

  const drawRoutes = () => {
    if (!map.current || !mapIsReady.current) return;

    // Remove existing routes
    ['eco-route', 'fast-route', 'cheap-route'].forEach(id => {
      if (map.current?.getSource(id)) {
        map.current.removeLayer(id);
        map.current.removeSource(id);
      }
    });

    // Calculate control points for curved lines
    const createCurvedLine = (offset: number) => {
      const start = pickupCoordinates;
      const end = deliveryCoordinates;
      const midPoint = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2
      ];

      // Calculate perpendicular offset
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const norm = Math.sqrt(dx * dx + dy * dy);
      const offsetX = -dy / norm * offset;
      const offsetY = dx / norm * offset;

      // Create control point
      const controlPoint = [
        midPoint[0] + offsetX,
        midPoint[1] + offsetY
      ];

      // Generate curve points
      const points = [];
      for (let t = 0; t <= 1; t += 0.01) {
        const x = Math.pow(1 - t, 2) * start[0] + 
                 2 * (1 - t) * t * controlPoint[0] + 
                 Math.pow(t, 2) * end[0];
        const y = Math.pow(1 - t, 2) * start[1] + 
                 2 * (1 - t) * t * controlPoint[1] + 
                 Math.pow(t, 2) * end[1];
        points.push([x, y]);
      }
      return points;
    };

    // Add routes with different curves and colors
    const routes = [
      { id: 'eco-route', offset: 0.5, color: routeColors.eco },
      { id: 'fast-route', offset: 0, color: routeColors.fast },
      { id: 'cheap-route', offset: -0.5, color: routeColors.cheap }
    ];

    routes.forEach(route => {
      const points = createCurvedLine(route.offset);
      
      map.current?.addSource(route.id, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: points
          }
        }
      });

      map.current?.addLayer({
        id: route.id,
        type: 'line',
        source: route.id,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          'visibility': selectedRoute ? (route.id.startsWith(selectedRoute) ? 'visible' : 'none') : 'visible'
        },
        paint: {
          'line-color': route.color,
          'line-width': selectedRoute && route.id.startsWith(selectedRoute) ? 4 : 2,
          'line-opacity': selectedRoute && route.id.startsWith(selectedRoute) ? 1 : 0.6
        }
      });
    });

    // Fit bounds to show all markers and routes
    const bounds = new maplibregl.LngLatBounds()
      .extend(pickupCoordinates)
      .extend(deliveryCoordinates);
    
    map.current.fitBounds(bounds, {
      padding: 100,
      duration: 1000
    });
  };

  useEffect(() => {
    if (map.current && mapIsReady.current) {
      drawRoutes();
    }
  }, [selectedRoute]);

  return (
    <div ref={mapContainer} className="w-full h-[400px] rounded-lg overflow-hidden" />
  );
};

export default RouteMap;