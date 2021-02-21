import App from './app';
import AuthRouter from '@modules/common/auth/controller';

const routes = new App(
  [
    new AuthRouter('/auth')
  ],
);

export default routes;
