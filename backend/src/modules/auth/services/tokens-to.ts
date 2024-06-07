export class TokensTo {
  accessToken: string;
  refreshToken: string;
}

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export class FactoryTokensTo {
  static create(tokens: TTokens): TokensTo {
    const tokensTo = new TokensTo();
    tokensTo.accessToken = tokens.accessToken;
    tokensTo.refreshToken = tokens.refreshToken;
    return tokensTo;
  }
}
