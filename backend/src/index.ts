import 'reflect-metadata';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { urlRouter } from './routers/urlRouter';
import { Url } from './entities/Url';
import { Click } from './entities/Click';
import { errorHandler } from './helpers/errorHandler';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [Url, Click],
});

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