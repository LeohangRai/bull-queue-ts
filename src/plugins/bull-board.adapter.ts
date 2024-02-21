import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BULL_BOARD_PATH } from '../constants';
import { coffeeQueue, jokesQueue, mailQueue } from '../queues/consumers';

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
