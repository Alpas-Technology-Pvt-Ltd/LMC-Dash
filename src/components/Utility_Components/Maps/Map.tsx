'use client';
import { heatmapData } from '@/data/mapData';
import { glassyCSS } from '@/data/temp';
import L, { HeatLatLngTuple, LatLng, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Pane, TileLayer } from 'react-leaflet';
import '../../../.././node_modules/leaflet/dist/leaflet.css';
import { lalitpurWardsData, wardObjType } from '../../../LMC_Metro_Map';
import ChartDateFilter from '../ChartDateFilter';
import CustomChartLoader from '../CustomChartLoader';
import HeatmapLayer from './HeatmapLayer';
import RenderWardPolygon from './RenderWardPolygon';

//---------------------------------------------DATA && TYPES----------------------------------------------------------------------------//

const defaultCenter: LatLngExpression = [27.6588, 85.3247];

//------------------------------------------------COMPONENT-------------------------------------------------------------------------------//

const CustomMap = ({
  filters = false,
  height = '100%',
  displayHeatLayer = true,
  displayPolygon = true,
  showMarkers = false,
  center = defaultCenter,
  heatData = heatmapData,
  handler,
  isLoading,
}: {
  filters?: boolean;
  height?: string;
  displayHeatLayer?: boolean;
  displayPolygon?: boolean;
  showMarkers?: boolean;
  center?: LatLngExpression;
  heatData?: (LatLng | HeatLatLngTuple)[];
  handler?: (dateData: filterInputs) => void;
  isLoading?: boolean;
}) => {
  const customIcon = L.divIcon({
    className: 'leaflet-text-icon',
    html: `<div style="background-color: 	rgba(160,32,240,0.4); height:50px; width:50px; display:flex; justify-content:center; align-items:center; border-radius: 100%; color: black; font-weight:700; position:relative; z-index:999; border-radius: 5px; font-size: 12px;">🚩</div>`,
    iconSize: [60, 40], // Set size of the div
  });

  return (
    <div className={`p-3 h-full min-h-[700px] ${glassyCSS}`}>
      {filters && <ChartDateFilter typeFilter handler={handler} statusFilter />}

      {isLoading ? (
        <CustomChartLoader />
      ) : (
        <MapContainer style={{ height: height }} center={center} zoom={15}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
          {/* Layer 1 : Polygon */}
          {displayPolygon && (
            <Pane name="heatmap" style={{ zIndex: 200 }}>
              {lalitpurWardsData.map((ward: wardObjType, index: number) => (
                <RenderWardPolygon ward={ward} index={index} key={index} />
              ))}
            </Pane>
          )}

          {/* Layer 2 : Heatmap */}
          {displayHeatLayer && (
            <Pane name="heatmaps" style={{ zIndex: 500 }}>
              <HeatmapLayer points={heatData} />
            </Pane>
          )}

          {showMarkers && (
            <Marker position={center} icon={customIcon}>
              {/* <Popup>        A pretty CSS3 popup. <br /> Easily customizable.
            </Popup> */}
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default CustomMap;
