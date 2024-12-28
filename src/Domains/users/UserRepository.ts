/* c8 ignore file */
import { RegisterUser } from './entities/RegisterUser';
import { RegisteredUser } from './entities/RegisteredUser';


abstract class UserRepository {
  /* c8 ignore next */
  abstract verifyAvailableUsername(username: string): Promise<void>;
  /* c8 ignore next */
  abstract addUser(registerUser: RegisterUser): Promise<RegisteredUser>;

  /* c8 ignore next */
  abstract getPasswordByUsername(username: string): Promise<string>;
  /* c8 ignore next */
  abstract getIdByUsername(username: string): Promise<string>;
};

export default UserRepository;
