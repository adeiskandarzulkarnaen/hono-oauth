/* istanbul ignore file */
abstract class AuthenticationRepository {
  abstract addToken(token: string): Promise<void>;
  abstract checkTokenAvailability(token: string): Promise<void>;
  abstract deleteToken(token: string): Promise<void>;
};

export default AuthenticationRepository;
