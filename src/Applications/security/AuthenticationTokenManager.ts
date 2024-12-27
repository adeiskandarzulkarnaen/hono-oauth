/* istanbul ignore file */
export type TokenPayload = {
  [key: string]: unknown;
  username: string;
  exp?: number;
};

export abstract class AuthenticationTokenManager {
  abstract createAccessToken(tokenPayload: TokenPayload): Promise<string>;
  abstract createRefreshToken(tokenPayload: TokenPayload): Promise<string>;
  abstract verifyRefreshToken(refreshToken: string): Promise<TokenPayload>;
};

export default AuthenticationTokenManager;
