import { Request, Response } from 'express';
import { RequestData } from '../interfaces/RequestData';
import { CSVData } from '../interfaces/CSVData';
import  { getDailyTrend, getTrend } from '../repo/trendRepo.js';

async function trendService(req:Request, res: Response)
{
    // EXTRACT REQUEST BODY
    const {startDate, endDate} : RequestData = req.body;
    //DB OPERATION TO GET DATA
    const data : CSVData [] = await getTrend(startDate,endDate);
    //RETURN DATA
    res.status(200).json({
        trend : data 
    })
}

async function trendServiceWeekly(req: Request, res: Response)
{   

    //LET'S CONSIDER TODAY IS 2023-06-30  
    const data : CSVData [] = await getTrend('2023-06-23','2023-06-30');
    //RETURN DATA
    res.status(200).json({
        trend : data 
    })
}

async function trendServiceDaily(req: Request, res: Response)
{
    //LET'S CONSIDER TODAY IS 2023-06-30  
    const data : CSVData = await getDailyTrend('2023-06-30');
    //RETURN DATA
    res.status(200).json({
        trend : data 
    })
}

export {trendService, trendServiceWeekly, trendServiceDaily};
