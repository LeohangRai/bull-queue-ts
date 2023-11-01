import express, { Request, Response } from 'express';
import configs from './configs';
import { BULL_BOARD_PATH } from './constants';
import expressServerAdapter from './plugins/bull-board.adapter';
import jobsRouter from './routes/jobs';

const app = express();
app.use(express.json());
app.use(BULL_BOARD_PATH, expressServerAdapter.getRouter());

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    message: 'Hello World!',
    info: `To make a cup of coffee, you can hit the '/jobs/coffee' API`
  });
});

app.use('/jobs', jobsRouter);

app.listen(configs.SERVER_PORT, () => {
  console.log(`Server is up and running at PORT: ${configs.SERVER_PORT}`);
  console.log(`Access the Bull Dashboard at "${BULL_BOARD_PATH}"`);
});
