import express, { Request, Response } from 'express';
import { createBullBoard } from '@bull-board/api';
import { JobOptions } from 'bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { coffeeQueue } from './queues/consumers/coffee-queue-consumer';
import { jokesQueue } from './queues/consumers/jokes-queue-consumer';
import configs from './configs';
import { CoffeeQueueJobPayload } from './interfaces/coffee-queue-job-payload.interface';

const BULL_BOARD_PATH = '/admin/queues';
const expressServerAdapter = new ExpressAdapter();
expressServerAdapter.setBasePath(BULL_BOARD_PATH);

const coffeeQueueAdapter = new BullAdapter(coffeeQueue);
const jokesQueueAdapter = new BullAdapter(jokesQueue);
createBullBoard({
  queues: [coffeeQueueAdapter, jokesQueueAdapter],
  serverAdapter: expressServerAdapter
});

const app = express();
app.use(BULL_BOARD_PATH, expressServerAdapter.getRouter());

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    message: 'Hello World!',
    info: `To make a cup of coffee, you can hit the '/jobs/coffee' API`
  });
});

app.get('/jobs/coffee', (_req: Request, res: Response) => {
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
});

app.get('/jobs/jokes', (_req: Request, res: Response) => {
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
});

app.listen(configs.SERVER_PORT, () => {
  console.log(`Server is up and running at PORT: ${configs.SERVER_PORT}`);
  console.log(`Access the Bull Dashboard at "${BULL_BOARD_PATH}"`);
});
