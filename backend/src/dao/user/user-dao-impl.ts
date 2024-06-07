import { eq } from 'drizzle-orm';
import { db, users } from '../../drizzle';
import { DaoError } from '../errors';
import { IUserDao } from './user-dao.interface';
import { FactoryUserEntityTo, TUser, UserEntityTo } from './user-entity-to';

export class UserDaoImpl implements IUserDao {
  async create(email: string, password: string): Promise<UserEntityTo> {
    try {
      const newUser = await db
        .insert(users)
        .values({
          email,
          password
        })
        .returning();

      return FactoryUserEntityTo.create(newUser[0]);
    } catch (err: any) {
      console.log(err);
      throw new DaoError('Failed to create a user');
    }
  }

  async findOneById(id: string): Promise<UserEntityTo> {
    try {
      const userData = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id)
      });

      if (!userData) {
        return null;
      }

      return FactoryUserEntityTo.create(userData);
    } catch (err: any) {
      throw new DaoError('Failed to get a user by id');
    }
  }

  async findOneByEmail(email: string): Promise<UserEntityTo> {
    try {
      const userData = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)
      });

      if (!userData) {
        return null;
      }

      return FactoryUserEntityTo.create(userData);
    } catch (err: any) {
      throw new DaoError('Failed to get a user by email');
    }
  }

  async findAll(): Promise<UserEntityTo[]> {
    try {
      const fetchedUsers = await db.select().from(users);

      return fetchedUsers.map(FactoryUserEntityTo.create);
    } catch (err: any) {
      throw new DaoError('Failed to get users');
    }
  }

  async update(id: string, data: Partial<UserEntityTo>): Promise<UserEntityTo> {
    try {
      const updatedUser = await db
        .update(users)
        .set({
          password: data.password,
          modifiedAt: new Date()
        })
        .where(eq(users.id, id))
        .returning();

      return FactoryUserEntityTo.create(updatedUser[0]);
    } catch (err: any) {
      throw new DaoError('Failed to update a user');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await db.delete(users).where(eq(users.id, id));

      return true;
    } catch (err: any) {
      throw new DaoError('Failed to remove a user');
    }
  }
}
