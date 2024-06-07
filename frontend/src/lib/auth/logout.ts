import { AuthService } from '@/services/auth/auth-service';
import { TokenService } from '@/services/token-service';

export const logout = async () => {
  const res = await AuthService.logout();
  TokenService.clear();
  return res;
};
