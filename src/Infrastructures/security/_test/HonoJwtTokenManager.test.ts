import { describe, expect, it } from 'bun:test';
import HonoJwtTokenManager from '../HonoJwtTokenManager';
import InvariantError from '@commons/exceptions/InvariantError';


describe('HonoJwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      //* Arrange
      const tokenPayload = {
        username: 'adeiskandarzulkarnaen',
      };

      // create instance
      const honoJwtTokenManager = new HonoJwtTokenManager();

      //* Action
      const accessToken = await honoJwtTokenManager.createAccessToken(tokenPayload);

      //* Assert
      expect(typeof accessToken).toEqual('string');
      expect(accessToken).not.toBeUndefined();
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      //* Arrange
      const tokenPayload = {
        username: 'adeiskandarzulkarnaen',
      };

      // create instance
      const honoJwtTokenManager = new HonoJwtTokenManager();

      //* Action
      const refreshToken = await honoJwtTokenManager.createRefreshToken(tokenPayload);

      //* Assert
      expect(typeof refreshToken).toEqual('string');
      expect(refreshToken).not.toBeUndefined();
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      //* Arrange
      const honoJwtTokenManager = new HonoJwtTokenManager();
      const accessToken = await honoJwtTokenManager.createAccessToken({ username: 'adeiskandarzulkarnaen' });

      //* Action and Assert
      expect(honoJwtTokenManager.verifyRefreshToken(accessToken)).rejects.toThrow(InvariantError);
    });

    it('hould not throw InvariantError when refresh token verified', async () => {
      //* Arrange
      const honoJwtTokenManager = new HonoJwtTokenManager();
      const refreshToken = await honoJwtTokenManager.createRefreshToken({ username: 'adeiskandarzulkarnaen' });

      //* Action and Assert
      expect(honoJwtTokenManager.verifyRefreshToken(refreshToken))
        .resolves
        .not.toThrow(InvariantError);
    });

    it('hould return decoded payloadToken when refresh token is verified', async () => {
      //* Arrange
      const honoJwtTokenManager = new HonoJwtTokenManager();
      const refreshToken = await honoJwtTokenManager.createRefreshToken({ username: 'adeiskandarzulkarnaen' });

      //* Action
      const decodedTokenPayload = await honoJwtTokenManager.verifyRefreshToken(refreshToken);

      //* Assert
      expect(decodedTokenPayload.username).toEqual('adeiskandarzulkarnaen');
      expect(decodedTokenPayload.exp).toBeDefined();
      expect(typeof decodedTokenPayload.exp).toEqual('number');
    });
  });
});
