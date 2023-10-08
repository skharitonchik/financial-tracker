import { useQuery } from '@tanstack/react-query';
import { getService } from '../services';

export const useUsersData = (enabled: boolean) => {
  const { data, isSuccess } = useQuery({ queryKey: ['users'], queryFn: () => getService('users'), enabled });

  return {
    usersData: data,
    isLoadUsersSuccess: isSuccess,
  };
};
