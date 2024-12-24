import { describe, expect, it, jest } from 'bun:test';

import RegisterUser from '@domains/users/entities/RegisterUser';
import RegisteredUser from '@domains/users/entities/RegisteredUser';
import UserRepository from '@domains/users/UserRepository';
import PasswordHash from '@applications/security/PasswordHash';
import RegisterUserUseCase from '../RegisterUserUseCase';



describe('RegisterUserUseCase', () => {
  it('should orchestrating the regsiter user action correctly', async () => {
    //* Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };

    const mockRegisteredUser =  new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    /** creating dependency of use case */
    const mockUserRepository = {
      verifyAvailableUsername: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      addUser: jest.fn().mockResolvedValue(mockRegisteredUser)
    } as unknown as UserRepository;

    const mockPasswordHash = {
      hash: jest.fn().mockResolvedValue('encrypted_password')
    } as unknown as PasswordHash;

    /** creating use case instance */
    const getUserUseCase = new RegisterUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash
    });


    //* Action
    const registeredUser = await getUserUseCase.execute(useCasePayload);

    //* Assert
    expect(registeredUser).toStrictEqual(new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    }));
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname,
    }));
  });
});
