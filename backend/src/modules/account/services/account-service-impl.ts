import { IUserDao, daoFactory } from '../../../dao';
import { FactoryUserTo, UserTo } from '../../auth';
import { AccountErrorFactory } from '../errors';
import { IAccountService } from './account-service.interface';

export class AccountServiceImpl implements IAccountService {
  private userDao: IUserDao;

  constructor() {
    this.userDao = daoFactory.getUserDao();
  }

  async getUserProfile(userId: string): Promise<UserTo> {
    try {
      const userEntityTo = await this.userDao.findOneById(userId);

      if (!userEntityTo) {
        return null;
      }

      return FactoryUserTo.createFromUserEntityTo(userEntityTo);
    } catch (err: any) {
      throw AccountErrorFactory.create(err, 'Failed to get user profile');
    }
  }
}
