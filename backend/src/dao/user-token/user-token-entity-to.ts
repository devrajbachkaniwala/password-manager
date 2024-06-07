export class UserTokenEntityTo {
  id: string;
  accessJti: string;
  accessJtiExpiresAt: Date;
  refreshJti: string;
  refreshJtiExpiresAt: Date;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
}

export type TUserToken = {
  id: string;
  accessJti: string;
  accessJtiExpiresAt: Date;
  refreshJti: string;
  refreshJtiExpiresAt: Date;
  createdAt: Date;
  modifiedAt: Date;
  userId: string;
};

export class FactoryUserTokenEntityTo {
  static create(userToken: TUserToken): UserTokenEntityTo {
    const userTokenTo = new UserTokenEntityTo();
    userTokenTo.id = userToken.id;
    userTokenTo.accessJti = userToken.accessJti;
    userTokenTo.accessJtiExpiresAt = userToken.accessJtiExpiresAt;
    userTokenTo.refreshJti = userToken.refreshJti;
    userTokenTo.refreshJtiExpiresAt = userToken.refreshJtiExpiresAt;
    userTokenTo.createdAt = userToken.createdAt;
    userTokenTo.modifiedAt = userToken.modifiedAt;
    userTokenTo.userId = userToken.userId;

    return userTokenTo;
  }
}
