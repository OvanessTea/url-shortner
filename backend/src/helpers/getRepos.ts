import { AppDataSource, TestDataSource } from '../db';
import { Url } from '../entities/Url';
import { Click } from '../entities/Click';

export const getRepositories = () => {
  const dataSource = TestDataSource.isInitialized ? TestDataSource : AppDataSource;
  
  return {
    urlRepo: dataSource.getRepository(Url),
    clickRepo: dataSource.getRepository(Click),
  };
};