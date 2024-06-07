import { PasswordEntityTo } from './password-entity-to';

export type TCreatePassword = {
  title: string;
  url?: string;
  username: string;
  password: string;
  iv: string;
  authTag: string;
  userId: string;
};

export type TUpdatePassword = Partial<Omit<TCreatePassword, 'userId'>>;

export interface IPasswordDao {
  create(data: TCreatePassword): Promise<PasswordEntityTo>;
  findOneById(id: string): Promise<PasswordEntityTo>;
  findAll(): Promise<PasswordEntityTo[]>;
  findAllByUserId(userId: string): Promise<PasswordEntityTo[]>;
  update(id: string, data: TUpdatePassword): Promise<PasswordEntityTo>;
  remove(id: string): Promise<boolean>;
}
