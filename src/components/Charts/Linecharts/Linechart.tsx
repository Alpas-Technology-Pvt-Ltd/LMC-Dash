'use client';
import { Line } from 'react-chartjs-2';

// Extra Setup
import ChartDateFilter from '@/components/Utility_Components/ChartDateFilter';
import CustomChartLoader from '@/components/Utility_Components/CustomChartLoader';
import SubTitle from '@/components/Utility_Components/SubTitle';
import { getIncidentTrendData } from '@/data/chartData';
import { glassyCSS } from '@/data/temp';
import {
  fetchDataWithAxios,
  getOneDayFurtherDate,
  serializeLineChartData,
} from '@/utils/utilitiesFn';
import type { ChartData, ChartOptions } from 'chart.js';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

function LineChart({
  data,
  options,
  title,
}: {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
  title: string;
}) {
  Chart.register(CategoryScale);

  const [lineChartData, setLineChartData] = useState<ChartData<'line'>>(data);
  const [isLoading, setIsLoading] = useState(false);

  const lineChartHandler = async (dateData: filterInputs) => {
    try {
      setIsLoading(true);
      const from = dateData.fromDate;
      const formattedOneDayFurther = getOneDayFurtherDate(dateData.toDate);
      const startMonth = new Date(from).getMonth();
      const endMonth = new Date(dateData.toDate).getMonth();

      const data = await fetchDataWithAxios({
        endpoint: `/api/v1/disaster/incident`,
      });
      const reqDataFormat = serializeLineChartData(
        data.results,
        startMonth,
        endMonth,
      );
      setLineChartData(
        getIncidentTrendData(reqDataFormat.xAxis, reqDataFormat.yAxis),
      );
    } catch (error) {
      console.log('Line Chart Filter Error : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLineChartData(data);
  }, [data]);

  return (
    <div className={`${glassyCSS} p-5 h-full`}>
      <ChartDateFilter handler={lineChartHandler} isLineChart />
      <SubTitle className="mb-5">{title}</SubTitle>
      <div className="h-[300px]">
        {isLoading ? (
          <CustomChartLoader />
        ) : (
          <Line data={lineChartData} options={options} />
        )}
      </div>
    </div>
  );
}
export default LineChart;
