import { Request, Response } from 'express';
import { BULL_BOARD_PATH } from '../../src/constants';
import {
  addCoffeeJobHandler,
  addMailJobHandler,
  startJokesQueueHandler
} from '../../src/controllers/jobs.controller';
import { MailJobInterface } from '../../src/interfaces/mail-job.interface';
import CoffeeQueueSingleton from '../../src/queues/consumers/coffee-queue-consumer';
import JokesQueueSingleton from '../../src/queues/consumers/jokes-queue-consumer';
import MailQueueSingleton from '../../src/queues/consumers/mail-queue-consumer';

jest.mock('../../src/queues/consumers/coffee-queue-consumer', () => {
  const mockAddQueueFn = jest.fn();
  return {
    getInstance: jest.fn(() => {
      return {
        coffeeQueue: {
          add: mockAddQueueFn
        }
      };
    })
  };
});

jest.mock('../../src/queues/consumers/jokes-queue-consumer', () => {
  const mockAddQueueFn = jest.fn();
  return {
    getInstance: jest.fn(() => {
      return {
        add: mockAddQueueFn
      };
    })
  };
});

jest.mock('../../src/queues/consumers/mail-queue-consumer', () => {
  const mockAddQueueFn = jest.fn();
  return {
    getInstance: jest.fn(() => {
      return {
        add: mockAddQueueFn
      };
    })
  };
});

let req: Request;
let res: Response;

beforeEach(() => {
  req = {} as Request;
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;
});

describe('addCoffeeJobHandler', () => {
  const coffeeQueue = CoffeeQueueSingleton.getInstance().coffeeQueue;

  it('should add a coffee job to the queue and return success response', () => {
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
});

describe('startJokesQueueHandler', () => {
  const jokesQueue = JokesQueueSingleton.getInstance();

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

describe('addMailJobHandler', () => {
  const req = {
    body: {}
  } as Request;
  const mailQueue = MailQueueSingleton.getInstance();

  it('should return 422 status if required fields are missing', () => {
    addMailJobHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      status: 'failed',
      message: 'To, subject and text fields are required'
    });
  });

  it('should add a mail job to the queue and return a 200 status if the required fields are provided', () => {
    const validMailPayload: MailJobInterface = {
      to: 'janedoe@example.com',
      subject: 'Test subject',
      text: 'Test text',
      html: '<h3>Hello world</h3>'
    };
    req.body = validMailPayload;
    addMailJobHandler(req, res);
    expect(mailQueue.add).toHaveBeenCalledWith(validMailPayload);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Mail job added successfully',
      info: `You can check the status of your mail at ${BULL_BOARD_PATH}`
    });
  });

  it('should use a default HTML value if HTML is not provided', () => {
    const mailPayloadWithoutHtml: MailJobInterface = {
      to: 'janedoe@example.com',
      subject: 'Test subject',
      text: 'Test text'
    };
    req.body = mailPayloadWithoutHtml;
    addMailJobHandler(req, res);
    expect(mailQueue.add).toHaveBeenCalledWith({
      ...mailPayloadWithoutHtml,
      html: `<h3>${mailPayloadWithoutHtml.text}</h3>`
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
