import { ConnectionOptions } from 'typeorm';

const database: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [
    __dirname + '/../**/entity/*{.ts,.js}',
  ],
  migrations: [
    'src/migrations/*.ts',
  ],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default database;
