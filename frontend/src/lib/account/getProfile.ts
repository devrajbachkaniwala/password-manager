import { AccountService } from '@/services/account/account-service';
import { TokenService } from '@/services/token-service';

export const getProfile = async () => {
  if (!TokenService.getAccessToken()) {
    throw new Error('Access Token not found');
  }
  return AccountService.getProfile();
};
