import { useMutation } from '@tanstack/react-query';
import { deleteService } from '../services';

export const useCategoryDelete = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['category_delete'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return deleteService(requestData, '/delete/categories');
    },
  });

  return {
    categoriesDeleteData: data,
    isLoadCategoriesDeleteSuccess: isSuccess,
    categoryDeleteMutate: mutate,
  };
};
