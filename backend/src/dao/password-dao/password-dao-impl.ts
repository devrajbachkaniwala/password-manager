import { desc, eq } from 'drizzle-orm';
import { db, passwords } from '../../drizzle';
import { DaoError } from '../errors';
import {
  IPasswordDao,
  TCreatePassword,
  TUpdatePassword
} from './password-dao.interface';
import {
  FactoryPasswordEntityTo,
  PasswordEntityTo
} from './password-entity-to';

export class PasswordDaoImpl implements IPasswordDao {
  async create(data: TCreatePassword): Promise<PasswordEntityTo> {
    try {
      const password = await db
        .insert(passwords)
        .values({
          title: data.title,
          url: data.url,
          username: data.username,
          password: data.password,
          iv: data.iv,
          authTag: data.authTag,
          userId: data.userId
        })
        .returning();

      return FactoryPasswordEntityTo.create(password[0]);
    } catch (err: any) {
      throw new DaoError('Failed to create a password');
    }
  }

  async findOneById(id: string): Promise<PasswordEntityTo> {
    try {
      const password = await db.query.passwords.findFirst({
        where: eq(passwords.id, id)
      });

      if (!password) {
        return null;
      }

      return FactoryPasswordEntityTo.create(password);
    } catch (err: any) {
      throw new DaoError('Failed to get a password by id');
    }
  }

  async findAll(): Promise<PasswordEntityTo[]> {
    try {
      const passwordList = await db.select().from(passwords);

      return passwordList.map(FactoryPasswordEntityTo.create);
    } catch (err: any) {
      throw new DaoError('Failed to get passwords');
    }
  }

  async findAllByUserId(userId: string): Promise<PasswordEntityTo[]> {
    try {
      const passwordList = await db
        .select()
        .from(passwords)
        .where(eq(passwords.userId, userId))
        .orderBy(desc(passwords.createdAt));

      return passwordList.map(FactoryPasswordEntityTo.create);
    } catch (err: any) {
      throw new DaoError('Failed to get passwords by userId');
    }
  }

  async update(id: string, data: TUpdatePassword): Promise<PasswordEntityTo> {
    try {
      const password = await db
        .update(passwords)
        .set({
          title: data.title,
          url: data.url,
          username: data.username,
          password: data.password,
          iv: data.iv,
          authTag: data.authTag,
          modifiedAt: new Date()
        })
        .where(eq(passwords.id, id))
        .returning();

      return FactoryPasswordEntityTo.create(password[0]);
    } catch (err: any) {
      throw new DaoError('Failed to update a password');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const deletedPassword = await db
        .delete(passwords)
        .where(eq(passwords.id, id));

      return true;
    } catch (err: any) {
      throw new DaoError('Failed to remove a password');
    }
  }
}
