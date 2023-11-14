import { Request, Response } from 'express';
import { RequestData } from '../interfaces/RequestData';
import { CSVData } from '../interfaces/CSVData';
import getVolumeTrend from '../repo/volumeRepo';

async function volumeTrendService(req:Request, res: Response)
{
    // EXTRACT REQUEST BODY
    const reqBody : RequestData = req.body;

    //DB OPERATION TO GET DATA
    const data : CSVData [] = await getVolumeTrend(reqBody.startDate, reqBody.endDate);
    //RETURN DATA
    res.json(200).json({
        data 
    })
}

export default volumeTrendService;
