export class TokenTo {
  accessToken: string;
}

export type TToken = {
  accessToken: string;
};

export class FactoryTokenTo {
  static create(token: TToken): TokenTo {
    const tokenTo = new TokenTo();
    tokenTo.accessToken = token.accessToken;
    return tokenTo;
  }
}
