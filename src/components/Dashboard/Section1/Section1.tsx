'use client';
import BarChart from '@/components/Charts/Barcharts/Barcharts';
import LineChart from '@/components/Charts/Linecharts/Linechart';
import DoughnutChart from '@/components/Charts/PieCharts/DoughnutChart';
import { Section1Wrapper } from '@/components/Wrappers/Dashboard_Wrappers';
import {
  doughtnutOptions,
  getDoughnutData,
  getIncidentTrendData,
  getMostRegisteredIncidentData,
  incidentTrendDataOptions,
  mostRegisteredIncidentDataOptions,
} from '@/data/chartData';
// import { useTranslations } from 'next-intl';
import { useGlobalContext } from '@/context/context';
import { heatmapData } from '@/data/mapData';
import api from '@/lib/axios';
import {
  getDate,
  giveStatusCodeMessage,
  serializeBarChartData,
  serializeDoughtnutData,
  serializeLineChartData,
  serializeMapData,
} from '@/utils/utilitiesFn';
import { ChartData } from 'chart.js';
import { HeatLatLngTuple, LatLng } from 'leaflet';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Section1_Map from './Section1_Map';

const Section1 = () => {
  const [doughNutData, setDoughNutData] =
    useState<ChartData<'doughnut'>>(getDoughnutData());
  const [barData, setBarData] = useState<ChartData<'bar'>>(
    getMostRegisteredIncidentData(),
  );
  const [lineData, setLineData] = useState<ChartData<'line'>>(
    getIncidentTrendData(),
  );
  const [mapData, setMapData] =
    useState<(LatLng | HeatLatLngTuple)[]>(heatmapData);

  const { setTotalIncidentCount } = useGlobalContext();
  const t = useTranslations('Dashboard');

  //---------------------------------------------DATE Varibles START---------------------------------------------//
  const {
    formattedTomorrow,
    formattedOneWeekAgo,
    formattedTwoMonthsAgo,
    twoMonthsAgo,
    today,
  } = getDate();

  //---------------------------------------------HANDLERS---------------------------------------------//
  const fetchBarChartData = async () => {
    try {
      console.log('Before fetching');
      const [barData, statusesResponse, incidentsResponse, mapResponse] =
        await Promise.all([
          api.get(`/api/v1/disaster/incident/top-services/`),
          api.get(`/api/v1/disaster/incident/statuses/`),
          api.get(
            `/api/v1/disaster/incident/?date_from=${formattedTwoMonthsAgo}&date_to=${formattedTomorrow}`,
          ),
          api.get(
            `/api/v1/disaster/incident/?date_from=${formattedOneWeekAgo}&date_to=${formattedTomorrow}`,
          ),
        ]);

      setTotalIncidentCount(incidentsResponse.data.count);

      console.log(incidentsResponse, 'incident response');

      // BarChart Data Fetching //
      const barReqDataFormat = serializeBarChartData(barData.data);
      setBarData(
        getMostRegisteredIncidentData(
          barReqDataFormat.xAxis,
          barReqDataFormat.yAxis,
        ),
      );

      // DoughnutChart Data Fetching //
      const getDataFormat = serializeDoughtnutData(statusesResponse.data);
      setDoughNutData(getDoughnutData(getDataFormat));

      // LineChart Data Fetching //
      const lineReqDataFormat = serializeLineChartData(
        incidentsResponse?.data?.results,
        twoMonthsAgo.getMonth(), // 7
        today.getMonth(), // 1
      );
      setLineData(
        getIncidentTrendData(lineReqDataFormat.xAxis, lineReqDataFormat.yAxis),
      );

      // Map Data Fetching //
      const getMapDataFormat = serializeMapData(mapResponse?.data?.results);
      setMapData(getMapDataFormat);
    } catch (error: any) {
      console.log('Charts Data Fetching Error : ', error.response.data.detail);
      giveStatusCodeMessage({ status: error.status });
    }
  };

  //---------------------------------------------USEEFFECTS---------------------------------------------//

  useEffect(() => {
    fetchBarChartData();
  }, []);

  return (
    <Section1Wrapper>
      <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr] gap-4  justify-between flex-wrap">
        <Section1_Map heatData={mapData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] my-4 gap-4 flex-wrap ">
        <DoughnutChart
          data={doughNutData}
          options={doughtnutOptions}
          title={t('MidPieChartTitle')}
        />

        <BarChart
          data={barData}
          options={mostRegisteredIncidentDataOptions}
          title={t('MidBarChartTitle')}
        />
      </div>
      <div className="h-[500px] w-1/2">
        <LineChart
          data={lineData}
          options={incidentTrendDataOptions}
          title={t('BottomLineChartTitle')}
        />
      </div>
    </Section1Wrapper>
  );
};

export default Section1;
