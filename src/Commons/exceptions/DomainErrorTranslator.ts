import InvariantError from './InvariantError';

class DomainErrorTranslator {
  public static translate(error: Error): Error {
    return this.directories[error.message] || error;
  }

  private static directories: Record<string, InvariantError> = {
    'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
    'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
    'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
    'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),

    'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
    'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
    'LOGOUT_USER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus melampirkan refreshToken'),
    'LOGOUT_USER_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refreshToken harus string')
  };
};

export default DomainErrorTranslator;
