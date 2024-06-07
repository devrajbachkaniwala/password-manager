import { UserTo } from '../../auth';

export interface IAccountService {
  getUserProfile(userId: string): Promise<UserTo>;
}
