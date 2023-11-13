import dotenv from 'dotenv';
import fs from 'fs';
import csvParser from 'csv-parser';

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

export default readExcelService;
