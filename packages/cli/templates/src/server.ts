import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '@config/database';
import routes from './routes';
import validateEnv from '@utils/validateEnv';
import getFeatureFlag from '@utils/getFeatureFlag';

validateEnv();

const withDatabase = getFeatureFlag('withDatabase', null);

(async () => {
  if (withDatabase) {
    try {
      const connection = await createConnection(config);
      await connection.runMigrations();
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
  }
  routes.listen();
})();
