/* istanbul ignore file */
abstract class PasswordHash {
  abstract hash(plain: string): Promise<string>;
  abstract comparePassword(plain: string, hashed: string): Promise<void>;
};

export default PasswordHash;
