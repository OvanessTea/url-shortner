import 'reflect-metadata';
import express from "express";
import cors from "cors";
import { urlRouter } from '../routers/urlRouter';
import { errorHandler } from '../helpers/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', urlRouter);

app.use(errorHandler);

export default app; 