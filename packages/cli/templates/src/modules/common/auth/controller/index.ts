import * as express from 'express';
import Controller from '@helpers/interfaces/router';
import validationMiddleware from '@helpers/middleware/validation';
import CreateUserDto from '@modules/user/dto';
import AuthenticationService from '@modules/common/auth/service';

class AuthenticationController implements Controller {
  public router = express.Router();
  private authenticationService = new AuthenticationService();

  constructor(public path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
  }

  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const {
        cookie,
        user,
      } = await this.authenticationService.register(userData);
      response.setHeader('set-cookie', [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthenticationController;
