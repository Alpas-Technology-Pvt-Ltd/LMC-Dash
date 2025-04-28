'use client';

import { useGlobalContext } from '@/context/context';
const CustomLoader = () => {
  const { theme } = useGlobalContext();

  return (
    <div
      className={`${
        theme == 'dark'
          ? 'bg-gradient-to-br from-gray-950 to-gray-700 text-white'
          : theme == 'light'
            ? 'text-primary_text_color bg-gradient-to-br from-blue-800 to-blue-400 '
            : 'bg-red-600 text-black'
      } h-screen text-4xl flex items-center justify-center`}
    >
      <span className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></span>{' '}
    </div>
  );
};

export default CustomLoader;
