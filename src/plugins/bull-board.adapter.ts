import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { coffeeQueue } from '../queues/consumers/coffee-queue-consumer';
import { jokesQueue } from '../queues/consumers/jokes-queue-consumer';
import { mailQueue } from '../queues/consumers/mail-queue-consumer';
import { BULL_BOARD_PATH } from '../constants';

const expressServerAdapter = new ExpressAdapter();
expressServerAdapter.setBasePath(BULL_BOARD_PATH);

const coffeeQueueAdapter = new BullAdapter(coffeeQueue);
const jokesQueueAdapter = new BullAdapter(jokesQueue);
const mailQueueAdapter = new BullAdapter(mailQueue);
createBullBoard({
  queues: [coffeeQueueAdapter, jokesQueueAdapter, mailQueueAdapter],
  serverAdapter: expressServerAdapter
});

export default expressServerAdapter;
