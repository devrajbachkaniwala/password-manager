import {
  TCreatePasswordDto,
  TGeneratePasswordQueryDto,
  TUpdatePasswordDto
} from '../dto';
import { PasswordTo } from './password-to';

export interface IPasswordService {
  create(userId: string, data: TCreatePasswordDto): Promise<PasswordTo>;
  findOneByUserId(
    userId: string,
    passwordId: string,
    includePassword?: boolean
  ): Promise<PasswordTo>;
  findAllByUserId(userId: string): Promise<PasswordTo[]>;
  update(
    userId: string,
    passwordId: string,
    data: TUpdatePasswordDto
  ): Promise<PasswordTo>;
  remove(userId: string, passwordId: string): Promise<boolean>;
  generatePassword(opts: TGeneratePasswordQueryDto): string;
}
