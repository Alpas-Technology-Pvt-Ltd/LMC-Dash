'use client';

import { useGlobalContext } from '@/context/context';

const FallbackUI = () => {
  const { theme } = useGlobalContext();
  return (
    <div className="h-screen w-full relative">
      <div
        className={`${
          theme == 'dark'
            ? 'bg-gradient-to-br from-gray-950 to-gray-700 text-white'
            : theme == 'light'
              ? 'text-primary_text_color bg-gradient-to-br from-blue-800 to-blue-400 '
              : 'bg-gradient-to-br from-red-500 to-red-300 text-black'
        }  h-full w-full text-4xl flex items-center justify-center absolute top-0 left-0`}
      >
        <span className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></span>{' '}
      </div>
    </div>
  );
};

export default FallbackUI;
