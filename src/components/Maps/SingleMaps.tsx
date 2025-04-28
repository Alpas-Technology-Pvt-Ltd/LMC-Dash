import { LatLngExpression } from 'leaflet';
import CustomMap from '../Utility_Components/Maps/Map';

const SingleMaps = ({ location }: { location: LatLngExpression }) => {
  return (
    <div className="h-screen">
      <CustomMap
        displayHeatLayer={false}
        displayPolygon={false}
        center={location}
        showMarkers
      />
    </div>
  );
};

export default SingleMaps;
