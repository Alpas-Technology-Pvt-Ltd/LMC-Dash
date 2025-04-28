'use client';
import { useGlobalContext } from '@/context/context';
import { RightArrowIcon } from '@/svg/sidebar';
import { deleteCookie, fetchDataWithAxios, toastFn } from '@/utils/utilitiesFn';
import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ChangesIcon from '../Utility_Components/ChangesIcon';
import CustomChartLoader from '../Utility_Components/CustomChartLoader';
import { navlinkType } from './Sidebar';

const NavItem = ({
  index,
  link,
  showArrow = true,
}: {
  index: number;
  link: navlinkType;
  showArrow: boolean;
}) => {
  const pathname = usePathname();
  const locale = useLocale();
  const { incidentsChangeIndicator } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // authService.logout();
  const router = useRouter();

  const logoutHandler = async () => {
    // If other links are clicked instead of logout link , then return
    if (
      !(
        link?.name?.includes('Logout') ||
        link?.name?.includes('बाहिर निस्कनुहोस्')
      )
    )
      return;

    console.log('inside logout handler');
    try {
      setIsLoading(true);
      await fetchDataWithAxios({
        endpoint: '/api/v1/logout/',
        method: 'post',
        postData: {
          refresh: Cookies.get('refreshToken'),
        },
      });
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      toastFn('success', 'Logged Out Successfull');
    } catch (error: any) {
      console.log('logout Error', error);
    } finally {
      setIsLoading(false);
      // Redirection logic
      return router.push(`/${locale}/login`);
    }
  };
  return (
    <li
      key={index}
      className={`w-full ${
        pathname == link.link && `bg-theme_color text-white`
      } hover:bg-theme_color hover:text-white cursor-pointer ps-4 pe-5 rounded-md hover:drop-shadow-2xl font-semibold relative drop-shadow-2xl`}
      onClick={logoutHandler}
    >
      {isLoading ? (
        <CustomChartLoader />
      ) : link?.name?.includes('Logout') ||
        link?.name?.includes('बाहिर निस्कनुहोस्') ? (
        <div className={` flex gap-3 py-3 relative items-center `}>
          {showArrow && (
            <div className="arrow">
              <RightArrowIcon />
            </div>
          )}

          <div className="flex gap-4 items-center">
            {link.icon}
            {link.name}
          </div>

          {incidentsChangeIndicator && link.link.includes('incident') && (
            <ChangesIcon className="absolute top-2 -right-5" />
          )}

          {/* Condition for showing or not showing drop-down icon logic */}
          {link?.dropDown?.length > 0 && (
            <div className="absolute top-4 right-2">{link.icon}</div>
          )}
        </div>
      ) : (
        <Link
          href={link.link}
          className={` flex gap-3 py-3 relative items-center `}
        >
          {showArrow && (
            <div className="arrow">
              <RightArrowIcon />
            </div>
          )}

          <div className="flex gap-4 items-center">
            {link.icon}
            {link.name}
          </div>

          {incidentsChangeIndicator && link.link.includes('incident') && (
            <ChangesIcon className="absolute top-2 -right-5" />
          )}

          {/* Condition for showing or not showing drop-down icon logic */}
          {link?.dropDown?.length > 0 && (
            <div className="absolute top-4 right-2">{link.icon}</div>
          )}
        </Link>
      )}
    </li>
  );
};

export default NavItem;
