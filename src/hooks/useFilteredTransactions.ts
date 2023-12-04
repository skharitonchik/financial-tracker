import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useFilteredTransactions = () => {
  
  const { data, mutate } = useMutation({
    mutationKey: ['testRequest'],
    mutationFn: (mutateVars: { requestData: any}) => {
      const { requestData } = mutateVars;

      return postService(requestData, 'transactions-by-day');
    },
  });

  return {
    filteredTransactionsData: data,
    filteredTransactionsMutate: mutate,
  };
};