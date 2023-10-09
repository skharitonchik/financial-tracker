import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useTransactionsByDayData = (enabled: boolean) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['transactions_by_day'],
    queryFn: () => getService('transactions-by-day'),
    enabled,
  });

  return {
    transactionsByDayData: data,
    isLoadTransactionsByDaySuccess: isSuccess,
  };
};
