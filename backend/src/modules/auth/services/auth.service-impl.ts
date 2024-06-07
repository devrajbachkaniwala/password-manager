import { sign } from 'jsonwebtoken';
import { IUserDao, IUserTokenDao, daoFactory } from '../../../dao';
import { TLoginUserDto, TRegisterUserDto } from '../dto';
import { AuthError, AuthErrorFactory } from '../errors';
import { IAuthService } from './auth-service.interface';
import { FactoryTokensTo, TokensTo } from './tokens-to';
import { FactoryUserTo, UserTo } from './user-to';
import { Env } from '../../../utils';
import { compareSync, hashSync } from 'bcrypt';
import { FactoryTokenTo, TokenTo } from './token-to';

export class AuthServiceImpl implements IAuthService {
  private userDao: IUserDao;
  private userTokenDao: IUserTokenDao;

  constructor() {
    this.userDao = daoFactory.getUserDao();
    this.userTokenDao = daoFactory.getUserTokenDao();
  }

  async register(data: TRegisterUserDto): Promise<UserTo> {
    try {
      const userExist = await this.userDao.findOneByEmail(data.email);

      if (userExist) {
        throw new AuthError('User email already exist');
      }

      const hashPassword = hashSync(data.password, 10);

      const user = await this.userDao.create(data.email, hashPassword);

      return FactoryUserTo.createFromUserEntityTo(user);
    } catch (err: any) {
      console.log(err);
      throw AuthErrorFactory.create(err, 'Failed to register a user');
    }
  }

  async login(data: TLoginUserDto): Promise<TokensTo> {
    try {
      const userExist = await this.userDao.findOneByEmail(data.email);

      if (!userExist) {
        throw new AuthError('User does not exist', 404);
      }

      const isPasswordValid = compareSync(data.password, userExist.password);

      if (!isPasswordValid) {
        throw new AuthError('Invalid password', 400);
      }

      const userTo = FactoryUserTo.createFromUserEntityTo(userExist);

      const accessJti = crypto.randomUUID();
      const accessJtiExpiresAt = 60 * 60 * 2;
      const refreshJti = crypto.randomUUID();
      const refreshJtiExpiresAt = 60 * 60 * 24;

      const userToken = await this.userTokenDao.create({
        accessJti,
        accessJtiExpiresAt: new Date(Date.now() + 1000 * accessJtiExpiresAt),
        refreshJti,
        refreshJtiExpiresAt: new Date(Date.now() + 1000 * refreshJtiExpiresAt),
        userId: userTo.id
      });

      const payload = { user: userTo };

      const accessToken = sign(payload, Env.JWT_ACCESS_SALT, {
        subject: userTo.id,
        jwtid: accessJti,
        expiresIn: accessJtiExpiresAt
      });

      const refreshToken = sign(payload, Env.JWT_REFRESH_SALT, {
        subject: userTo.id,
        jwtid: refreshJti,
        expiresIn: refreshJtiExpiresAt
      });

      return FactoryTokensTo.create({ accessToken, refreshToken });
    } catch (err: any) {
      console.log(err);
      throw AuthErrorFactory.create(err, 'Failed to login a user');
    }
  }

  async token(userTo: UserTo, userTokenId: string): Promise<TokenTo> {
    try {
      const accessJti = crypto.randomUUID();
      const accessJtiExpiresAt = 60 * 60 * 2;

      const updateUserToken = await this.userTokenDao.update(userTokenId, {
        accessJti,
        accessJtiExpiresAt: new Date(Date.now() + 1000 * accessJtiExpiresAt)
      });

      const payload = { user: userTo };

      const accessToken = sign(payload, Env.JWT_ACCESS_SALT, {
        subject: userTo.id,
        jwtid: accessJti,
        expiresIn: accessJtiExpiresAt
      });

      return FactoryTokenTo.create({ accessToken });
    } catch (err: any) {
      throw AuthErrorFactory.create(err, 'Failed to get access token');
    }
  }

  async logout(
    userId: string,
    userTokenId: string,
    allDevices?: boolean
  ): Promise<boolean> {
    try {
      if (allDevices) {
        const userTokens = await this.userTokenDao.updateByUserId(userId, {
          accessJtiExpiresAt: new Date(0),
          refreshJtiExpiresAt: new Date(0)
        });
      } else {
        const updateUserToken = await this.userTokenDao.update(userTokenId, {
          accessJtiExpiresAt: new Date(0),
          refreshJtiExpiresAt: new Date(0)
        });
      }

      return true;
    } catch (err: any) {
      throw AuthErrorFactory.create(err, 'Failed to logout');
    }
  }
}
