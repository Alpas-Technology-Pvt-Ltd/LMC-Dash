'use client';
import { useGlobalContext } from '@/context/context';
import { glassyCSS } from '@/data/temp';
import { useUserInactivity } from '@/hooks/useUserInactivity';
import { CloseIcon } from '@/svg/utilitySVG';
import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';
import ChangesIcon from './ChangesIcon';

const Overlay = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { isInactive, setIsInactive } = useUserInactivity();
  const { incidentsChangeIndicator } = useGlobalContext();

  const clickHandler = () => {
    setOverlayOpen((prev) => !prev);
  };

  if (isInactive) {
    setOverlayOpen(true);
    setIsInactive(false);
  }
  return (
    <>
      <div
        className={`h-full w-full absolute z-20 top-0 left-0 ${
          overlayOpen ? 'block' : 'hidden'
        } flex flex-col gap-5 items-center  text-white ${glassyCSS} pointer-events-none`}
      >
        <div className="mt-32 flex flex-col items-center justify-center gap-4">
          <div className="incident w-[300px] h-[300px] border-white border-[3px] flex justify-center items-center relative">
            <p className="text-3xl font-semibold">Incidents</p>

            {incidentsChangeIndicator && (
              <ChangesIcon className="-top-9 -right-5 h-20 w-20" />
            )}
          </div>

          <Link href={'/incident'}>
            <Button>Go To Incident Page</Button>
          </Link>
        </div>
      </div>

      {/* Hide Button */}
      <div
        className={`crossIcon absolute z-20 top-3 right-5 text-3xl text-white cursor-pointer ${
          overlayOpen ? 'block' : 'hidden'
        }`}
        onClick={clickHandler}
      >
        <CloseIcon />
      </div>
    </>
  );
};

export default Overlay;
