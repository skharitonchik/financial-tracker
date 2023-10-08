import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useFilterData = (enabled: boolean) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['filters'],
    queryFn: () => getService('filters'),
    enabled,
  });

  return {
    filtersData: data,
    isLoadFiltersSuccess: isSuccess,
  };
};
