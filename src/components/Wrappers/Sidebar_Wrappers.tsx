'use client';
import { useGlobalContext } from '@/context/context';
import { usePathname } from 'next/navigation';
import ChangesIcon from '../Utility_Components/ChangesIcon';

export const SidebarWrapper = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  const { sidebarOpen, userAuthStatus } = useGlobalContext();
  const { theme } = useGlobalContext();
  const pathname = usePathname();

  console.log(userAuthStatus, 'user auth status');

  return (
    <div
      className={`${className} ${
        theme == 'red'
          ? 'bg-gradient-to-br from-red-500 to-red-300 text-black'
          : 'bg-white/10 backdrop-blur-2xl  border border-black/10 shadow-lg'
      }  ${
        userAuthStatus && !pathname.includes('login') ? 'flex' : 'hidden'
      } flex-col gap-11 p-5 transition-all duration-300 ease-in-out shadow-md  
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
           lg:translate-x-0`}
    >
      {children}
    </div>
  );
};

export const BellIconWrapper = ({ link }: { link: { name: string } }) => {
  const { incidentsChangeIndicator } = useGlobalContext();

  return (
    <>
      {incidentsChangeIndicator && link.name == 'Incidents' && (
        <ChangesIcon className="absolute top-2 -right-5" />
      )}
    </>
  );
};
