import { AuthService } from '@/services/auth/auth-service';
import { TokenService } from '@/services/token-service';

export const getAccessToken = async () => {
  if (!TokenService.getRefreshToken()) {
    throw new Error('Refresh token not available');
  }
  const data = await AuthService.token();
  TokenService.setAccessToken(data.accessToken);
  return data;
};
