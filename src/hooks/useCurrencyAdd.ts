import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useCurrencyAdd = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['currency_add'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return postService(requestData, 'add-currency');
    },
  });

  return {
    currencyAddData: data,
    isLoadCurrencyAddSuccess: isSuccess,
    currencyAddMutate: mutate,
  };
};
