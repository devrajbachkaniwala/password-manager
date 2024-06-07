import { eq } from 'drizzle-orm';
import { db, userTokens } from '../../drizzle';
import { DaoError } from '../errors';
import {
  IUserTokenDao,
  TCreateUserTokenDao,
  TUpdateUserTokenDao
} from './user-token-dao.interface';
import {
  FactoryUserTokenEntityTo,
  UserTokenEntityTo
} from './user-token-entity-to';

export class UserTokenDaoImpl implements IUserTokenDao {
  async create(data: TCreateUserTokenDao): Promise<UserTokenEntityTo> {
    try {
      const userToken = await db
        .insert(userTokens)
        .values({
          accessJti: data.accessJti,
          accessJtiExpiresAt: data.accessJtiExpiresAt,
          refreshJti: data.refreshJti,
          refreshJtiExpiresAt: data.refreshJtiExpiresAt,
          userId: data.userId
        })
        .returning();

      return FactoryUserTokenEntityTo.create(userToken[0]);
    } catch (err: any) {
      throw new DaoError('Failed to create a user token');
    }
  }

  async findOneById(id: string): Promise<UserTokenEntityTo> {
    try {
      const userToken = await db.query.userTokens.findFirst({
        where: (userTokens, { eq }) => eq(userTokens.id, id)
      });

      if (!userToken) {
        return null;
      }
      return FactoryUserTokenEntityTo.create(userToken);
    } catch (err: any) {
      throw new DaoError('Failed to get a user token by id');
    }
  }

  async findOneByAccessJti(jti: string): Promise<UserTokenEntityTo> {
    try {
      const userToken = await db.query.userTokens.findFirst({
        where: (userTokens, { eq }) => eq(userTokens.accessJti, jti)
      });

      if (!userToken) {
        return null;
      }
      return FactoryUserTokenEntityTo.create(userToken);
    } catch (err: any) {
      throw new DaoError('Failed to get a user token by access jti');
    }
  }

  async findOneByRefreshJti(jti: string): Promise<UserTokenEntityTo> {
    try {
      const userToken = await db.query.userTokens.findFirst({
        where: (userTokens, { eq }) => eq(userTokens.refreshJti, jti)
      });

      if (!userToken) {
        return null;
      }
      return FactoryUserTokenEntityTo.create(userToken);
    } catch (err: any) {
      throw new DaoError('Failed to get a user token by refresh jti');
    }
  }

  async findAll(): Promise<UserTokenEntityTo[]> {
    try {
      const userTokenList = await db.select().from(userTokens);

      return userTokenList.map(FactoryUserTokenEntityTo.create);
    } catch (err: any) {
      throw new DaoError('Failed to get a user tokens');
    }
  }
  async findAllByUserId(userId: string): Promise<UserTokenEntityTo[]> {
    try {
      const userTokenList = await db.query.userTokens.findMany({
        where: (userTokens, { eq }) => eq(userTokens.userId, userId)
      });

      return userTokenList.map(FactoryUserTokenEntityTo.create);
    } catch (err: any) {
      throw new DaoError('Failed to get a user tokens');
    }
  }

  async update(
    id: string,
    data: TUpdateUserTokenDao
  ): Promise<UserTokenEntityTo> {
    try {
      const userToken = await db
        .update(userTokens)
        .set({
          accessJti: data.accessJti,
          accessJtiExpiresAt: data.accessJtiExpiresAt,
          refreshJti: data.refreshJti,
          refreshJtiExpiresAt: data.refreshJtiExpiresAt,
          modifiedAt: new Date()
        })
        .where(eq(userTokens.id, id))
        .returning();

      return FactoryUserTokenEntityTo.create(userToken[0]);
    } catch (err: any) {
      throw new DaoError('Failed to update a user token');
    }
  }

  async updateByUserId(
    userId: string,
    data: TUpdateUserTokenDao
  ): Promise<UserTokenEntityTo[]> {
    try {
      const userTokenList = await db
        .update(userTokens)
        .set({
          accessJti: data.accessJti,
          accessJtiExpiresAt: data.accessJtiExpiresAt,
          refreshJti: data.refreshJti,
          refreshJtiExpiresAt: data.refreshJtiExpiresAt,
          modifiedAt: new Date()
        })
        .where(eq(userTokens.userId, userId))
        .returning();

      return userTokenList.map(FactoryUserTokenEntityTo.create);
    } catch (err: any) {
      throw new DaoError('Failed to update a user token');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const deletedUserToken = await db
        .delete(userTokens)

        .where(eq(userTokens.id, id));

      return true;
    } catch (err: any) {
      throw new DaoError('Failed to remove a user token');
    }
  }
}
