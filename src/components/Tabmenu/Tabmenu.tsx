'use client';
import { useGlobalContext } from '@/context/context';
import { MenuIcon } from '@/svg/sidebar';
import { useTranslations } from 'next-intl';

const Tabmenu = () => {
  const { activeTab, setActiveTab, setSidebarOpen } = useGlobalContext();
  const t = useTranslations('tabComponent');

  const tabOptions = [
    { id: 0, name: `${t('Tab1')}` },
    { id: 1, name: `${t('Tab2')}` },
  ];
  const clickHandler = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-2xl rounded-lg border border-white/10 shadow-lg w-full  h-14 flex gap-5 md:gap-7 items-center py-2 px-5 md:p-5 font-semibold `}
    >
      <div
        className="lg:hidden"
        onClick={() => {
          setSidebarOpen((prev) => !prev);
        }}
      >
        <MenuIcon />
      </div>
      {tabOptions.map((option) => (
        <div
          key={option.id}
          className={`
             cursor-pointer bg-theme_color px-6 md:px-8 py-1 text-current rounded-md
             ${activeTab == option.id && 'border-white/50 border-4 scale-105'}
             `}
          onClick={() => {
            clickHandler(option.id);
          }}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};

export default Tabmenu;
