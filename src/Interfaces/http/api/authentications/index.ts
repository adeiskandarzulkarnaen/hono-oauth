import { type Hono } from 'hono';
import { type Container } from 'instances-container';
import AuthenticationHandler from './handler';
import routes from './routes';


/**
 * Users ROUTING
 * anda dapat mendaftarkan routing ini direkomendasikan mengunakan path '/authentications'
 *
 * contoh: app.route('/authentications', authenticationRoutes(container));
 *
 * @param {Container} container
 * @returns {Hono}
 */
const authenticationRoutes = (container: Container): Hono => {
  const authenticationHandler = new AuthenticationHandler(container);
  return routes(authenticationHandler);
};


export default authenticationRoutes;
