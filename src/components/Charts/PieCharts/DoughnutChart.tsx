'use client';
import ChartDateFilter from '@/components/Utility_Components/ChartDateFilter';
import CustomChartLoader from '@/components/Utility_Components/CustomChartLoader';
import SubTitle from '@/components/Utility_Components/SubTitle';
import { getDoughnutData } from '@/data/chartData';
import { glassyCSS } from '@/data/temp';
import {
  fetchDataWithAxios,
  getOneDayFurtherDate,
  serializeDoughtnutData,
} from '@/utils/utilitiesFn';
import { CategoryScale, Chart, ChartOptions, type ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({
  data,
  options,
  title,
}: {
  data: ChartData<'doughnut'>;
  options: ChartOptions<'doughnut'>;
  title: string;
}) => {
  Chart.register(CategoryScale);
  const [doughnutData, setDoughnutData] = useState<ChartData<'doughnut'>>(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const DoughnutChartHandler = async (dateData: filterInputs) => {
    try {
      setIsLoading(true);
      const from = dateData.fromDate;
      const formattedOneDayFurther = getOneDayFurtherDate(dateData.toDate);
      const data = await fetchDataWithAxios({
        endpoint: `/api/v1/disaster/incident/statuses/?date_from=${from}&date_to=${formattedOneDayFurther}`,
      });
      const getDataFormat = serializeDoughtnutData(data);
      setDoughnutData(getDoughnutData(getDataFormat));
    } catch (error) {
      console.log('Doughnut Chart Filter Error : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(data);
  useEffect(() => {
    setDoughnutData(data);
  }, [data]);

  return (
    <div className={`${glassyCSS} p-5 h-full`}>
      <ChartDateFilter handler={DoughnutChartHandler} />
      <SubTitle className="mb-5">{title}</SubTitle>
      <div className="h-[450px]">
        {isLoading ? (
          <CustomChartLoader />
        ) : (
          <Doughnut data={doughnutData} options={options} />
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
