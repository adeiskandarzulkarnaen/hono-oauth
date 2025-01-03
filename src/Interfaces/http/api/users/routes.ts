import { Hono } from 'hono';
import type UserHandler from './handler';


const routes = (handler: UserHandler): Hono => {
  const app = new Hono();

  //* ROUTING  "/users"
  app.post('/', ...handler.postUserHandlers);

  return app;
};

export default routes;
