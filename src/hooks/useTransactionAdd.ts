import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useTransactionAdd = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['transaction_add'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return postService(requestData, 'add-transaction');
    },
  });

  return {
    transactionsPostData: data,
    isLoadTransactionsPostSuccess: isSuccess,
    transactionsAddMutate: mutate,
  };
};
