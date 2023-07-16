import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useTransactionsData = (enabled: boolean) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getService('/read/transactions'),
    enabled,
  });

  return {
    transactionsData: data,
    isLoadTransactionsSuccess: isSuccess,
  };
};
