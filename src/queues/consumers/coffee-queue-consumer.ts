import Bull, { Job, QueueOptions } from 'bull';
import { promisify } from 'util';
import configs from '../../configs';
import { CoffeeQueueJobPayload } from '../../interfaces/coffee-queue-job-payload.interface';

const sleep = promisify(setTimeout);
const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = configs;
const queueOptions: QueueOptions = {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD
  },
  limiter: {
    max: 10,
    duration: 5000
  }
};

export const coffeeQueue = new Bull('coffee', queueOptions);

coffeeQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result ${result}`);
});

coffeeQueue.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error ${err}`);
});

coffeeQueue.on('progress', (job, progress) => {
  console.log(`Job ${job.id} progress: ${progress}`);
});

// consumer or processor
coffeeQueue.process(async (payload: Job<CoffeeQueueJobPayload>, done) => {
  try {
    console.time('coffee-queue-completion-time');
    payload.log('Preparing coffee using the following items:');
    payload.log(JSON.stringify(payload.data));
    await sleep(3000);

    payload.log('Grinding coffee beans...');
    await sleep(2000);

    payload.progress(20);
    payload.log('Preparing water...');
    await sleep(2000);

    payload.progress(40);
    payload.log('Soaking and stirring...');
    await sleep(2000);

    payload.progress(60);
    payload.log('Brewing...');
    await sleep(2000);

    payload.progress(80);
    payload.log('Almost there....');
    await sleep(2000);

    payload.progress(100);
    payload.log('Your coffee is ready! ☕');
    console.timeEnd('coffee-queue-completion-time');
    done();
  } catch (error: any) {
    done(error);
  }
});
