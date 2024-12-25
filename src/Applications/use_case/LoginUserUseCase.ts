import UserLogin, { eUserLogin } from '@domains/users/entities/UserLogin';
import NewAuth, { eNewAuth } from '@domains/authentications/entities/NewAuth';
import type UserRepository from '@domains/users/UserRepository';
import type AuthenticationRepository from '@domains/authentications/AuthenticationRepository';
import type PasswordHash from '@applications/security/PasswordHash';
import type AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';


export interface LoginUserUseCaseDevedencies {
  userRepository: UserRepository,
  authenticationRepository: AuthenticationRepository,
  passwordHash: PasswordHash,
  tokenManager: AuthenticationTokenManager,
}

export class LoginUserUseCase {
  private readonly userRepository: UserRepository;
  private readonly authenticationRepository: AuthenticationRepository;
  private readonly passwordHash: PasswordHash;
  private readonly tokenManager:  AuthenticationTokenManager;
  constructor({ userRepository, authenticationRepository, passwordHash, tokenManager }: LoginUserUseCaseDevedencies) {
    this.userRepository = userRepository;
    this.authenticationRepository = authenticationRepository;
    this.passwordHash = passwordHash;
    this.tokenManager = tokenManager;
  }

  public async execute(usecasePayload: eUserLogin): Promise<eNewAuth> {
    const { username, password } = new UserLogin(usecasePayload);

    const hashedPassword = await this.userRepository.getPasswordByUsername(username);
    await this.passwordHash.comparePassword(password, hashedPassword);

    const userId = await this.userRepository.getIdByUsername(username);
    const accessToken = await this.tokenManager.createAccessToken({ userId, username });
    const refreshToken = await this.tokenManager.createRefreshToken({ userId, username });

    const newAuth = new NewAuth({
      accessToken,
      refreshToken
    });

    await this.authenticationRepository.addToken(newAuth.refreshToken);
    return newAuth;
  }
};

export default LoginUserUseCase;
