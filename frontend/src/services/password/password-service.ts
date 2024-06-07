import { TCreatePasswordSchema } from '@/app/(dashboard)/_components/_dialogs/_schema/create-password';
import { IPassword } from './interfaces/password';
import { axiosInstance } from '@/lib/axios';
import { IResData } from '../interfaces/res-data';
import { ServiceErrorFactory } from '../errors/service-error';
import { TUpdatePasswordSchema } from '@/app/(dashboard)/_components/_dialogs/_schema/update-password';
import { TGeneratePasswordSchema } from '@/app/(dashboard)/_components/_dialogs/_schema/generate-password';

export class PasswordService {
  static async create(data: TCreatePasswordSchema): Promise<IPassword> {
    try {
      return (await axiosInstance.post<IResData<IPassword>>(`/passwords`, data))
        .data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async update(
    id: string,
    data: TUpdatePasswordSchema
  ): Promise<IPassword> {
    try {
      return (
        await axiosInstance.patch<IResData<IPassword>>(`/passwords/${id}`, data)
      ).data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async delete(id: string): Promise<{ message: string }> {
    try {
      return (
        await axiosInstance.delete<IResData<{ message: string }>>(
          `/passwords/${id}`
        )
      ).data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async findAll(): Promise<IPassword[]> {
    try {
      return (await axiosInstance.get<IResData<IPassword[]>>(`/passwords`)).data
        .data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async generate(
    data: TGeneratePasswordSchema
  ): Promise<{ password: string }> {
    try {
      let values = { ...data };
      delete values.passwordLen;
      const include = Object.entries(values).reduce((prev, [key, value]) => {
        if (value) {
          prev += key + ',';
        }
        return prev;
      }, '');

      const queryParams = {
        passwordLen: data.passwordLen,
        include
      };

      return (
        await axiosInstance.get<IResData<{ password: string }>>(
          `/generate-password`,
          {
            params: queryParams
          }
        )
      ).data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }

  static async findOne(
    id: string,
    includePassword?: boolean
  ): Promise<IPassword> {
    try {
      return (
        await axiosInstance.get<IResData<IPassword>>(`/passwords/${id}`, {
          params: {
            include: includePassword ? 'password' : ''
          }
        })
      ).data.data;
    } catch (err: any) {
      throw ServiceErrorFactory.create(err);
    }
  }
}
