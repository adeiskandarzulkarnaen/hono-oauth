import { describe, expect, it } from 'bun:test';
import BunBCryptPasswordHash from '../BunBCryptPasswordHash';

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
    it.todo('should throw AuthenticationError if password not match');
    it.todo('should not return AuthenticationError if password match');
  });
});
