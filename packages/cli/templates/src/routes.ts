import App from './app';
import UserRouter from '@modules/user/router';
import AuthRouter from '@modules/common/auth/router';

const routes = new App(
  [
    new AuthRouter('/auth'),
    new UserRouter('/user')
  ],
);

export default routes;
