import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useCategoriesData = (enabled: boolean) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getService('categories'),
    enabled,
  });

  return {
    categoriesData: data,
    isLoadCategoriesSuccess: isSuccess,
  };
};
