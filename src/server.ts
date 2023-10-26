import express, { Request, Response } from 'express';
import configs from './configs';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { coffeeQueue } from '.';

const BULL_BOARD_PATH = '/admin/queues';
const expressServerAdapter = new ExpressAdapter();
expressServerAdapter.setBasePath(BULL_BOARD_PATH);

const coffeeQueueAdapter = new BullAdapter(coffeeQueue);
createBullBoard({
  queues: [coffeeQueueAdapter],
  serverAdapter: expressServerAdapter
});

const app = express();
app.use(BULL_BOARD_PATH, expressServerAdapter.getRouter());
app.get('', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    message: 'Hello World!'
  });
});

app.listen(configs.SERVER_PORT, () => {
  console.log(`Server is up and running at POROT: ${configs.SERVER_PORT}`);
  console.log(`Access the Bull Dashboard at "${BULL_BOARD_PATH}"`);
});
