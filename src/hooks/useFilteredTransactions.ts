import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useFilteredTransactions = () => {
  
  const { data, mutate, isSuccess } = useMutation({
    mutationKey: ['filtered_transactions'],
    mutationFn: (mutateVars: { requestData: any}) => {
      const { requestData } = mutateVars;

      return postService(requestData, 'transactions-by-day');
    },
  });

  return {
    filteredTransactionsData: data,
    isFilteredTransactionsDataSuccess: isSuccess,
    filteredTransactionsMutate: mutate,
  };
};