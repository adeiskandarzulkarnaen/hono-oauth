import { Hono } from 'hono';
import type AuthenticationHandler from './handler';


const routes = (handler: AuthenticationHandler): Hono => {
  const app = new Hono();

  //* ROUTING  "/authentications"
  app.post('/', ...handler.postAuthenticationHandlers);
  app.delete('/', ...handler.deleteAuthenticationHandlers);

  return app;
};

export default routes;