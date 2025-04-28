'use client';
import { useGlobalContext } from '@/context/context';
import { TempLogo } from '@/svg/sidebar';
import { CloseIcon } from '@/svg/utilitySVG';

const Logo = () => {
  const { setSidebarOpen } = useGlobalContext();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <TempLogo />
        <h3 className="text-xl font-mono font-bold">LOGO</h3>
      </div>

      <div
        className="lg:hidden"
        onClick={() => {
          setSidebarOpen((prev) => !prev);
        }}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default Logo;
