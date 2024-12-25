
abstract class AuthenticationTokenManager {
  abstract createAccessToken(payload: Record<string, unknown>): Promise<string>;
  abstract createRefreshToken(payload: Record<string, unknown>): Promise<string>;
  abstract verifyRefreshToken(token: string): Promise<Record<string, unknown>>;
};

export default AuthenticationTokenManager;
