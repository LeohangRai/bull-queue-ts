import fs from 'fs';
import path from 'path';
import { getRandomJokeFromApi } from '../../services/get-jokes';
import configs from '../../configs';
import Bull, { QueueOptions } from 'bull';

const filePath = path.join(__dirname, '../../../jokes.txt');
function appendDataToFile(data: string) {
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      console.error('Error appending data to the file:', err);
    } else {
      console.log('Data has been appended to the file:', filePath);
    }
  });
}

async function appendJokeToFile() {
  const joke = await getRandomJokeFromApi();
  appendDataToFile(joke);
}

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = configs;
const queueOptions: QueueOptions = {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD
  }
};

export const jokesQueue = new Bull('jokes', queueOptions);

jokesQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result ${result}`);
});

jokesQueue.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error ${err}`);
});

jokesQueue.on('progress', (job, progress) => {
  console.log(`Job ${job.id} progress: ${progress}`);
});

jokesQueue.process(async (_payload, done) => {
  try {
    await appendJokeToFile();
    done();
  } catch (error: any) {
    done(error);
  }
});
