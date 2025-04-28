'use client';
import { useGlobalContext } from '@/context/context';
import { glassyCSS } from '@/data/temp';
import { getTodayIncidentTabData } from '@/data/todayIncidentTabData';
import { useTranslations } from 'next-intl';
import SubTitle from './SubTitle';

const TodayIncidentTab = () => {
  const t = useTranslations('Dashboard.TodayIncidentTab');
  const { todayIncidents } = useGlobalContext();

  const todayIncidentCount = todayIncidents.length;
  const all_clear = todayIncidents.filter(
    (item: Incident) => item.status == 'all_clear',
  ).length;
  const on_move = todayIncidents.filter(
    (item: Incident) => item.status == 'on_move',
  ).length;
  const cancelled = todayIncidents.filter(
    (item: Incident) => item.status == 'cancelled',
  ).length;
  const trash = todayIncidents.filter((item) => item.status == 'trash').length;
  const active = todayIncidents.filter(
    (item: Incident) => item.status == 'active',
  ).length;

  return (
    <div className={`${glassyCSS} my-3 py-2 px-5 `}>
      <SubTitle className="my-5">{t('title')}</SubTitle>

      <div className="flex gap-5 flex-wrap">
        {getTodayIncidentTabData({
          incident_count: todayIncidentCount,
          all_clear,
          active,
          on_move,
          trash,
          cancelled,
        }).map((item, index) => (
          <IncidentTab {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TodayIncidentTab;

//----------------------------------------------LOCAL COMPONENT-----------------------------------------------------------------------------//

const IncidentTab = ({
  tabTitle,
  icon,
  data,
  colorStyles,
}: TodayIncidentTabDataType) => {
  const t = useTranslations('Dashboard.TodayIncidentTab');
  const { emergencyIncident } = useGlobalContext();
  return (
    <div
      className={`flex  flex-col gap-2 bg-[#1a1a1bb6] rounded-md p-3  min-w-[250px]`}
    >
      {/* Top */}
      <p className="flex gap-2 justify-between items-center">
        <span className="font-mono font-semibold whitespace-nowrap inline-block text">
          {t(`${tabTitle}`)}
        </span>
        <span className={''} style={{ color: `${colorStyles}` }}>
          {icon}
        </span>
      </p>
      {/* Mid */}
      <h3
        className={`text-5xl font-bold flex items-center`}
        style={{ color: `${colorStyles}` }}
      >
        {data}
      </h3>
      {/* Bottom */}
      <p className="flex text-white gap-2 text-sm justify-between items-center">
        {/* <span>3 {t('trash')}</span> */}
        <span>
          {emergencyIncident.length} {t('Emergency')}
        </span>
      </p>
    </div>
  );
};
