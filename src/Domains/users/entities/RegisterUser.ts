
export type eRegisterUser = {
  username: string,
  password: string,
  fullname: string,
};

export class RegisterUser {
  public username: string;
  public password: string;
  public fullname: string;

  constructor(payload: eRegisterUser) {
    this.verifyPayload(payload);

    const { username, password, fullname } = payload;

    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  private verifyPayload(payload: eRegisterUser): void {
    const { username, password, fullname } = payload;

    // Check for missing properties
    if (!username || !password || !fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // Check for incorrect data types
    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    // Check username length
    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    // Check username format (alphanumeric and underscores only)
    if (!/^[\w]+$/.test(username)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }
  }
}

export default RegisterUser;
