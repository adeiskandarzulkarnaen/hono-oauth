import { describe, it, expect } from 'bun:test';
import UserLogin, { eUserLogin } from '../UserLogin';


describe('a UserLogin entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    //* Arrange
    const payload = {
      username: 'adeiskandarzulkarnaen'
    };

    //* Action and Assert
    expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    //* Arrange
    const payload = {
      username: 'adeiskandarzulkarnaen',
      password: 123
    };

    //* Action and Assert
    expect(() => new UserLogin(payload)).toThrow('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create userLogin object correctly', () => {
    //* Arrange
    const payload: eUserLogin = {
      username: 'adeiskandarzulkarnaen',
      password: 'secretpassword',
    };

    //* Action
    const { username, password } = new UserLogin(payload);

    //* Assert
    expect(username).toEqual('adeiskandarzulkarnaen');
    expect(password).toEqual('secretpassword');
  });
});
