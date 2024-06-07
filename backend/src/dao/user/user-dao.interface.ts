import { UserEntityTo } from './user-entity-to';

export interface IUserDao {
  create(email: string, password: string): Promise<UserEntityTo>;
  findOneById(id: string): Promise<UserEntityTo>;
  findOneByEmail(email: string): Promise<UserEntityTo>;
  findAll(): Promise<UserEntityTo[]>;
  update(id: string, data: Partial<UserEntityTo>): Promise<UserEntityTo>;
  remove(id: string): Promise<boolean>;
}
