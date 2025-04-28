'use client';
import { useGlobalContext } from '@/context/context';

const loading = () => {
  const { theme } = useGlobalContext();
  return (
    <div
      className={`flex justify-center items-center h-screen w-full ${
        theme == 'dark'
          ? 'bg-gradient-to-br from-gray-950 to-gray-700 text-white'
          : theme == 'light'
            ? 'text-primary_text_color bg-gradient-to-br from-blue-800 to-blue-400 '
            : 'bg-gradient-to-br from-red-500 to-red-300 text-black'
      } `}
    >
      <div className="flex space-x-2">
        {/* Dot 1 */}
        <div
          className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>

        {/* Dot 2 */}
        <div
          className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>

        {/* Dot 3 */}
        <div
          className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
    </div>
  );
};

export default loading;
