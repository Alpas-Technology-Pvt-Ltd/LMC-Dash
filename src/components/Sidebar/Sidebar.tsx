import Logo from '../Logo/Logo';

import ThemeIcon from '../Theme/ThemeIcon';

import {
  BlogIcon,
  DashboardIcon,
  IncidentIcon,
  LogoutIcon,
  MapIcon,
} from '@/svg/sidebar';
import { getLocale, getTranslations } from 'next-intl/server';
import { JSX } from 'react';
import { SidebarWrapper } from '../Wrappers/Sidebar_Wrappers';
import { LanguageLinkWrapper } from '../Wrappers/Wrappers';
import NavItem from './NavItem';

export type navlinkType = {
  name: string;
  link: string;
  icon: JSX.Element;
  dropDown: any[];
};

const Sidebar = async ({ className }: { className: string }) => {
  const locale = await getLocale();

  const t = await getTranslations('sidebarComponent');

  const navLinks: navlinkType[] = [
    {
      name: `${t('Dashboard')}`,
      link: `/${locale}`,
      icon: <DashboardIcon />,
      dropDown: [],
    },
    {
      name: `${t('Maps')}`,
      link: `/${locale}/map`,
      icon: <MapIcon />,
      dropDown: [],
    },
    {
      name: `${t('Incidents')}`,
      link: `/${locale}/incident`,
      icon: <IncidentIcon />,
      dropDown: [],
    },
    {
      name: `${t('Blog')}`,
      link: `/${locale}/blog`,
      icon: <BlogIcon />,
      dropDown: [],
    },
  ];

  const navLinksAccounts = [
    {
      name: `${t('Logout')}`,
      link: `/${locale}/login`,
      icon: <LogoutIcon />,
      dropDown: [],
    },
  ];

  return (
    <SidebarWrapper className={className}>
      <div className="logo_navitems w-full flex flex-col gap-8">
        <Logo />

        {/* OVERVIEW SECTION */}
        <nav className="navitems w-full">
          <h3 className="uppercase font-semibold text-white/75 text-sm my-2 font-mono">
            Overview
          </h3>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <NavItem link={link} key={index} index={index} showArrow />
            ))}
          </ul>
        </nav>
      </div>

      {/* ACCOUNTS SECTION */}
      <nav className="w-full">
        <h3 className="uppercase font-semibold text-white/75 text-sm my-2 font-mono">
          Account
        </h3>
        <ul className="flex flex-col gap-2">
          {navLinksAccounts.map((link, index) => (
            <NavItem link={link} index={index} key={index} showArrow={false} />
          ))}
        </ul>

        {/* Theme ICON */}
        <div
          className={`w-full mt-2 hover:bg-theme_color hover:text-white cursor-pointer ps-4 pe-5 rounded-md hover:drop-shadow-2xl font-semibold relative drop-shadow-2xl`}
        >
          <ThemeIcon />
        </div>

        {/* Language Icon */}
        {locale == 'np' ? (
          <LanguageLinkWrapper locale="en" text="English" />
        ) : (
          <LanguageLinkWrapper locale="np" text="नेपाली" />
        )}
      </nav>
    </SidebarWrapper>
  );
};

export default Sidebar;
