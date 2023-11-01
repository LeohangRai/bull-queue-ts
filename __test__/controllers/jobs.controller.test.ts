import { Request, Response } from 'express';
import { BULL_BOARD_PATH } from '../../src/constants';
import {
  addCoffeeJobHandler,
  startJokesQueueHandler
} from '../../src/controllers/jobs.controller';
import { coffeeQueue } from '../../src/queues/consumers/coffee-queue-consumer';
import { jokesQueue } from '../../src/queues/consumers/jokes-queue-consumer';

jest.mock('../../src/queues/consumers/coffee-queue-consumer');
jest.mock('../../src/queues/consumers/jokes-queue-consumer');

describe('addCoffeeJobHandler', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
  });

  it('should add a coffee job and return success response', () => {
    addCoffeeJobHandler(req, res);

    expect(coffeeQueue.add).toHaveBeenCalledWith({
      coffeeBeans: '🫘',
      water: '🚰',
      cup: '🍵'
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Your coffee is being prepared',
      info: `You can check the status of your coffee at ${BULL_BOARD_PATH}`
    });
  });

  it('should add a job to the jokes queue with the correct job options', () => {
    startJokesQueueHandler(req, res);

    expect(jokesQueue.add).toHaveBeenCalledWith(
      {},
      { attempts: 3, repeat: { cron: '10 * * * * *' } }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: "Jokes are being appended to the 'jokes.txt' file.",
      info: `You can check the status of your queue at ${BULL_BOARD_PATH}`
    });
  });
});
