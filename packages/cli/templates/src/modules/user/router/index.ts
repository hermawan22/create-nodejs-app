import * as express from 'express';
import RouterInterface from '@helpers/interfaces/router'

class UserService implements RouterInterface{
  public router = express.Router();

  constructor(public path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllAddresses);
  }

  private getAllAddresses = async (request: express.Request, response: express.Response) => {
    response.send({ success: 'Hello user!'});
  }
}

export default UserService;
