"use client"
import PostForm from '@/components/Utility_Components/PostForm';
import Title from '@/components/Utility_Components/Title';

const page = () => {
  // const t = useTranslations('blog');

  return (
    <div className="min-h-screen p-5 relative ">
      <Title className="mb-5">Blog Page</Title>
      <PostForm />
    </div>
  );
};

export default page;
