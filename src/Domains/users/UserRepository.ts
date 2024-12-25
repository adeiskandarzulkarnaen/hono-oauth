import { RegisterUser } from './entities/RegisterUser';
import { RegisteredUser } from './entities/RegisteredUser';


abstract class UserRepository {
  abstract verifyAvailableUsername(username: string): Promise<void>;
  abstract addUser(registerUser: RegisterUser): Promise<RegisteredUser>;

  abstract getPasswordByUsername(username: string): Promise<string>;
  abstract getIdByUsername(username: string): Promise<string>;
};

export default UserRepository;
