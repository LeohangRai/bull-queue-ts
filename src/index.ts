import Bull, { Job, QueueOptions } from 'bull';
import configs from './configs';

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = configs;
const queueOptions: QueueOptions = {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD
  }
};

export const coffeeQueue = new Bull('coffee', queueOptions);

interface CoffeQueueJobPayload {
  coffeeBeans: string;
  water: string;
  coffeePlunge?: string;
  cup: string;
}

// consumer
coffeeQueue.process((payload: Job<CoffeQueueJobPayload>, done) => {
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

const coffeeQueueData: CoffeQueueJobPayload = {
  coffeeBeans: '🫘',
  water: '🚰',
  cup: '🍵'
};
// producer
coffeeQueue.add(coffeeQueueData);
