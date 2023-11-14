import express from 'express';
import volumeTrendService from '../service/volumeTrendService';

const volRouter = express.Router();

//RETURN VOLUME DATA(BTC VS OTHERS) BASED ON INPUT OF DATES
volRouter.get('/', volumeTrendService);


export default volRouter;