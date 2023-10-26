import dotenv from 'dotenv';
dotenv.config();

const { SERVER_PORT, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export default {
  SERVER_PORT: SERVER_PORT ?? 3000,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
};
