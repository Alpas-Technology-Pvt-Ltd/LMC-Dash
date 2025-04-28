'use client';
import CustomMap from '@/components/Utility_Components/Maps/Map';
import {
  fetchDataWithAxios,
  getOneDayFurtherDate,
  serializeMapData,
} from '@/utils/utilitiesFn';
import { HeatLatLngTuple, LatLng } from 'leaflet';
import { useCallback, useEffect, useState } from 'react';

const Section1_Map = ({
  heatData,
}: {
  heatData: (LatLng | HeatLatLngTuple)[];
}) => {
  const [heatMapDataState, setHeatMapDataState] =
    useState<(LatLng | HeatLatLngTuple)[]>(heatData);
  const [isLoading, setIsLoading] = useState(false);

  const mapFilterDataHandler = useCallback(async (dateData: filterInputs) => {
    try {
      setIsLoading(true);
      const from = dateData.fromDate;
      // Since the backend logic won't send "to" wala day ko data , it will send the 1 day before data of "to" day.
      // const to = new Date(dateData.fromDate);
      const formattedOneDayFurther = getOneDayFurtherDate(dateData.toDate);

      // OTHER FILTERS ARE LEFT TO SET ON BACKEND
      const data = await fetchDataWithAxios({
        endpoint: `/api/v1/disaster/incident/?date_from=${from}&date_to=${formattedOneDayFurther}`,
      });
      const getDataFormat = serializeMapData(data.results); // should return [2,10,3,2]
      setHeatMapDataState(getDataFormat);
    } catch (error) {
      console.log('Section1 Map Chart Filter Error : ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setHeatMapDataState(heatData);
  }, [heatData]);

  return (
    <div className="min-h-[550px]">
      <CustomMap
        handler={mapFilterDataHandler}
        heatData={heatMapDataState}
        filters={true}
        height="85%"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Section1_Map;
