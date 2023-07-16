import { useMutation } from '@tanstack/react-query';
import { postService } from '../services';

export const useCardAdd = () => {
  const { data, isSuccess, mutate } = useMutation({
    mutationKey: ['card_add'],
    mutationFn: (mutateVars: { requestData: any }) => {
      const { requestData } = mutateVars;

      return postService(requestData, '/add/cards');
    },
  });

  return {
    cardsPostData: data,
    isLoadCardsPostSuccess: isSuccess,
    cardAddMutate: mutate,
  };
};
