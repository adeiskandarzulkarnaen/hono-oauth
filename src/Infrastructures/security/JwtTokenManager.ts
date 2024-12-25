import { sign, verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';
import InvariantError from '@commons/exceptions/InvariantError';


class HonoJwtTokenManager extends AuthenticationTokenManager {
  private readonly honoJwt;
  constructor() {
    super();
    this.honoJwt = { sign, verify };
  }

  public async createAccessToken(payload: Record<string, string>): Promise<string> {
    const accessToken = await this.honoJwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_AGE!),
      },
      process.env.ACCESS_TOKEN_SECRET_KEY!,
    );
    return accessToken;
  }

  public async createRefreshToken(payload: Record<string, string>): Promise<string> {
    const refreshToken = await this.honoJwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.REFRESH_TOKEN_AGE!),
      },
      process.env.REFRESH_TOKEN_SECRET_KEY!,
    );
    return refreshToken;
  }

  public async verifyRefreshToken(token: string): Promise<JWTPayload> {
    try {
      const jwtPayload = await this.honoJwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY!);
      return jwtPayload;
    } catch {
      throw new InvariantError('Invalid Token');
    }
  }
};

export default HonoJwtTokenManager;
