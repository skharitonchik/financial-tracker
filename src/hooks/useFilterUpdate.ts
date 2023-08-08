import { useMutation } from '@tanstack/react-query';
import { editService } from '../services';

export const useFilterUpdate = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['filter_update'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return editService(requestData, '/update-filter');
    },
  });

  return {
    filterUpdateData: data,
    isLoadFilterUpdateSuccess: isSuccess,
    filterUpdateMutate: mutate,
  };
};
