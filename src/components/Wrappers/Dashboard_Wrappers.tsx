'use client';

import { useGlobalContext } from '@/context/context';

export const Section1Wrapper = ({ children }: childrenHTMLType) => {
  const { activeTab } = useGlobalContext();

  return (
    <section
      className={`section1 min-w-[100%] min-h-screen relative transition-transform  duration-300 ease-in-out `}
      style={{ transform: `translateX(-${activeTab * 100}%) ` }}
    >
      {children}
    </section>
  );
};

export const Section2Wrapper = ({ children }: childrenHTMLType) => {
  const { activeTab } = useGlobalContext();
  return (
    <section
      className={`section2 min-w-[100%] min-h-screen relative transition-transform duration-300 ease-in-out  mt-5`}
      style={{ transform: `translateX(-${activeTab * 100}%) ` }}
    >
      {children}
    </section>
  );
};
