import Bull, { Job, QueueOptions } from 'bull';
import configs from '../../configs';
import { CoffeeQueueJobPayload } from '../../interfaces/coffee-queue-job-payload.interface';

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = configs;
const queueOptions: QueueOptions = {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD
  }
};

export const coffeeQueue = new Bull('coffee', queueOptions);

// consumer or processor
coffeeQueue.process((payload: Job<CoffeeQueueJobPayload>, done) => {
  console.log('Wait for the coffee to be prepared....');
  setTimeout(() => {
    console.log('Preparing coffee using the following items:');
    console.log(payload.data);
  }, 3000);
  setTimeout(() => {
    console.log('Your coffee is ready! ☕');
    done();
  }, 6000);
});
