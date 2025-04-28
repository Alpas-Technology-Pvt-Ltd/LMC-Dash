'use client';
import ChartDateFilter from '@/components/Utility_Components/ChartDateFilter';
import CustomChartLoader from '@/components/Utility_Components/CustomChartLoader';
import SubTitle from '@/components/Utility_Components/SubTitle';
import { getMostRegisteredIncidentData } from '@/data/chartData';
import { glassyCSS, shadow } from '@/data/temp';
import { DownArrow, UpArrow } from '@/svg/utilitySVG';
import {
  fetchDataWithAxios,
  getOneDayFurtherDate,
  serializeBarChartData,
} from '@/utils/utilitiesFn';
import { ChartData, ChartOptions } from 'chart.js';
import Chart, { CategoryScale } from 'chart.js/auto';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({
  data,
  options,
  showExtraFilters = false,
  title,
}: {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
  showExtraFilters?: boolean;
  title: string;
}) => {
  Chart.register(CategoryScale);
  const [barChartData, setBarChartData] = useState<ChartData<'bar'>>(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // HANDLER //
  const barChartHandler = async (dateData: filterInputs) => {
    try {
      setIsLoading(true);
      const from = dateData.fromDate;
      const formattedOneDayFurther = getOneDayFurtherDate(dateData.toDate);
      const data = await fetchDataWithAxios({
        endpoint: `/api/v1/disaster/incident/top-services/?end_date=${formattedOneDayFurther}&start_date=${from}`,
      });
      const reqDataFormat = serializeBarChartData(data);
      setBarChartData(
        getMostRegisteredIncidentData(reqDataFormat.xAxis, reqDataFormat.yAxis),
      );
    } catch (error) {
      console.log('Bar Chart Filter Error : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setBarChartData(data);
  }, [data]);

  return (
    <div className={`${glassyCSS} p-5`}>
      <div className="flex justify-between items-center">
        <ChartDateFilter handler={barChartHandler} />
        {showExtraFilters && <ExtraFilter />}
      </div>

      <SubTitle className="mb-5">{title}</SubTitle>
      <div className="h-[450px]">
        {isLoading ? (
          <CustomChartLoader />
        ) : (
          <Bar data={barChartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default BarChart;

const ExtraFilter = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const t = useTranslations('chartExtraFilter');
  return (
    <div
      className={`${shadow} flex ${glassyCSS} py-2 gap-10 px-3 mb-10 w-fit rounded-md cursor-pointer`}
      onClick={() => {
        setFlag((prev) => !prev);
      }}
    >
      {flag ? (
        <div className="flex gap-2">
          <DownArrow />
          <h3>{t('HighToLow')}</h3>
        </div>
      ) : (
        <div className="flex gap-2">
          <UpArrow />
          <h3>{t('LowToHigh')}</h3>
        </div>
      )}
    </div>
  );
};
