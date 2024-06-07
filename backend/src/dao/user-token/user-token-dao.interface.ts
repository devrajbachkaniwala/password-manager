import { UserTokenEntityTo } from './user-token-entity-to';

export type TCreateUserTokenDao = {
  accessJti: string;
  accessJtiExpiresAt: Date;
  refreshJti: string;
  refreshJtiExpiresAt: Date;
  userId: string;
};

export type TUpdateUserTokenDao = Partial<Omit<TCreateUserTokenDao, 'userId'>>;

export interface IUserTokenDao {
  create(data: TCreateUserTokenDao): Promise<UserTokenEntityTo>;
  findOneById(id: string): Promise<UserTokenEntityTo>;
  findOneByAccessJti(jti: string): Promise<UserTokenEntityTo>;
  findOneByRefreshJti(jti: string): Promise<UserTokenEntityTo>;
  findAll(): Promise<UserTokenEntityTo[]>;
  findAllByUserId(userId: string): Promise<UserTokenEntityTo[]>;
  update(id: string, data: TUpdateUserTokenDao): Promise<UserTokenEntityTo>;
  updateByUserId(
    userId: string,
    data: TUpdateUserTokenDao
  ): Promise<UserTokenEntityTo[]>;
  remove(id: string): Promise<boolean>;
}
