import { DataSource } from "typeorm";
import { Url } from "../entities/Url";
import { Click } from "../entities/Click";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    logging: false,
    entities: [Url, Click],
});

export const TestDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: `${process.env.DATABASE_NAME}_test`,
    synchronize: process.env.NODE_ENV === 'development',
    logging: false,
    entities: [Url, Click],
    dropSchema: true,
}); 