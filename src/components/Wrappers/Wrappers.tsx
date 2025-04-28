'use client';
import { useGlobalContext } from '@/context/context';
import { LanguageIcon } from '@/svg/utilitySVG';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// const layoutCSSSidebar = 'fixed h-screen w-[250px] z-10';
// const layoutCSSChildren = `lg:ms-[250px]`;
const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
});

export const LayoutChildrenWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme, userAuthStatus } = useGlobalContext();
  const pathname = usePathname();

  // red shadow : 'shadow-[5px_5px_250px_0_rgba(255,0,0,0.4),inset_5px_5px_250px_0px_rgba(255,0,0,0.4)]'

  return (
    <div
      className={`${userAuthStatus && !pathname.includes('login') && 'lg:ms-[250px]'} ${
        theme == 'red' && 'bg-gradient-to-br from-red-500 to-red-300 text-black'
      }`}
    >
      {children}
    </div>
  );
};

export const LayoutParentDiv = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useGlobalContext();

  return (
    <div
      className={`${
        theme == 'dark'
          ? 'bg-gradient-to-br from-gray-950 to-gray-700 text-white'
          : 'text-primary_text_color bg-gradient-to-br from-blue-800 to-blue-400 '
      } ${roboto.className}`}
    >
      {children}
    </div>
  );
};

export const LanguageLinkWrapper = ({
  locale,
  text,
}: {
  locale: string;
  text: string;
}) => {
  const p = usePathname().split('/');

  const dynamicURL = p.splice(2).join().replaceAll(',', '/');
  return (
    <Link
      href={`/${locale}/${dynamicURL}`}
      locale={locale}
      className="py-3 ps-4 pe-5 w-full flex items-center gap-2 mt-2 hover:bg-theme_color hover:text-white cursor-pointer rounded-md hover:drop-shadow-2xl font-semibold relative drop-shadow-2xl"
    >
      <LanguageIcon />
      {text}
    </Link>
  );
};
