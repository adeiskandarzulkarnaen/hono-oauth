import { describe, it, expect, jest } from 'bun:test';

import LoginUserUseCase from '../LoginUserUseCase';
import { eUserLogin } from '@domains/users/entities/UserLogin';
import NewAuth, { eNewAuth } from '@domains/authentications/entities/NewAuth';
import UserRepository from '@domains/users/UserRepository';
import AuthenticationRepository from '@domains/authentications/AuthenticationRepository';
import PasswordHash from '@applications/security/PasswordHash';
import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';


describe('LoginUserUseCase', () => {
  it('should orchestrating the login user action correctly', async () => {
    //* Arrange
    const useCasePayload: eUserLogin = {
      username: 'adeiskandarzulkarnaen',
      password: 'secretpassword',
    };
    const expectedAuth: eNewAuth = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    });

    // mocking
    const mockUserRepository: Partial<UserRepository> = {
      getPasswordByUsername: jest.fn().mockResolvedValue('encrypted_password'),
    };
    const mockPasswordHash: Partial<PasswordHash> = {
      comparePassword: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    const mockAuthenticationTokenManager: Partial<AuthenticationTokenManager> = {
      createAccessToken: jest.fn().mockResolvedValue('access_token'),
      createRefreshToken: jest.fn().mockResolvedValue('refresh_token'),
    };
    const mockAuthenticationRepository: Partial<AuthenticationRepository> = {
      addToken: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    // create UseCase Instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository as UserRepository,
      authenticationRepository: mockAuthenticationRepository as AuthenticationRepository,
      passwordHash: mockPasswordHash as PasswordHash,
      tokenManager: mockAuthenticationTokenManager as AuthenticationTokenManager,
    });

    //* Action
    const newAuth = await loginUserUseCase.execute(useCasePayload);

    //* Assert
    expect(newAuth).toEqual(expectedAuth);
    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith('adeiskandarzulkarnaen');
    expect(mockPasswordHash.comparePassword).toBeCalledWith('secretpassword', 'encrypted_password');
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({ username: 'adeiskandarzulkarnaen' });
    expect(mockAuthenticationTokenManager.createRefreshToken).toBeCalledWith({ username: 'adeiskandarzulkarnaen' });
    expect(mockAuthenticationRepository.addToken).toBeCalledWith(expectedAuth.refreshToken);
  });
});
