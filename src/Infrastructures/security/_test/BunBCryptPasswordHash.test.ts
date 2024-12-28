import { describe, expect, it } from 'bun:test';
import BunBCryptPasswordHash from '../BunBCryptPasswordHash';
import AuthenticationError from '@commons/exceptions/AuthenticationError';

describe('BunBCryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      //* Arrange
      const bunBCryptPasswordHash = new BunBCryptPasswordHash();

      //* Action
      const encryptedPassword = await bunBCryptPasswordHash.hash('plain_password');

      //* Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError if password not match', async () => {
      //* Arrange
      const bunBCryptPasswordHash = new BunBCryptPasswordHash();
      const plainPassword = 'secret_password';

      //* Action and Assert
      expect(bunBCryptPasswordHash.comparePassword(plainPassword, 'encrypted_password'))
        .rejects.toThrow(AuthenticationError);
    });

    it('should not return AuthenticationError if password match', async () => {
      //* Arrange
      const bunBCryptPasswordHash = new BunBCryptPasswordHash();
      const plainPassword = 'secret_password';
      const encryptedPassword = await bunBCryptPasswordHash.hash(plainPassword);

      //* Action and Assert
      expect(bunBCryptPasswordHash.comparePassword(plainPassword, encryptedPassword))
        .resolves.not.toThrow(AuthenticationError);
    });
  });
});
