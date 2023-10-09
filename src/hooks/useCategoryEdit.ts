import { useMutation } from '@tanstack/react-query';
import { editService } from '../services';

export const useCategoryEdit = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['category_edit'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return editService(requestData, 'update-category');
    },
  });

  return {
    categoriesEditData: data,
    isLoadCategoriesEditSuccess: isSuccess,
    categoryEditMutate: mutate,
  };
};
