'use client';
import MapCard from '@/components/Maps/MapCard';
import Overlay from '@/components/Utility_Components/Overlay';
import Title from '@/components/Utility_Components/Title';
import RedirectingLogicWrapper from '@/components/Wrappers/Map_Wrappers';
import { useGlobalContext } from '@/context/context';
import { useTranslations } from 'next-intl';

const page = () => {
  const t = useTranslations('map');
  const { todayIncidents, theme } = useGlobalContext();

  if (!todayIncidents.length)
    return (
      <div
        className={`${
          theme == 'dark'
            ? 'bg-gradient-to-br from-gray-950 to-gray-700 text-white'
            : theme == 'light'
              ? 'text-primary_text_color bg-gradient-to-br from-blue-800 to-blue-400 '
              : 'bg-gradient-to-br from-red-500 to-red-300 text-black'
        } h-screen text-4xl flex items-center   justify-center  w-full`}
      >
        <h2 className="font-semibold text-3xl text-white">
          No Emergency Incident
        </h2>
      </div>
    );

  return (
    <div className={`flex flex-col gap-2 p-3 min-h-screen`}>
      <RedirectingLogicWrapper />
      <Title className="mb-5">{t('title')}</Title>

      <section className={`relative  flex gap-3 flex-wrap `}>
        {todayIncidents?.map((report, index) => (
          <MapCard
            report={report}
            showMapImage={false}
            width="w-full 2xl:w-[49%]"
            key={index}
          />
        ))}

        <Overlay />
      </section>
    </div>
  );
};

export default page;
