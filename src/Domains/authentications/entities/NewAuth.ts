
export type eNewAuth = {
  accessToken: string,
  refreshToken: string,
}

export class NewAuth {
  public accessToken: string;
  public refreshToken: string;
  constructor(payload: Record<string, unknown>) {
    this.verifyPayload(payload);

    const { accessToken, refreshToken } = payload as eNewAuth;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  private verifyPayload(payload: Record<string, unknown>): void {
    const { accessToken, refreshToken } = payload;

    if (!accessToken || !refreshToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};

export default NewAuth;

