import { TLoginUserSchema } from '@/app/(auth)/login/_schema/login-user';
import { AuthService } from '@/services/auth/auth-service';
import { LocalStorage } from '@/services/local-storage';
import { SessionStorage } from '@/services/session-storage';
import { TokenService } from '@/services/token-service';

export const login = async (data: TLoginUserSchema) => {
  const tokens = await AuthService.login(data);
  TokenService.setRefreshToken(tokens.refreshToken);
  TokenService.setAccessToken(tokens.accessToken);
  return tokens;
};
