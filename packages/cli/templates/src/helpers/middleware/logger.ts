import * as winston from 'winston';
import * as expressWinston from 'express-winston';

type Func = () => {}

const isProduction = process.env.NODE_ENV !== 'production';

const loggerMiddleware = <Func> expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    isProduction ? winston.format.simple() : winston.format.json()
  ),
  meta: !isProduction,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true
})

const errorLoggerMiddleware = <Func> expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    isProduction ? winston.format.simple() : winston.format.json()
  ),
  meta: !isProduction
})

export { loggerMiddleware, errorLoggerMiddleware };
