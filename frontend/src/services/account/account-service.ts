import { axiosInstance } from '@/lib/axios';
import { ServiceErrorFactory } from '../errors/service-error';
import { IResData } from '../interfaces/res-data';
import { IUser } from '../interfaces/user';

export class AccountService {
  static async getProfile() {
    try {
      return (await axiosInstance.get<IResData<IUser>>('/account/profile')).data
        .data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }
}
