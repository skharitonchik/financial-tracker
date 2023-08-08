import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useFilterAdd = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['filter_add'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return postService(requestData, '/add-filter-group');
    },
  });

  return {
    filtersPostData: data,
    isLoadFiltersPostSuccess: isSuccess,
    filterAddMutate: mutate,
  };
};
