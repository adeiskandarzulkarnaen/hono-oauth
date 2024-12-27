import { describe, it, expect, jest } from 'bun:test';
import AuthenticationRepository from '@domains/authentications/AuthenticationRepository';
import LogoutUserUseCase from '../LogoutUserUseCase';

describe('LogoutUserUseCase', () => {
  it('should orchestrating the logout user action correctly', async () => {
    //* Arrange
    const useCasePayload = {
      refreshToken: 'refresh_token'
    };

    // mocking
    const mockAuthenticationRepository: Partial<AuthenticationRepository> = {
      checkTokenAvailability: jest.fn().mockImplementation(() => Promise.resolve()),
      deleteToken: jest.fn().mockImplementation(() => Promise.resolve())
    };
    // create usecase instance
    const logoutUserUseCase = new LogoutUserUseCase({
      authenticationRepository: mockAuthenticationRepository as AuthenticationRepository,
    });

    //* Action
    await logoutUserUseCase.execute(useCasePayload);

    //* Assert
    expect(mockAuthenticationRepository.checkTokenAvailability).toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken).toBeCalledWith(useCasePayload.refreshToken);
  });
});
