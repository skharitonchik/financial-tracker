import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useTransactionTransferAdd = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['transaction_transfer_add'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return postService(requestData, '/add/transaction-transfer');
    },
  });

  return {
    transactionTransferPostData: data,
    isLoadTransactionTransferPostSuccess: isSuccess,
    transactionTransferMutate: mutate,
  };
};
