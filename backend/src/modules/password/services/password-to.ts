import { PasswordEntityTo } from '../../../dao';

export class PasswordTo {
  id: string;
  title: string;
  url: string;
  username: string;
  password: string;
  // iv: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
}

export class FactoryPasswordTo {
  static createFromPasswordEntityTo(
    passwordEntityTo: PasswordEntityTo,
    includePassword?: boolean
  ): PasswordTo {
    const passwordTo = new PasswordTo();
    passwordTo.id = passwordEntityTo.id;
    passwordTo.title = passwordEntityTo.title;
    passwordTo.url = passwordEntityTo.url;
    passwordTo.username = passwordEntityTo.username;

    if (includePassword) {
      passwordTo.password = passwordEntityTo.password;
    }

    // passwordTo.iv = passwordEntityTo.iv;
    passwordTo.createdAt = passwordEntityTo.createdAt;
    passwordTo.modifiedAt = passwordEntityTo.modifiedAt;
    passwordTo.userId = passwordEntityTo.userId;

    return passwordTo;
  }
}
