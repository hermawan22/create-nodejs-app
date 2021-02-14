import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '@config/database';
import routes from './routes';
import validateEnv from './utils/validateEnv';

validateEnv();

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  routes.listen();
})();
