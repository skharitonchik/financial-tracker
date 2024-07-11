import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useCategoriesSettingsData = (enabled = true) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['categories_settings'],
    queryFn: () => getService('categories-settings'),
    enabled,
  });

  return {
    categoriesSettingsData: data,
    isCategoriesSettingsDataSuccess: isSuccess,
  };
};
