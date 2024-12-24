import RegisterUser, { eRegisterUser } from '@domains/users/entities/RegisterUser';
import { eRegisteredUser } from '@domains/users/entities/RegisteredUser';
import type UserRepository from '@domains/users/UserRepository';
import type PasswordHash from '@applications/security/PasswordHash';


export interface RegisterUserUseCaseDevedencies {
  userRepository: UserRepository,
  passwordHash: PasswordHash,
}

export class RegisterUserUseCase {
  private readonly userRepository: UserRepository;
  private readonly passwordHash : PasswordHash;
  constructor({ userRepository, passwordHash }: RegisterUserUseCaseDevedencies){
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  public async execute(useCasePayload: eRegisterUser): Promise<eRegisteredUser> {
    const registerUser = new RegisterUser(useCasePayload);
    await this.userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this.passwordHash.hash(registerUser.password);
    return this.userRepository.addUser(registerUser);
  }
};

export default RegisterUserUseCase;
