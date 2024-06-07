export class UserEntityTo {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  modifiedAt: Date;
}

export type TUser = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  modifiedAt: Date;
};

export class FactoryUserEntityTo {
  static create(user: TUser): UserEntityTo {
    const userTo = new UserEntityTo();
    userTo.id = user.id;
    userTo.email = user.email;
    userTo.password = user.password;
    userTo.createdAt = user.createdAt;
    userTo.modifiedAt = user.modifiedAt;

    return userTo;
  }
}
