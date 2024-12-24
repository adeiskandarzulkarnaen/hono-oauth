import { Context } from 'hono';
import { Container } from 'instances-container';
import { eRegisterUser } from '@domains/users/entities/RegisterUser';
import RegisterUserUseCase from '@applications/use_case/RegisterUserUseCase';
import { mapJsonError } from '@commons/mapping/errorMaping';
// import jwtAuth from '@interfaces/http/middlewares/jwtAuth';


class UserHandler {
  constructor(private readonly container: Container) {
    /* do something */
  };

  public postUserHandlers = [async (c: Context) => {
    const registerUserUseCase: RegisterUserUseCase = this.container.getInstance(RegisterUserUseCase.name);
    const payload: eRegisterUser = await c.req.json().catch(mapJsonError);

    const registeredUser = await registerUserUseCase.execute(payload);

    return c.json({
      status: 'success',
      message: 'registrasi berhasil',
      data: {
        registeredUser,
      }
    });
  }];


};

export default UserHandler;
