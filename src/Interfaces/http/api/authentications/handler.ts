import { Context } from 'hono';
import { Container } from 'instances-container';
import { eUserLogin } from '@domains/users/entities/UserLogin';
import { eNewAuth } from '@domains/authentications/entities/NewAuth';
import LoginUserUseCase from '@applications/use_case/LoginUserUseCase';
import { mapJsonError } from '@commons/mapping/errorMaping';


class AuthenticationHandler {
  constructor(private readonly container: Container) {
    /* do something */
  }

  public postAuthenticationHandlers = [async (c: Context) => {
    const loginUserUseCase: LoginUserUseCase = this.container.getInstance(LoginUserUseCase.name);

    const payload: eUserLogin = await c.req.json().catch(mapJsonError);
    const newAuth: eNewAuth = await loginUserUseCase.execute(payload);

    return c.json({
      status: 'success',
      message: 'auth login berhasil',
      data: newAuth
    });
  }];
};

export default AuthenticationHandler;
