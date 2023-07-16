import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useCategoryAdd = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['category_add'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return postService(requestData, '/add/categories');
    },
  });

  return {
    categoriesPostData: data,
    isLoadCategoriesPostSuccess: isSuccess,
    categoryAddMutate: mutate,
  };
};
