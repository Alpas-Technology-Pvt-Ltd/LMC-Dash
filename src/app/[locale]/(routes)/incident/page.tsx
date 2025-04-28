'use client';
import CreateIncidentForm from '@/components/Incidents/CreateIncidentForm';
import IncidentCard from '@/components/Incidents/IncidentCard';
import FallbackUI from '@/components/Utility_Components/FallbackUI';
import FilterTab from '@/components/Utility_Components/FilterTab';
import Pagination from '@/components/Utility_Components/Pagination';
import Redirect from '@/components/Utility_Components/Redirect';
import Title from '@/components/Utility_Components/Title';
import { useGlobalContext } from '@/context/context';
import { getIncidentIdFromName } from '@/data/incidentData';
import { glassyCSS } from '@/data/temp';
import { CloseIcon, CreateIcon } from '@/svg/utilitySVG';
import { fetchDataWithAxios } from '@/utils/utilitiesFn';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

let pageSize = 3;
let defaultPage = 1;

const page = () => {
  const [incidents, setIncidents] = useState<Incident[] | []>([]);
  const [storeIncidents, setStoreIncidents] = useState<Incident[] | []>([]);
  const [createOverlayShow, setCreateOverlayShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const t = useTranslations('incident');
  const f = useTranslations('filterComponent');

  const {
    incidentsChangeIndicator,
    setIncidentChangeIndicator,
    totalIncidentCount,
    setTotalIncidentCount,
    incidentPageData,
    setIncidentPageData,
  } = useGlobalContext();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const totalPages = Math.ceil(Number(totalIncidentCount) / Number(pageSize));

  // Notification bell icon wala logic //
  if (incidentsChangeIndicator) setIncidentChangeIndicator(false);

  //-------------------------------------------------------------HANDLERS-------------------------------------------------------------//

  // Fetching logic //
  const fetchIncidents = async ({ page }: { page: number }) => {
    try {
      setLoading(true);
      let currPage = Number(page);
      defaultPage = currPage;
      const data = await fetchDataWithAxios({
        endpoint: `/api/v1/disaster/incident/?page=${page}&page_size=${pageSize}`,
      });
      setIncidents(data.results);
      setIncidentPageData(data.results);
      setStoreIncidents(data.results);
      setTotalIncidentCount(data.count);

      // Don't execute the below part , if this function is called by useEffect()
      if (currPage < 1) return;
      params.set('page', page.toString());
      router.push(
        `${pathname}?page=${params?.get('page')?.toString()}&page_size=${pageSize}`,
      );
    } catch (error) {
      console.log('Incident Page Fetch Error :', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic //
  const handleFilter = ({
    search,
    status,
    type,
  }: {
    search: string;
    status: string;
    type: string;
  }) => {
    let filterIncidents = storeIncidents;

    if (search) {
      const regex = new RegExp(`^${search}`, 'i');
      filterIncidents = filterIncidents?.filter((item: Incident) =>
        regex.test(item?.contact_no),
      );
    }

    if (status) {
      if (status != 'All') {
        filterIncidents = filterIncidents?.filter(
          (item: Incident) =>
            item?.status.toLocaleLowerCase() == status.toLocaleLowerCase(),
        );
      }
    }
    if (type) {
      if (type != 'All') {
        filterIncidents = filterIncidents?.filter((item: Incident) => {
          console.log(item.service_id);
          console.log(Number(getIncidentIdFromName(type)));
          return item.service_id == Number(getIncidentIdFromName(type));
        });
      }
    }

    setIncidents(filterIncidents);
  };

  //-------------------------------------------------------------USEEFFECTS-------------------------------------------------------------//

  useEffect(() => {
    fetchIncidents({ page: 1 });
  }, []);

  return (
    <div className=" relative min-h-screen">
      <Redirect />

      {loading && <FallbackUI />}
      {!loading && (
        <div className="p-5">
          <div className="flex justify-between items-center">
            <Title className="mb-5">{t('title')}</Title>
            <div
              className="cursor-pointer"
              onClick={() => {
                setCreateOverlayShow(true);
              }}
            >
              <CreateIcon />
            </div>
          </div>

          {/* Filters Section */}
          <FilterTab
            searchBar
            searchBarText={f('Search')}
            statusFilter
            statusFilterText={f('Status')}
            typeFilter
            typeFilterText={f('Type')}
            showGlassBg
            handler={handleFilter}
          />

          {incidents.length == 0 && (
            <div className="h-screen w-full flex justify-center items-center text-2xl font-semibold">
              No Incident for the current Filter Options
            </div>
          )}

          {incidents.length > 0 && (
            <section className="listing flex gap-4 flex-wrap relative">
              <>
                {incidents.map((item) => (
                  <IncidentCard report={item} width="w-full 2xl:w-[49%]" />
                ))}
              </>
            </section>
          )}

          <div className="pagination mt-5 fixed bottom-5 right-5">
            <Pagination
              totalPages={totalPages}
              currentPage={defaultPage}
              fetchHandler={fetchIncidents}
            />
          </div>

          {/* Creating Incident FORM Overlay */}
          {createOverlayShow && (
            <div
              className={`${glassyCSS} absolute top-0 left-0 h-full w-full flex justify-center `}
            >
              <CreateIncidentForm />

              {/* Close Icon */}
              <div
                className="absolute top-8 right-7 cursor-pointer"
                onClick={() => {
                  setCreateOverlayShow(false);
                }}
              >
                <CloseIcon />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
