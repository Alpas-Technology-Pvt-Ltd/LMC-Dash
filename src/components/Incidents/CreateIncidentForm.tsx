'use client';
import { formData } from '@/data/formData';
import { shadow } from '@/data/temp';
import api from '@/lib/axios';
import { useTranslations } from 'next-intl';
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import SubTitle from '../Utility_Components/SubTitle';

//-------------------------------------------------COMPONENT--------------------------------------------------------------------------------//

const CreateIncidentForm = () => {
  const t = useTranslations('form');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('inside form handler');
    const formData = {
      service: data.service,
      location: {
        location: [12, 25],
      },
      message: data.message,
      video: data.video,
      contact_no: data.contactNo,
    };
    const response = await api.post('/api/v1/disaster/incident/', formData);

    console.log(response);
    reset();
  };

  return (
    <div className="w-1/2 mt-32 ">
      {' '}
      <SubTitle className="text-center mb-5">{t('title')}</SubTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full flex flex-col gap-4 p-6 bg-black/70 backdrop-blur-md rounded-lg border border-white/10 shadow-lg ${shadow} text-black`}
      >
        {formData.map((item, index) => (
          <>
            <FormField
              key={index}
              {...item}
              register={register} // Pass register function
              errors={errors} // Pass errors object
            />
          </>
        ))}

        <div className="flex flex-col">
          <label className="font-semibold text-current text-white">
            {t(`Video`)}
          </label>
          <input type="file" {...register('video')} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition-all duration-300"
        >
          {t('Submit')}
        </button>
      </form>
    </div>
  );
};

export default CreateIncidentForm;

//------------------------------------------LOCAL COMPONENTS--------------------------------------------------------------------------------//
type FormDataType = {
  label: string;
  registerValue: 'service' | 'location' | 'contactNo' | 'message' | 'video';
  type: string;
  requiredVal: boolean;
  placeHolderVal: string | null;
  register: UseFormRegister<Inputs>; // Passed from parent
  errors: FieldErrors<Inputs>; // Passed from parent
};

const FormField = ({
  label,
  registerValue,
  type,
  register,
  errors,
}: FormDataType) => {
  const t = useTranslations('form');

  return (
    <div>
      <label className="font-semibold text-current text-white">
        {t(`${label}`)}
      </label>
      <input
        {...register(registerValue, { required: false })}
        type={type}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-theme_color outline-none"
        // placeholder={placeHolderVal ? placeHolder(`${placeHolderVal}`) : ''}
      />
      {errors.contactNo && (
        <span className="text-red-500 text-sm">{t('error')}</span>
      )}
    </div>
  );
};
