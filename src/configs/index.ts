import dotenv from 'dotenv';
dotenv.config();

const {
  SERVER_PORT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM
} = process.env;

export default {
  SERVER_PORT: SERVER_PORT ?? 3000,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM
};
