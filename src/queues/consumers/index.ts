import CoffeeQueueSingleton from './coffee-queue-consumer';
import JokesQueueSingleton from './jokes-queue-consumer';
import MailQueueSingleton from './mail-queue-consumer';

export const { coffeeQueue } = CoffeeQueueSingleton.getInstance();
export const jokesQueue = JokesQueueSingleton.getInstance();
export const mailQueue = MailQueueSingleton.getInstance();
