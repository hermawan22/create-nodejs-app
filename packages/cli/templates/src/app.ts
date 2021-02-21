import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';

import RouterInterface from '@helpers/interfaces/router';
import errorMiddleware from '@helpers/middleware/error';
import { loggerMiddleware, errorLoggerMiddleware } from '@helpers/middleware/logger';

import { RegisterRoutes } from "./helpers/openApi/routes";

class App {
  private app: express.Application;

  constructor(controllers: RouterInterface[]) {
    this.app = express();

    this.initializeMiddlewares();
    RegisterRoutes(this.app);
    this.initializeLogger();
    this.initializeControllers(controllers);
    this.initializeErrorLogger()
    this.initializeErrorHandling();
    this.initialEndpoint();
    this.initializeDocs();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeLogger() {
    this.app.use(loggerMiddleware)
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeErrorLogger() {
    this.app.use(errorLoggerMiddleware)
  }

  private initializeDocs() {
    this.app.use("/docs", swaggerUI.serve, async (_req: express.Request, res: express.Response) => {
      return res.send(
        swaggerUI.generateHTML(await import("./helpers/openApi/swagger.json"))
      );
    });
  }

  // Demo purpose only
  private initialEndpoint() {
    this.app.get('/', async (request: express.Request, response: express.Response) => response.send({ success: "Helo World!" }))
  }

  private initializeControllers(controllers: RouterInterface[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
}

export default App;
