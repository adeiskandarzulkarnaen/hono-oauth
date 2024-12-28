import { sign, verify } from 'hono/jwt';
import { SignatureAlgorithm } from 'hono/utils/jwt/jwa';
import AuthenticationTokenManager, { TokenPayload } from '@applications/security/AuthenticationTokenManager';
import InvariantError from '@commons/exceptions/InvariantError';


class HonoJwtTokenManager extends AuthenticationTokenManager {
  private readonly honoJwt;
  private readonly signAlgoritm: SignatureAlgorithm;
  constructor() {
    super();
    this.honoJwt = { sign, verify };
    this.signAlgoritm = 'HS256';
  }

  public async createAccessToken(payload: TokenPayload): Promise<string> {
    const accessToken = await this.honoJwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_AGE!),
      },
      process.env.ACCESS_TOKEN_SECRET_KEY!,
      this.signAlgoritm,
    );
    return accessToken;
  }

  public async createRefreshToken(payload: TokenPayload): Promise<string> {
    const refreshToken = await this.honoJwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.REFRESH_TOKEN_AGE!),
      },
      process.env.REFRESH_TOKEN_SECRET_KEY!,
      this.signAlgoritm,
    );
    return refreshToken;
  }

  public async verifyRefreshToken(token: string): Promise<TokenPayload> {
    try {
      const jwtPayload = await this.honoJwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY!, this.signAlgoritm);
      return jwtPayload as TokenPayload;
    } catch {
      throw new InvariantError('Invalid Token');
    }
  }
};

export default HonoJwtTokenManager;
