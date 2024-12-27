import { describe, it, expect, jest } from 'bun:test';
import RegenerateAccessTokenUseCase from '../RegenerateAccessTokenUseCase';
import AuthenticationRepository from '@domains/authentications/AuthenticationRepository';
import AuthenticationTokenManager from '@applications/security/AuthenticationTokenManager';

describe('RegenerateAccessTokenUseCase', () => {
  it('should orchestrating regenerate access token correctly', async () => {
    //* Arrange
    const useCasePayload = {
      refreshToken: 'refresh_token'
    };
    // mocking
    const mockAuthenticationRespoitory: Partial<AuthenticationRepository> = {
      checkTokenAvailability: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    const mockAuthenticationTokenManager: Partial<AuthenticationTokenManager> = {
      verifyRefreshToken: jest.fn().mockResolvedValue({ username: 'adeiskandarzulkarnaen' }),
      createAccessToken: jest.fn().mockResolvedValue('some_new_access_token'),
    };
    // create use case instance
    const regenerateAccessTokenUseCase = new RegenerateAccessTokenUseCase({
      authenticationRepository: mockAuthenticationRespoitory as AuthenticationRepository,
      tokenManager: mockAuthenticationTokenManager as AuthenticationTokenManager,
    });

    //* Action
    const accessToken = await regenerateAccessTokenUseCase.execute(useCasePayload);

    //* Assert
    expect(accessToken).toEqual('some_new_access_token');
    expect(mockAuthenticationTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRespoitory.checkTokenAvailability).toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({ username: 'adeiskandarzulkarnaen' });
  });
});
