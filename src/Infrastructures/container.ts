/* istanbul ignore file */
import { createContainer } from 'instances-container';

// external agency
import prismaClient from '@infrastructures/database/sql/prismaClient';


// abstrack class
import UserRepository from '@domains/users/UserRepository';
import PasswordHash from '@applications/security/PasswordHash';


// service (repository, helper, manager, etc)
import UserRepositorySQLPrisma from '@infrastructures/repository/UserRepositorySQLPrisma';
import BunBCryptPasswordHash from '@infrastructures/security/BunBCryptPasswordHash';


// use case
import RegisterUserUseCase from '@applications/use_case/RegisterUserUseCase';


// creating container
const container = createContainer();


// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositorySQLPrisma,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        { concrete: prismaClient }
      ]
    }
  },
  {
    key: PasswordHash.name,
    Class: BunBCryptPasswordHash,
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
      ]
    }
  },
]);


export default container;
