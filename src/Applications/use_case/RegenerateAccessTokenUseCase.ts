import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';
import AuthenticationRepository from '@domains/authentications/AuthenticationRepository';


export interface RegenerateAccessTokenUseCaseDevedencies {
  tokenManager: AuthenticationTokenManager,
  authenticationRepository: AuthenticationRepository,
}


export class RegenerateAccessTokenUseCase {
  private readonly authenticationRepository: AuthenticationRepository;
  private readonly tokenManager: AuthenticationTokenManager;
  constructor({ tokenManager, authenticationRepository }: RegenerateAccessTokenUseCaseDevedencies) {
    this.tokenManager = tokenManager;
    this.authenticationRepository = authenticationRepository;
  }

  public async execute(payload: { refreshToken: string }): Promise<string> {
    this.validatePayload(payload);

    const { refreshToken } = payload;
    const { username } = await this.tokenManager.verifyRefreshToken(refreshToken);
    await this.authenticationRepository.checkTokenAvailability(refreshToken);
    return this.tokenManager.createAccessToken({ username });
  };

  private validatePayload(payload: { refreshToken: string }): void {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error('REGENERATE_ACCESS_TOKEN_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REGENERATE_ACCESS_TOKEN_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};

export default RegenerateAccessTokenUseCase;
