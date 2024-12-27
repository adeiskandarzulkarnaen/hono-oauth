
export type eUserLogin = {
  username: string,
  password: string,
};

export class UserLogin {
  public username: string;
  public password: string;
  constructor(payload: eUserLogin){
    this.verifyPayload(payload);

    const { username, password } = payload;
    this.username = username;
    this.password = password;
  }

  private verifyPayload(payload: eUserLogin): void {
    const { username, password } = payload;

    if (!username || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};

export default UserLogin;
