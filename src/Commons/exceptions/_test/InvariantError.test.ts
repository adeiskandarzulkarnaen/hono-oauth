import { describe, it, expect } from 'bun:test';

import ClientError from '../ClientError';
import InvariantError from '../InvariantError';

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError('an error occurs');

    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError.status).toEqual(400);
    expect(invariantError.message).toEqual('an error occurs');
    expect(invariantError.name).toEqual('InvariantError');
  });

  it('should return a valid response from getResponse', async () => {
    const error = new InvariantError('an error occurs');

    const response = error.getResponse();
    const responseJson = await response.json();
    console.log(response.headers);

    expect(response.status).toEqual(400);
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(responseJson).toStrictEqual({
      status: 'fail',
      message: 'an error occurs',
    });
  });
});
