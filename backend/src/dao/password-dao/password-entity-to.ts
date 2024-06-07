export class PasswordEntityTo {
  id: string;
  title: string;
  url: string;
  username: string;
  password: string;
  iv: string;
  authTag: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
}

export type TPassword = {
  id: string;
  title: string;
  url: string;
  username: string;
  password: string;
  iv: string;
  authTag: string;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
};

export class FactoryPasswordEntityTo {
  static create(password: TPassword): PasswordEntityTo {
    const passwordTo = new PasswordEntityTo();
    passwordTo.id = password.id;
    passwordTo.title = password.title;
    passwordTo.url = password.url;
    passwordTo.username = password.username;
    passwordTo.password = password.password;
    passwordTo.iv = password.iv;
    passwordTo.authTag = password.authTag;
    passwordTo.createdAt = password.createdAt;
    passwordTo.modifiedAt = password.modifiedAt;
    passwordTo.userId = password.userId;

    return passwordTo;
  }
}
