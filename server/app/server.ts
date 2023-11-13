import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { importDataJob } from '../service/loadData';

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


//START SERVER 
importDataJob().then( () => {
app.listen(port,() => {
    console.log(`-- > Application started on http://localhost:${port} < --`);
})
})