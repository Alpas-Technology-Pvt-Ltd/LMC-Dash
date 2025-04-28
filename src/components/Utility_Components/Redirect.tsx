'use client';
import { useGlobalContext } from '@/context/context';
import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';

const Redirect = () => {
  const locale = useLocale();
  const { emerygencyRedirect } = useGlobalContext();
  if (emerygencyRedirect) return redirect(`/${locale}/map`);

  return null;
};

export default Redirect;
