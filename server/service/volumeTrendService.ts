import { Request, Response } from 'express';
import { RequestData } from '../interfaces/RequestData';
import { CSVData } from '../interfaces/CSVData';
import getVolumeTrend from '../repo/volumeRepo';

async function volumeTrendService(req:Request, res: Response)
{
    // EXTRACT REQUEST BODY
    const {startDate, endDate} : RequestData = req.body;
    //DB OPERATION TO GET DATA
    const data : CSVData [] = await getVolumeTrend(startDate,endDate);
    //RETURN DATA
    res.status(200).json({
        volumeTrend : data 
    })
}

export default volumeTrendService;
