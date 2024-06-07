import { TokenService } from '@/services/token-service';
import { getAccessToken } from './token';
import { queryClient } from '@/app/_components/QueryProvider';

export const withAuth = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (err: any) {
    try {
      console.log('refetching new access token');
      const token = await getAccessToken();
      console.log(`new access token: ${token.accessToken}`);
      return fn();
    } catch (err: any) {
      TokenService.clear();
      queryClient.setQueryData(['userProfile'], null);
      return null;
    }
  }
};
