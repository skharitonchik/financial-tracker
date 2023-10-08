import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useCurrenciesData = (enabled: boolean) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['currencies'],
    queryFn: () => getService('currencies'),
    enabled,
  });

  return {
    currenciesData: data,
    isLoadCurrenciesSuccess: isSuccess,
  };
};
