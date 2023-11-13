import dotenv from 'dotenv';
import fs from 'fs';
import csvParser from 'csv-parser';
import { PrismaClient } from '.prisma/client';
import { CSVData } from '../interfaces/CSVData';

// CONFIGURATION
dotenv.config();
const prisma = new PrismaClient();

// READ DATA FROM EXCEL
function readExcelService(): Promise<any[]> {
  return new Promise((resolve, reject) => {
      const filePath: string = `Dataset.csv`;
      const data: any[] = [];

      console.log(`Started file load from : ${filePath} : for processing`);

      fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (row) => {
              data.push(row);
          })
          .on('end', () => {
              resolve(data);
          })
          .on('error', (error) => {
              reject(error);
          });
  });
}

// DELETE ALL DATA FROM DB TABLE
async function purgeDataService() {
    console.log(`Starting to purge all existing records`)
    await prisma.financeData.deleteMany();
}

// IMPORT DATA TO DB TABLE
async function importDataJob() {
    await purgeDataService();
    console.log(`Starting to import data to DB`)
    const data = await readExcelService();
    console.log(`Fetched data from CSV`);
    
    data.forEach( async (element : CSVData) => {
        
        await prisma.financeData.createMany({
            data : {
                Date: element.Date,
                BTC : element.BTC,
                LSE : element.LSE,
                NYSE : element.NYSE,
                BTC_Volume : element.BTC_Volume,
                LSE_Volume : element.LSE_Volume,
                NYSE_Volume : element.NYSE_Volume
            }
        })
    })
    
}

export {readExcelService, importDataJob, purgeDataService};
