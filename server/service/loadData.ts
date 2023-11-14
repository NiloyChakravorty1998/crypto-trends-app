import dotenv from 'dotenv';
import fs from 'fs';
import csvParser from 'csv-parser';
import { CSVData } from '../interfaces/CSVData';
import { deleteAllData, insertAllData } from '../repo/loadDataRepo';

// CONFIGURATION
dotenv.config();

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
    await deleteAllData();
}

// IMPORT DATA TO DB TABLE
async function importDataJob() {
    await purgeDataService();
    console.log(`Starting to import data to DB`)
    const data = await readExcelService();
    console.log(`Fetched data from CSV`);
    
    //CREATE ARRAYLIST FOR THE REQUIRED
    let uploadData : CSVData[] = [];
    
    for(let i =0; i< data.length; i ++)
    {
        let dataInsert : CSVData;
        dataInsert = {
            Date : data[i].Date,
            BTC : data[i].BTC,
            NYSE : data[i].NYSE,
            LSE : data[i].LSE,
            BTC_Volume : data[i].BTC_Volume,
            NYSE_Volume : data[i].NYSE_Volume,
            LSE_Volume : data[i].LSE_Volume
        }
        uploadData.push(dataInsert);
    }
    // DB INSERT
    console.log(`Starting DATA insertion`)
    await insertAllData(uploadData);
    console.log(`Finished Data Load`)
}

export {readExcelService, importDataJob, purgeDataService};
