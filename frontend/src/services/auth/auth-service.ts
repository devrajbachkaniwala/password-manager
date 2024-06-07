import { TLoginUserSchema } from '@/app/(auth)/login/_schema/login-user';
import { TRegisterUserSchema } from '@/app/(auth)/register/_schema/register-user';
import { IResData } from '../interfaces/res-data';
import { ServiceErrorFactory } from '../errors/service-error';
import { ITokens } from './interfaces/tokens';
import { IUser } from '../interfaces/user';
import axios from 'axios';
import { IToken } from './interfaces/token';
import { TokenService } from '../token-service';
import { axiosInstance } from '@/lib/axios';
import { EnvService } from '../env-service';

export class AuthService {
  static async register(user: TRegisterUserSchema) {
    try {
      return (
        await axios.post<IResData<IUser>>(
          `${EnvService.baseUrl}/auth/register`,
          user
        )
      ).data.data;
    } catch (err) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async login(userCredentials: TLoginUserSchema) {
    try {
      return (
        await axios.post<IResData<ITokens>>(
          `${EnvService.baseUrl}/auth/login`,
          userCredentials
        )
      ).data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async token() {
    try {
      return (
        await axios.post<IResData<IToken>>(
          `${EnvService.baseUrl}/auth/token`,
          null,
          {
            headers: {
              Authorization: `Bearer ${TokenService.getRefreshToken()}`
            }
          }
        )
      ).data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async logout() {
    try {
      return (
        await axiosInstance.post<IResData<{ message: string }>>(
          `/auth/logout`,
          null
        )
      ).data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }
}
