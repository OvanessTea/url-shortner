import 'reflect-metadata';
import { TestDataSource } from '../db';

beforeAll(async () => {
  try {
    await TestDataSource.initialize();
    
    await TestDataSource.synchronize(true);
    
    console.log('✅ Test database connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to test database:', error);
    throw error;
  }
});

beforeEach(async () => {
  try {
    const queryRunner = TestDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query('TRUNCATE TABLE "click" RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE "url" RESTART IDENTITY CASCADE;');
    await queryRunner.release();
  } catch (error) {
    console.error('❌ Failed to clear test data:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    if (TestDataSource.isInitialized) {
      await TestDataSource.destroy();
      console.log('✅ Test database connection closed');
    }
  } catch (error) {
    console.error('❌ Failed to close test database connection:', error);
  }
}); 