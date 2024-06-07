import { IPasswordDao } from '../password-dao';
import { IUserDao } from '../user';
import { IUserTokenDao } from '../user-token';

export interface IDaoFactory {
  getUserDao(): IUserDao;
  getUserTokenDao(): IUserTokenDao;
  getPasswordDao(): IPasswordDao;
}
