import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useFilteredByMonthTransactions = () => {
  
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['filtered_by_month_transactions'],
    mutationFn: (mutateVars: { requestData: any}) => {
      const { requestData } = mutateVars;

      return postService(requestData, 'transactions-by-month');
    },
  });

  return {
    filteredByMonthTransactionsData: data,
    isFilteredByMonthTransactionsSuccess: isSuccess,
    filteredByMonthTransactionsMutate: mutate,
  };
};