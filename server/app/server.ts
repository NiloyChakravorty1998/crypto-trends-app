import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import readExcelService from '../service/loadData';

//CONFIG
dotenv.config();
const app = express();
const port : string = process.env.PORT! || '5000';

//MIDDLEWARES
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//ROUTERS
app.get('/', async (req: Request, res: Response) => {
    try {
        const data = await readExcelService();
        res.status(200).json({
            message: "server is up",
            data: data
        });
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
//START SERVER 
app.listen(port,() => {
    console.log(`-- > Application started on http://localhost:${port} < --`);
})