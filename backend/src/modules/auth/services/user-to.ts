import { UserEntityTo } from '../../../dao';

export class UserTo {
  id: string;
  email: string;
  createdAt: Date;
  modifiedAt: Date;
}

export class FactoryUserTo {
  static createFromUserEntityTo(userEntity: UserEntityTo): UserTo {
    const userTo = new UserTo();
    userTo.id = userEntity.id;
    userTo.email = userEntity.email;
    userTo.createdAt = userEntity.createdAt;
    userTo.modifiedAt = userEntity.modifiedAt;

    return userTo;
  }
}
