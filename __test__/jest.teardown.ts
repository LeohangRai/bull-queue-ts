import { jokesQueue } from '../src/queues/consumers/jokes-queue-consumer';
import { coffeeQueue } from '../src/queues/consumers/coffee-queue-consumer';
import { mailQueue } from '../src/queues/consumers/mail-queue-consumer';

export default async function () {
  await Promise.all([
    jokesQueue.close(),
    coffeeQueue.close(),
    mailQueue.close()
  ]);
}
