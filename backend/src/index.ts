import 'reflect-metadata';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { urlRouter } from './routers/urlRouter';
import { errorHandler } from './helpers/errorHandler';
import { AppDataSource } from './db';
import path from 'path';

const { parsed } = dotenv.config({path: path.resolve(__dirname, '../.env')});
console.log(parsed);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', urlRouter);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Express server started on http://localhost:${port}`);
    });
  })
  .catch((error) => console.error('TypeORM connection error:', error)); 

export default app;