import { PrismaClient } from '.prisma/client';
import { CSVData } from '../interfaces/CSVData';

//CREATE PRISMA INSTANCE
const prisma = new PrismaClient();

async function insertAllData(uploadData : CSVData[]){
    await prisma.financeData.createMany(
        {
            data : uploadData
        }
    );
    prisma.$disconnect;
}

async function deleteAllData() {
    await prisma.financeData.deleteMany();
}

export {deleteAllData, insertAllData};