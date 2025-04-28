'use client';
import { glassyCSS } from '@/data/temp.ts';
import { fetchDataWithAxios, toastFn } from '@/utils/utilitiesFn';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import CustomChartLoader from './CustomChartLoader';
import Input from './Input';
import RTE from './RTE';

export type blogInputsType = {
  title: string;
  content: string;
  image: string;
  category: string;
};

export type formDataType = {
  title:string,
  desc:string,
  image:string
}

export default function PostForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<blogInputsType>();

  const [loading, setLoading] = useState(false);

  const submit = async (data: blogInputsType) => {
    setLoading(true);

    const formData = new FormData();

    // Add text fields
    formData.append('title', data.title);
    formData.append('desc', data.content);

    // Add the image file directly
    formData.append('image', data.image[0]);

    try {
      // Send the request with base64 image
      await fetchDataWithAxios({
        endpoint: '/api/v1/disaster/blogs/submit-blog/',
        method: 'post',
        postData: formData,
      });
      reset();
      toastFn('success', 'Blog Successfully Created');
    } catch (error) {
      console.log('Blog Post Creation Failed Error : ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full p-5 ${glassyCSS}`}>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mt-5">
        <div className="w-full flex flex-col gap-3">
          {/* TITLE */}
          <div className="w-full md:w-1/3">
            <Input
              label="Title :"
              placeholder="Title"
              className=""
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
                {errors.title?.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="w-full md:w-1/3">
            <Input
              label="Featured Image :"
              type="file"
              className=""
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register('image', { required: 'Image is required' })}
            />
            {errors.image && (
              <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
                {errors.image?.message}
              </p>
            )}

            {errors.category && (
              <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
                {errors.category?.message}
              </p>
            )}
          </div>

          <div className="w-full min-h-[800px]">
            <RTE
              label="Content :"
              {...register('content', { required: 'Content is required' })}
              onChange={(content: string) => {
                setValue('content', content);
              }}
            />
            {errors.content && (
              <p className="text-red-600 text-[0.8rem] m-0 mb-4" role="alert">
                {errors.content?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <Button className="w-full px-4 py-2 mt-4">
              {loading ? <CustomChartLoader /> : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
