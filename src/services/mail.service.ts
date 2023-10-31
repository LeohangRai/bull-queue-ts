import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import configs from '../configs';
import { MailPayload } from '../interfaces/mail-payload.interface';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM } = configs;

const transportConfig: SMTPTransport.Options = {
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  sender: MAIL_FROM,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  },
  logger: false,
  debug: true
};

export function sendMail(payload: MailPayload) {
  const transporter = nodemailer.createTransport(transportConfig);
  return transporter.sendMail(payload);
}
