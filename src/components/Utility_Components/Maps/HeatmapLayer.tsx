import L, { HeatLatLngTuple, LatLng } from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { useMap } from 'react-leaflet';

const HeatmapLayer = ({ points }: { points: (LatLng | HeatLatLngTuple)[] }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;
    const heatLayer = L.heatLayer(points, {
      radius: 20, // Smaller radius for more concentrated heat
      blur: 20, // Less blur for sharper heat spots
      maxZoom: 13, // Allow heatmap to appear at lower zoom levels ( below 13)
      max: 0.8, // Maximum intensity (can be adjusted based on data)

      gradient: {
        0.1: 'blue',
        0.3: 'cyan',
        0.7: 'yellow',
        1: 'red', // Ending color for high intensity
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

export default HeatmapLayer;
