import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { Env } from './env';

export interface IEncryptedData {
  encryptedValue: string;
  iv: string;
  authTag: string;
}

export class Encrypt {
  static encrypt(data: string): IEncryptedData {
    const iv = randomBytes(16).toString('hex');
    const cipher = createCipheriv('aes-256-gcm', Env.SECRET_SALT, iv);
    let encryptedValue = cipher.update(data, 'utf-8', 'hex');
    encryptedValue += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return { encryptedValue, iv, authTag };
  }

  static decrypt(encryptedData: IEncryptedData): string {
    const decipher = createDecipheriv(
      'aes-256-gcm',
      Env.SECRET_SALT,
      encryptedData.iv
    );
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    let decryptedValue = decipher.update(
      encryptedData.encryptedValue,
      'hex',
      'utf-8'
    );
    decryptedValue += decipher.final('utf-8');

    return decryptedValue;
  }
}
