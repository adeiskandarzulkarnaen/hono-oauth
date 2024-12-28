import { password } from 'bun';
import AuthenticationError from '@commons/exceptions/AuthenticationError';
import PasswordHash from '@applications/security/PasswordHash';


class BunBCryptPasswordHash extends PasswordHash {
  private readonly password;
  private readonly saltRound: number;
  constructor(saltRound: number = 10) {
    super();
    this.password = password;
    this.saltRound = saltRound;
  }

  public async hash(plain: string): Promise<string> {
    const hashedPassword = await this.password.hash(plain, {
      algorithm: 'bcrypt',
      cost: this.saltRound,
    });
    return hashedPassword;
  }

  public async comparePassword(plain: string, hashed: string): Promise<void> {
    try {
      const match: boolean = await this.password.verify(plain, hashed, 'bcrypt');
      if (!match) throw new Error();
    } catch {
      throw new AuthenticationError('credendensial tidak sesuai');
    }
  }
};

export default BunBCryptPasswordHash;
