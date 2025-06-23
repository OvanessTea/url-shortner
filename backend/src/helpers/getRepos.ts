import { AppDataSource } from '../db';
import { Url } from '../entities/Url';
import { Click } from '../entities/Click';

export const getRepositories = () => {
  return {
    urlRepo: AppDataSource.getRepository(Url),
    clickRepo: AppDataSource.getRepository(Click),
  };
};