import { UserTokenEntityTo } from '../../../dao';

export class UserTokenTo {
  id: string;
  accessJti: string;
  accessJtiExpiresAt: Date;
  refreshJti: string;
  refreshJtiExpiresAt: Date;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
}

export class FactoryUserTokenTo {
  static createFromUserTokenEntityTo(
    userTokenEntityTo: UserTokenEntityTo
  ): UserTokenTo {
    const userTokenTo = new UserTokenTo();
    userTokenTo.id = userTokenEntityTo.id;
    userTokenTo.accessJti = userTokenEntityTo.accessJti;
    userTokenTo.accessJtiExpiresAt = userTokenEntityTo.accessJtiExpiresAt;
    userTokenTo.refreshJti = userTokenEntityTo.refreshJti;
    userTokenTo.refreshJtiExpiresAt = userTokenEntityTo.refreshJtiExpiresAt;
    userTokenTo.createdAt = userTokenEntityTo.createdAt;
    userTokenTo.modifiedAt = userTokenEntityTo.modifiedAt;
    userTokenTo.userId = userTokenEntityTo.userId;

    return userTokenTo;
  }
}
