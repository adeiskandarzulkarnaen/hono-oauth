import type AuthenticationRepository from '@domains/authentications/AuthenticationRepository';


export interface LogoutUserUseCaseDevedencies {
  authenticationRepository: AuthenticationRepository
}


export class LogoutUserUseCase {
  private readonly authenticationRespository: AuthenticationRepository;
  constructor({ authenticationRepository }: LogoutUserUseCaseDevedencies) {
    this.authenticationRespository = authenticationRepository;
  }

  public async execute(useCasePayload: { refreshToken: string }): Promise<void> {
    this.validatePayload(useCasePayload);

    const { refreshToken } = useCasePayload;
    await this.authenticationRespository.checkTokenAvailability(refreshToken);
    await this.authenticationRespository.deleteToken(refreshToken);
  }

  private validatePayload(payload: { refreshToken: string }): void {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error('LOGOUT_USER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('LOGOUT_USER_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};

export default LogoutUserUseCase;
