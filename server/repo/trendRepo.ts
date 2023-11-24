import { PrismaClient } from '.prisma/client';
import { CSVData } from '../interfaces/CSVData';

//CREATE PRISMA INSTANCE. CAN WE CREATE SINGLETON ?
const prisma = new PrismaClient();

//GET DATA FOR VOLUME TREND BASED ON STARTDATE AND ENDDATE
async function getTrend(startDate : string, endDate : string) {
    let data : CSVData [] = [];

    //PRISMA OPERATION TO GET RECORDS BETWEEN THE DATE RANGE
    data = await prisma.financeData.findMany({
        where : {
            Date : {
                gte: startDate,
                lte: endDate
            }
        }
    })
    return data;
}

async function getDailyTrend(date : string)
{
    let data : CSVData
    //PRISMA OPERATION TO GET RECORDS BETWEEN THE DATE RANGE
    data = await prisma.financeData.findFirstOrThrow({
        where : {
            Date : date
        }
    })
    return data;
}

export  {getTrend, getDailyTrend};