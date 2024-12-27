import { describe, it, expect } from 'bun:test';
import NewAuth, { eNewAuth } from '../NewAuth';


describe('a NewAuth entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    //* Arrange
    const payload = {
      accessToken: 'secret_accessToken',
    } as eNewAuth;

    //* Action and Assert
    expect(() => new NewAuth(payload)).toThrow('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    //* Arrange
    const payload = {
      accessToken: 'secret_accessToken',
      refreshToken: 123,
    } as unknown as eNewAuth;

    //* Action and Assert
    expect(() => new NewAuth(payload)).toThrow('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newAuth object correctly', () => {
    //* Arrange
    const payload: eNewAuth= {
      accessToken: 'secret_accessToken',
      refreshToken: 'secret_refreshToken',
    };

    //* Action
    const newAuth = new NewAuth(payload);

    //* Assert
    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(newAuth.accessToken).toEqual('secret_accessToken');
    expect(newAuth.refreshToken).toEqual('secret_refreshToken');
  });
});
