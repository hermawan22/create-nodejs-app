import {
  cleanEnv, port, str, json
} from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    DB_HOSTNAME: str(),
    DB_PORT: port(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
    PORT: port(),
    FEATURE_FLAGS: str()
  });
}

export default validateEnv;
