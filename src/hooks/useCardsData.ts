import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useCardsData = (enabled: boolean) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['cards'],
    queryFn: () => getService('/read/cards'),
    enabled,
  });

  return {
    cardsData: data,
    isLoadCardsSuccess: isSuccess,
  };
};
