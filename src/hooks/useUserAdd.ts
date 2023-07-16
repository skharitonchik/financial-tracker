import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useUserAdd = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['todos'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return postService(requestData, '/add/users');
    },
  });

  return {
    userAddData: data,
    isLoadUserAddSuccess: isSuccess,
    userAddMutate: mutate,
  };
};
