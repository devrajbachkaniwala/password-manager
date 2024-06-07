import { IPasswordDao, PasswordDaoImpl } from '../password-dao';
import { IUserDao, UserDaoImpl } from '../user';
import { IUserTokenDao, UserTokenDaoImpl } from '../user-token';
import { IDaoFactory } from './dao-factory.interface';

class DaoFactoryImpl implements IDaoFactory {
  private userDao: IUserDao;
  private userTokenDao: IUserTokenDao;
  private passwordDao: IPasswordDao;

  constructor() {
    this.userDao = new UserDaoImpl();
    this.userTokenDao = new UserTokenDaoImpl();
    this.passwordDao = new PasswordDaoImpl();
  }

  getUserDao(): IUserDao {
    return this.userDao;
  }

  getUserTokenDao(): IUserTokenDao {
    return this.userTokenDao;
  }

  getPasswordDao(): IPasswordDao {
    return this.passwordDao;
  }
}

export const daoFactory: IDaoFactory = new DaoFactoryImpl();
