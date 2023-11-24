import express from 'express';
import {trendService,trendServiceWeekly,trendServiceDaily} from '../service/trendService';

const volRouter = express.Router();

//RETURN VOLUME DATA(BTC VS OTHERS) BASED ON INPUT OF DATES
volRouter.get('/', trendService);
volRouter.get('/daily', trendServiceDaily);
volRouter.get('/weekly', trendServiceWeekly);


export default volRouter;