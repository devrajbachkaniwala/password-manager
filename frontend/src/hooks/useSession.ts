import { getProfile } from '@/lib/account/getProfile';
import { withAuth } from '@/lib/auth/withAuth';
import { useQuery } from '@tanstack/react-query';

export const useSession = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => withAuth(() => getProfile()),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
};
