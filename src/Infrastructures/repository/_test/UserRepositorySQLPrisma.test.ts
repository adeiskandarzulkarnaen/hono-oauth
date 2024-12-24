import { describe, it, expect, afterEach, afterAll } from 'bun:test';
import UsersTableTestHelper from '@tests/UsersTableTestHelper';
import InvariantError from '@commons/exceptions/InvariantError';
import prismaClient from '@infrastructures/database/sql/prismaClient';
import UserRepositorySQLPrisma from '@infrastructures/repository/UserRepositorySQLPrisma';
import { RegisterUser } from '@domains/users/entities/RegisterUser';
import { RegisteredUser } from '@domains/users/entities/RegisteredUser';



describe('UserRepositorySQLPrisma', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('verifyAvailableUsername function', async () => {
    it('should throw InvariantError when username not available', async () => {
      //* Arrange
      await UsersTableTestHelper.addUser({ username: 'adeiskandarzulkarnaen' });
      const userRepositorySQLPrisma = new UserRepositorySQLPrisma(prismaClient);

      //* Action and Assert
      await expect(userRepositorySQLPrisma.verifyAvailableUsername('adeiskandarzulkarnaen'))
        .rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError when username available', async () => {
      //* Arrange
      const userRepositorySQLPrisma = new UserRepositorySQLPrisma(prismaClient);

      //* Action and Assert
      await expect(userRepositorySQLPrisma.verifyAvailableUsername('adeiskandarzulkarnaen'))
        .resolves.not.toThrow(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should persist register user', async () => {
      //* Arrange
      const registerUser = new RegisterUser({
        username: 'adeiskandarzulkarnaen',
        password: 'secret password',
        fullname: 'Ade Iskandar Zulkarnaen'
      });
      const userRepositorySQLPrisma = new UserRepositorySQLPrisma(prismaClient);

      //* Action
      const { id: userId } = await userRepositorySQLPrisma.addUser(registerUser);

      //* Assert
      const user = await UsersTableTestHelper.findUsersById(userId);
      expect(user).not.toBeNull();
    });

    it('should return registered user correctly', async () => {
      //* Arrange
      const registerUser = new RegisterUser({
        username: 'adeiskandarzulkarnaen',
        password: 'secret password',
        fullname: 'Ade Iskandar Zulkarnaen'
      });
      const userRepositorySQLPrisma = new UserRepositorySQLPrisma(prismaClient);

      //* Action
      const registeredUser = await userRepositorySQLPrisma.addUser(registerUser);

      //* Assert
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: registeredUser.id,
        username: 'adeiskandarzulkarnaen',
        fullname: 'Ade Iskandar Zulkarnaen',
      }));
    });
  });
});
