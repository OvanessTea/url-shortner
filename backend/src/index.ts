import 'reflect-metadata';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { urlRouter } from './routers/urlRouter';
import { errorHandler } from './helpers/errorHandler';
import { AppDataSource } from './db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', urlRouter);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Express server started on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.error('TypeORM connection error:', error)); 

export default app;