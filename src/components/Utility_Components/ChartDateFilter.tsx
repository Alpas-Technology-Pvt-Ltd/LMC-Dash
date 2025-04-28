'use client';
import { glassyCSS, shadow } from '@/data/temp';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from './Button';

const ChartDateFilter = ({
  typeFilter = false,
  handler,
  isLineChart = false,
  statusFilter = false,
}: {
  typeFilter?: boolean;
  handler?: (dateData: filterInputs) => void;
  isLineChart?: boolean;
  statusFilter?: boolean;
}) => {
  const today = new Date(); // Get today's date
  const oneWeekAgo = new Date(today); // Copy today's date
  oneWeekAgo.setDate(today.getDate() - 7); // Subtract 7 days

  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 2);

  const formattedWeekAgoDate = oneWeekAgo.toISOString().split('T')[0];
  const formattedTodayDate = today.toISOString().split('T')[0];
  const formattedSixMonthAgoDate = sixMonthsAgo.toISOString().split('T')[0];

  const t = useTranslations('dateFilterComponent');
  const b = useTranslations('button');
  const [fromDate, setFromDate] = useState(
    isLineChart ? formattedSixMonthAgoDate : formattedWeekAgoDate,
  );
  const [toDate, setToDate] = useState(formattedTodayDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<filterInputs>();

  const submitHandler: SubmitHandler<filterInputs> = (data) => {
    if (handler) handler(data)!;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={`${shadow} flex ${glassyCSS} py-2 gap-10 px-3 mb-5 w-fit rounded-md items-center`}
      >
        <div className="from flex gap-2 items-center">
          {t('From')}
          <input
            type="date"
            value={fromDate}
            {...register('fromDate', { required: true })}
            onChange={(e) => {
              setFromDate(e.target.value); // Update local state
              setValue('fromDate', e.target.value); // Update React Hook Form
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="to flex gap-2 items-center">
          {t('To')}
          <input
            type="date"
            value={toDate}
            {...register('toDate', { required: true })}
            onChange={(e) => {
              setToDate(e.target.value); // Update local state
              setValue('toDate', e.target.value); // Update React Hook Form
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Type Filter */}
        {typeFilter && (
          <div className={`${shadow} px-3 py-2 rounded-md`}>
            <label className="flex gap-2 items-center whitespace-nowrap">
              {t('Type')}
              <select
                {...register('type', { required: true })}
                defaultValue="ALL"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="ALL" disabled>
                  ALL
                </option>
                <option value="Janku">Janku</option>
                <option value="Rally">Rally</option>
                <option value="Loose Cattle">Loose Cattle</option>
                <option value="Flood and Landslide">Flood and Landslide</option>
                <option value="Public Land Occupancy">
                  Public Land Occupancy
                </option>
                <option value="Black Market">Black Market</option>
                <option value="Needy People">Needy People</option>
                <option value="Disaster">Disaster</option>
                <option value="Road Digging">Road Digging</option>
                <option value="Non-permitted Advertisement">
                  Non-permitted Advertisement
                </option>
                <option value="Street Light">Street Light</option>
                <option value="Footpath">Footpath</option>
                <option value="Plant Related Issues">
                  Plant Related Issues
                </option>
                <option value="Heritage Protection">Heritage Protection</option>
                <option value="Education Issue">Education Issue</option>
                <option value="Sexual Violence">Sexual Violence</option>
                <option value="Non-permitted Structure">
                  Non-permitted Structure
                </option>
                <option value="Non-permitted Parking">
                  Non-permitted Parking
                </option>
                <option value="Garbage">Garbage</option>
                <option value="Mortuary Transport">Mortuary Transport</option>
                <option value="Sewage">Sewage</option>
                <option value="Ambulance">Ambulance</option>
                <option value="Firefighter">Firefighter</option>
              </select>
            </label>
          </div>
        )}

        {/* Status Filter */}
        {statusFilter && (
          <div className={`${shadow} px-3 py-2 rounded-md`}>
            <label className="flex gap-2 items-center whitespace-nowrap">
              {t('Status')}
              <select
                {...register('status', { required: true })}
                defaultValue="ALL"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="ALL" disabled>
                  ALL
                </option>
                <option value="active">Active</option>
                <option value="on_move">On Move</option>
                <option value="cancelled">Cancelled</option>
                <option value="all_clear">All Clear</option>
                <option value="trash">Trash</option>
              </select>
            </label>
          </div>
        )}

        <Button className="px-5 py-2 font-semibold">{b('Submit')}</Button>
      </form>
    </div>
  );
};

export default ChartDateFilter;
