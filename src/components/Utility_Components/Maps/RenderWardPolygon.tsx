import { wardObjType } from '@/LMC_Metro_Map';
import L, { LatLngExpression } from 'leaflet';
import { Marker, Polygon } from 'react-leaflet';

const RenderWardPolygon = ({
  ward,
  index,
  count = 0,
}: {
  ward: wardObjType;
  index: number;
  count?: number;
}) => {
  // Calculate the center of the polygon
  const center = ward.data.reduce(
    (
      acc: { lat: number; lng: number },
      [lat, lng]: [lat: number, lng: number],
    ) => {
      acc.lat += lat;
      acc.lng += lng;
      return acc;
    },
    { lat: 0, lng: 0 },
  );
  const centerLatLng: LatLngExpression = [
    center.lat / ward.data.length,
    center.lng / ward.data.length,
  ];

  // Create a custom DivIcon with HTML text
  const customIcon = L.divIcon({
    className: 'leaflet-text-icon',
    html: `<div style="background-color: rgba(255, 255, 0, 1); padding: 5px; color: black; font-weight:700; border-radius: 5px; font-size: 10px;">Ward ${ward.wardNo}
    <br/>
  ${`Count:${count}`}</div>`,
    iconSize: [60, 40], // Set size of the div
  });

  return (
    <Polygon
      key={index}
      positions={ward.data}
      color="red"
      fillColor="rgba(255, 0, 0, 0.5)"
      fillOpacity={0.4}
    >
      {/* Displaying text with custom icon over the polygon */}
      <Marker position={centerLatLng} icon={customIcon} />
    </Polygon>
  );
};

export default RenderWardPolygon;
