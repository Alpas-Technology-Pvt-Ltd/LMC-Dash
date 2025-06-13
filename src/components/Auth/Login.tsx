'use client';
import { useGlobalContext } from '@/context/context';
import api from '@/lib/axios';
import { loginSchema } from '@/types/InputValidators';
import { toastFn } from '@/utils/utilitiesFn';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// ronakthapa.ths@gmail.com

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<authInputs>();

  const { setUserAuthStatus } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const p = usePathname().split('/');
  const router = useRouter();

  const dynamicURL = p.splice(2).join().replaceAll(',', '/');
  const t = useTranslations('form');
  const loginTranslation = useTranslations('login');

  //-------------------------------------------------------------HANDLERS-------------------------------------------------------------//

  const onSubmit: SubmitHandler<authInputs> = async (inputData) => {
    reset();
    try {
      setIsLoading(true);
      // ZOD Validation
      if (loginSchema.parse(inputData)) {
        // Will throw an error if validation fails

        // const data = {
        //   access: 'abcd',
        //   refresh: 'abcd',
        // };

        const { data } = await api.post('/api/v1/login/', {
          email: inputData.email,
          password: inputData.password,
        });

        if (data.access && data.refresh) {
          Cookies.set('accessToken', data.access, {
            path: '/',
          });
          Cookies.set('refreshToken', data.refresh, {
            path: '/',
          });

          setUserAuthStatus(true);
          toastFn('success', 'Login Successfull');
        } else return;
      }
    } catch (err: any) {
      console.log('Login Failed', err?.originalErrorResponse.detail);
      toastFn('error', `Login failed : ${err?.originalErrorResponse.detail}`);
    } finally {
      setIsLoading(false);
      return router.push(`/`);
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col w-[500px] shadow-lg ${shadow} bg-white/10 backdrop-blur-2xl rounded-lg border border-white/10 shadow-lg p-6 gap-2">
        <div className="text-center">
          <h1 className="font-light text-5xl">Login</h1>
          <p className="mt-4">{loginTranslation('text')}...</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`w-full flex flex-col gap-4`}
        >
          <div>
            <label className="font-semibold text-current">Email</label>
            <input
              type="email"
              value={'subodh@alpastechnology.com'}
              {...register(`email`, { required: true })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-theme_color outline-none text-black"
              placeholder="email..."
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{t('error')}</span>
            )}
          </div>
          <div>
            <label className="font-semibold text-current">Password</label>
            <input
              {...register(`password`, { required: true })}
              value="Test#12345"
              type="password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-theme_color outline-none text-black"
              placeholder="Pasword..."
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{t('error')}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition-all duration-300"
          >
            {isLoading ? (
              <span className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></span>
            ) : (
              <span>{loginTranslation('loginText')}</span>
            )}
          </button>

          <div className="w-full">
            <div className="w-fit bg-gray-800 p-2 rounded-lg">
              <Link
                href={`/np/${dynamicURL}`}
                locale="np"
                className="py-1 ps-4 pe-5 w-full flex items-center gap-2 hover:bg-theme_color hover:text-white cursor-pointer rounded-md hover:drop-shadow-2xl font-semibold relative drop-shadow-2xl"
              >
                नेपाली
              </Link>
              <Link
                href={`/en/${dynamicURL}`}
                locale="en"
                className="py-1 ps-4 pe-5 w-full flex items-center gap-2  hover:bg-theme_color hover:text-white cursor-pointer rounded-md hover:drop-shadow-2xl font-semibold relative drop-shadow-2xl"
              >
                English
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
