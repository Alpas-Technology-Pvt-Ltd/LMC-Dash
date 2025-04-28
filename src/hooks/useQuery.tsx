'use client';
import api from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const useCustomFetching = ({ API, key }: { API: string; key: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [key],
    queryFn: async () => await api.get(API),
  });

  return { data, isLoading, isError };
};

export default useCustomFetching;
