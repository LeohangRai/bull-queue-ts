import express from 'express';
import {
  addCoffeeJobHandler,
  addMailJobHandler,
  startJokesQueueHandler
} from '../controllers/jobs.controller';
const router = express.Router();

router.get('/coffee', addCoffeeJobHandler);
router.get('/jokes', startJokesQueueHandler);
router.post('/email', addMailJobHandler);

export default router;
