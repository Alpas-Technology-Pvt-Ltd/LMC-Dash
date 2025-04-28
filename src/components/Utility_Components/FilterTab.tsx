import { incidentTypeData, statusData } from '@/data/incidentData';
import { glassyCSS, shadow } from '@/data/temp';
import { DateIcon, SearchIcon, TypeIcon } from '@/svg/filters';
import { StatusIcon } from '@/svg/maps';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type filterTabProps = {
  searchBar?: boolean;
  searchBarText?: string;
  typeFilter?: boolean;
  typeFilterText?: string;
  statusFilter?: boolean;
  statusFilterText?: string;
  dateFilter?: boolean;
  dateFilterText?: string;
  showGlassBg?: boolean;
  handler: ({ search, status, type }) => void;
};

const FilterTab = ({
  searchBar = false,
  searchBarText = 'Search ',
  typeFilter = false,
  typeFilterText = 'Type :',
  statusFilter = false,
  statusFilterText = 'Status : ',
  dateFilter = false,
  dateFilterText = 'Date :',
  showGlassBg = false,
  handler,
}: filterTabProps) => {
  const { register, watch } = useForm<filterInputs2>();
  let searchValue = watch('search');
  let statusValue = watch('status');
  let typeValue = watch('type');

  useEffect(() => {
    handler({
      search: searchValue,
      status: statusValue,
      type: typeValue,
    });
  }, [searchValue, statusValue, typeValue]);
  return (
    <form>
      <div
        className={` ${
          showGlassBg && glassyCSS
        }w-full py-2 px-4 flex flex-wrap gap-3 lg:gap-5 my-3 items-center`}
      >
        {/* Search Filter */}
        {searchBar && (
          <div className={`${shadow} px-3 py-2 rounded-md`}>
            <label className="flex gap-2 items-center">
              <SearchIcon />
              {searchBarText}
              <input
                type="text"
                {...register('search', { required: true })}
                placeholder="Contact No...."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
          </div>
        )}

        {/* Type Filter */}
        {typeFilter && (
          <div className={`${shadow} px-3 py-2 rounded-md`}>
            <label className="flex gap-2 items-center">
              <TypeIcon />
              {typeFilterText}
              <select
                {...register('type', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="All">All</option>
                {incidentTypeData.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* Status Filter */}
        {statusFilter && (
          <div className={`${shadow} px-3 py-2 rounded-md`}>
            <label className="flex gap-2 items-center">
              <StatusIcon />
              {statusFilterText}
              <select
                {...register('status', { required: true })}
                name="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="All">All</option>
                {statusData.map((status) => (
                  <option value={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* Date Filter */}
        {dateFilter && (
          <div className={`${shadow} px-3 py-2 rounded-md`}>
            <label className="flex gap-2 items-center">
              <DateIcon />
              {dateFilterText}
              <input
                type="date"
                {...register('date', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
          </div>
        )}
      </div>
    </form>
  );
};

export default FilterTab;
