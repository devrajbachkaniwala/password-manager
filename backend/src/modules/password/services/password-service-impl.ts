import { IPasswordDao, TUpdatePassword, daoFactory } from '../../../dao';
import { Encrypt } from '../../../utils/encrypt';
import {
  EIncludeOpts,
  TCreatePasswordDto,
  TGeneratePasswordQueryDto,
  TUpdatePasswordDto
} from '../dto';
import { PasswordError, PasswordErrorFactory } from '../errors';
import { IPasswordService } from './password-service.interface';
import { FactoryPasswordTo, PasswordTo } from './password-to';

export class PasswordServiceImpl implements IPasswordService {
  private passwordDao: IPasswordDao;

  constructor() {
    this.passwordDao = daoFactory.getPasswordDao();
  }

  async create(userId: string, data: TCreatePasswordDto): Promise<PasswordTo> {
    try {
      const encryptedPassword = Encrypt.encrypt(data.password);

      const password = await this.passwordDao.create({
        title: data.title,
        url: data.url,
        username: data.username,
        password: encryptedPassword.encryptedValue,
        iv: encryptedPassword.iv,
        authTag: encryptedPassword.authTag,
        userId
      });

      return FactoryPasswordTo.createFromPasswordEntityTo(password);
    } catch (err: any) {
      console.log(err);
      throw PasswordErrorFactory.create(err, 'Failed to create a password');
    }
  }

  async findOneByUserId(
    userId: string,
    passwordId: string,
    includePassword?: boolean
  ): Promise<PasswordTo> {
    try {
      const password = await this.passwordDao.findOneById(passwordId);

      if (!password) {
        return null;
      }

      if (password.userId !== userId) {
        throw new PasswordError('Password does not belong to this user', 403);
      }

      if (includePassword) {
        const decryptedPassword = Encrypt.decrypt({
          encryptedValue: password.password,
          iv: password.iv,
          authTag: password.authTag
        });
        password.password = decryptedPassword;
      }

      return FactoryPasswordTo.createFromPasswordEntityTo(
        password,
        includePassword
      );
    } catch (err: any) {
      console.log(err);
      throw PasswordErrorFactory.create(err, 'Failed to get a password by id');
    }
  }

  async findAllByUserId(userId: string): Promise<PasswordTo[]> {
    try {
      const passwords = await this.passwordDao.findAllByUserId(userId);

      return passwords.map((password) =>
        FactoryPasswordTo.createFromPasswordEntityTo(password)
      );
    } catch (err: any) {
      console.log(err);
      throw PasswordErrorFactory.create(
        err,
        'Failed to get passwords by user id'
      );
    }
  }

  async update(
    userId: string,
    passwordId: string,
    data: TUpdatePasswordDto
  ): Promise<PasswordTo> {
    try {
      const passwordExist = await this.passwordDao.findOneById(passwordId);

      if (!passwordExist) {
        throw new PasswordError('Password does not exist', 404);
      }

      if (passwordExist.userId !== userId) {
        throw new PasswordError('Password does not belong to this user', 403);
      }

      const value: TUpdatePassword = {
        title: data.title,
        url: data.url,
        username: data.username
      };

      if (data.password) {
        const encryptedPassword = Encrypt.encrypt(data.password);
        value.password = encryptedPassword.encryptedValue;
        value.iv = encryptedPassword.iv;
        value.authTag = encryptedPassword.authTag;
      }

      const updatePassword = await this.passwordDao.update(
        passwordExist.id,
        value
      );

      return FactoryPasswordTo.createFromPasswordEntityTo(updatePassword);
    } catch (err: any) {
      console.log(err);
      throw PasswordErrorFactory.create(err, 'Failed to update a password');
    }
  }

  async remove(userId: string, passwordId: string): Promise<boolean> {
    try {
      const passwordExist = await this.passwordDao.findOneById(passwordId);

      if (!passwordExist) {
        throw new PasswordError('Password does not exist', 404);
      }

      if (passwordExist.userId !== userId) {
        throw new PasswordError('Password does not belong to this user', 403);
      }

      const deletedPassword = await this.passwordDao.remove(passwordExist.id);

      return true;
    } catch (err: any) {
      console.log(err);
      throw PasswordErrorFactory.create(err, 'Failed to remove a password');
    }
  }

  generatePassword(opts: TGeneratePasswordQueryDto): string {
    let password = '';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '1234567890';
    const specialChar = '~!@#$%^&*()-_+=[{}]|;:,<>./?';

    const len = opts.passwordLen ?? 16;

    let characters = '';

    if (opts.include?.length) {
      opts.include.forEach((include) => {
        if (include === EIncludeOpts.Values.lowerCase) {
          characters += lowerCase;
        }
        if (include === EIncludeOpts.Values.upperCase) {
          characters += upperCase;
        }
        if (include === EIncludeOpts.Values.digits) {
          characters += digits;
        }
        if (include === EIncludeOpts.Values.specialChar) {
          characters += specialChar;
        }
      });
    } else {
      characters += lowerCase;
      characters += upperCase;
      characters += digits;
      characters += specialChar;
    }

    const charactersLen = characters.length;

    for (let i = 0; i < len; i++) {
      const idx = Math.floor(Math.random() * 100) % charactersLen;
      password += characters[idx];
    }

    return password;
  }
}
