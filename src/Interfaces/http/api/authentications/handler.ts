import { Context } from 'hono';
import { Container } from 'instances-container';
import { eUserLogin } from '@domains/users/entities/UserLogin';
import { eNewAuth } from '@domains/authentications/entities/NewAuth';
import LoginUserUseCase from '@applications/use_case/LoginUserUseCase';
import LogoutUserUseCase from '@applications/use_case/LogoutUserUseCase';
import { mapJsonError } from '@commons/mapping/errorMaping';


class AuthenticationHandler {
  constructor(private readonly container: Container) {
    /* do something */
  }

  public postAuthenticationHandlers = [async (c: Context) => {
    const loginUserUseCase: LoginUserUseCase = this.container.getInstance(LoginUserUseCase.name);

    const payload: eUserLogin = await c.req.json().catch(mapJsonError);
    const newAuth: eNewAuth = await loginUserUseCase.execute(payload);

    c.status(201);
    return c.json({
      status: 'success',
      message: 'auth login berhasil',
      data: newAuth
    });
  }];

  public deleteAuthenticationHandlers = [async (c: Context) => {
    const userLogoutUseCase: LogoutUserUseCase = this.container.getInstance(LogoutUserUseCase.name);

    const payload: Record<string, string> = await c.req.json().catch(mapJsonError);
    await userLogoutUseCase.execute(payload);

    return c.json({
      status: 'success',
      message: 'logout berhasil',
    });
  }];
};

export default AuthenticationHandler;
