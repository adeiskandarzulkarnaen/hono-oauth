import AuthenticationRepository from '@domains/authentications/AuthenticationRepository';
import { LoginUserUseCaseDevedencies } from './LoginUserUseCase';


export interface LogoutUserUseCaseDevedencies {
  authenticationRespository: AuthenticationRepository
}


export class LogoutUserUseCase {
  private readonly authenticationRespository: AuthenticationRepository;
  constructor({ authenticationRepository }: LoginUserUseCaseDevedencies) {
    this.authenticationRespository = authenticationRepository;
  }

  public async execute(useCasePayload: Record<string, unknown>): Promise<void> {
    this.validatePayload(useCasePayload);

    const { refreshToken } = useCasePayload as Record<string, string>;
    await this.authenticationRespository.checkTokenAvailability(refreshToken);
    await this.authenticationRespository.deleteToken(refreshToken);
  }

  private validatePayload(payload: Record<string, unknown>): void {
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
