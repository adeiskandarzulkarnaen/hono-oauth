/* istanbul ignore file */
import { createContainer } from 'instances-container';

// external agency
import prismaClient from '@infrastructures/database/sql/prismaClient';


// abstrack class
import UserRepository from '@domains/users/UserRepository';
import AuthenticationRepository from '@domains/authentications/AuthenticationRepository';
import PasswordHash from '@applications/security/PasswordHash';
import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';


// service (repository, helper, manager, etc)
import UserRepositorySQLPrisma from '@infrastructures/repository/UserRepositorySQLPrisma';
import AuthenticationRepositorySQLPrisma from './repository/AuthenticationRepositorySQLPrisma';
import BunBCryptPasswordHash from '@infrastructures/security/BunBCryptPasswordHash';
import HonoJwtTokenManager from '@infrastructures/security/HonoJwtTokenManager';


// use case
import RegisterUserUseCase from '@applications/use_case/RegisterUserUseCase';
import LoginUserUseCase from '@applications/use_case/LoginUserUseCase';
import LogoutUserUseCase from '@applications/use_case/LogoutUserUseCase';
import RegenerateAccessTokenUseCase from '@applications/use_case/RegenerateAccessTokenUseCase';



// creating container
const container = createContainer();


// registering services
container.register([
  {
    key: PasswordHash.name,
    Class: BunBCryptPasswordHash,
  },
  {
    key: AuthenticationTokenManager.name,
    Class: HonoJwtTokenManager,
  },
]);


// registering repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositorySQLPrisma,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: prismaClient }
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositorySQLPrisma,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: prismaClient }
      ],
    },
  },
]);


// registering use cases
container.register([
  {
    key: RegisterUserUseCase.name,
    Class: RegisterUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'userRepository', internal: UserRepository.name },
        { name: 'passwordHash', internal: PasswordHash.name },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'userRepository', internal: UserRepository.name },
        { name: 'authenticationRepository', internal: AuthenticationRepository.name },
        { name: 'passwordHash', internal: PasswordHash.name },
        { name: 'tokenManager', internal: AuthenticationTokenManager.name },
      ],
    },
  },
  {
    key: RegenerateAccessTokenUseCase.name,
    Class: RegenerateAccessTokenUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'authenticationRepository', internal: AuthenticationRepository.name },
        { name: 'tokenManager', internal: AuthenticationTokenManager.name },
      ]
    }
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'authenticationRepository', internal: AuthenticationRepository.name },
      ],
    },
  },
]);


export default container;
