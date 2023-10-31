import Bull, { Job, QueueOptions } from 'bull';
import configs from '../../configs';
import { MailJobInterface } from '../../interfaces/mail-job.interface';
import { sendMail } from '../../services/mail.service';

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = configs;
const queueOptions: QueueOptions = {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD
  }
};

export const mailQueue = new Bull('mail', queueOptions);

mailQueue.on('completed', (job, result) => {
  console.log(`Email job ${job.id} completed with result ${result}`);
});

mailQueue.on('failed', (job, err) => {
  console.log(`Email job ${job.id} failed with error ${err}`);
});

mailQueue.on('progress', (job, progress) => {
  console.log(`Email job ${job.id} progress: ${progress}`);
});

mailQueue.process(async (job: Job<MailJobInterface>, done) => {
  try {
    await sendMail(job.data);
    done();
  } catch (error: any) {
    done(error);
  }
});
