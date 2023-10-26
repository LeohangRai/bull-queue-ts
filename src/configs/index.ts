import dotenv from 'dotenv';
dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export default {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD
};
