import { Request, Response } from 'express';
import { JobOptions } from 'bull';
import { CoffeeQueueJobPayload } from '../interfaces/coffee-queue-job-payload.interface';
import { coffeeQueue } from '../queues/consumers/coffee-queue-consumer';
import { jokesQueue } from '../queues/consumers/jokes-queue-consumer';
import { mailQueue } from '../queues/consumers/mail-queue-consumer';
import { BULL_BOARD_PATH } from '../constants';
import { MailJobInterface } from '../interfaces/mail-job.interface';

export const addCoffeeJobHandler = (_req: Request, res: Response) => {
  const coffeeQueueData: CoffeeQueueJobPayload = {
    coffeeBeans: '🫘',
    water: '🚰',
    cup: '🍵'
  };
  coffeeQueue.add(coffeeQueueData);
  return res.status(200).json({
    status: 'success',
    message: 'Your coffee is being prepared',
    info: `You can check the status of your coffee at ${BULL_BOARD_PATH}`
  });
};

export const startJokesQueueHandler = (_req: Request, res: Response) => {
  const jokesQueueOpts: JobOptions = {
    attempts: 3,
    repeat: { cron: '10 * * * * *' } // every minute at the 10th second
  };
  jokesQueue.add({}, jokesQueueOpts);
  return res.status(200).json({
    status: 'success',
    message: "Jokes are being appended to the 'jokes.txt' file.",
    info: `You can check the status of your queue at ${BULL_BOARD_PATH}`
  });
};

export const addMailJobHandler = (req: Request, res: Response) => {
  const { to, subject, text, html, attachments } = req.body;
  if (!to || !subject || !text) {
    return res.status(422).json({
      status: 'failed',
      message: 'To, subject and text fields are required'
    });
  }
  const mailQueueData: MailJobInterface = {
    subject,
    to,
    text,
    html,
    attachments
  };
  if (!mailQueueData.html) {
    mailQueueData.html = `<h3>${text}</h3>`;
  }
  mailQueue.add(mailQueueData);
  return res.status(200).json({
    status: 'success',
    message: 'Mail job added successfully',
    info: `You can check the status of your mail at ${BULL_BOARD_PATH}`
  });
};
