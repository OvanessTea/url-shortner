import request from 'supertest';
import app from '../__tests__/test-app';
import { TestDataSource } from '../db';
import { Url } from '../entities/Url';

describe('POST /shorten', () => {
  const urlRepo = TestDataSource.getRepository(Url);

  describe('Creating a link with a unique alias', () => {
    it('should create a link with the specified alias', async () => {
      const testData = {
        originalUrl: 'https://www.google.com',
        alias: 'test-alias'
      };

      const response = await request(app)
        .post('/shorten')
        .send(testData)
        .expect(201);

      expect(response.body).toMatchObject({
        shortUrl: 'test-alias',
        originalUrl: testData.originalUrl,
        alias: testData.alias,
        clickCount: 0
      });

      // Check that the link is saved in the database
      const savedUrl = await urlRepo.findOne({ where: { alias: 'test-alias' } });
      expect(savedUrl).toBeTruthy();
      expect(savedUrl?.originalUrl).toBe(testData.originalUrl);
    });

    it('should create a link without alias (generate automatically)', async () => {
      const testData = {
        originalUrl: 'https://www.github.com'
      };

      const response = await request(app)
        .post('/shorten')
        .send(testData)
        .expect(201);

      expect(response.body).toMatchObject({
        originalUrl: testData.originalUrl,
        clickCount: 0
      });

      expect(response.body.shortUrl).toBeDefined();
      expect(response.body.shortUrl.length).toBe(8);

      const savedUrl = await urlRepo.findOne({ where: { shortUrl: response.body.shortUrl } });
      expect(savedUrl).toBeTruthy();
    });

    it('should return an error when trying to create a link with an existing alias', async () => {
      const firstUrl = {
        originalUrl: 'https://www.google.com',
        alias: 'duplicate-alias'
      };

      await request(app)
        .post('/shorten')
        .send(firstUrl)
        .expect(201);

      const secondUrl = {
        originalUrl: 'https://www.github.com',
        alias: 'duplicate-alias'
      };

      const response = await request(app)
        .post('/shorten')
        .send(secondUrl)
        .expect(409);

      expect(response.body).toMatchObject({
        message: 'Alias already exists'
      });
    });

    it('should create a link with expiration date', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);

      const testData = {
        originalUrl: 'https://www.example.com',
        alias: 'expiring-url',
        expiresAt: futureDate.toISOString()
      };

      const response = await request(app)
        .post('/shorten')
        .send(testData)
        .expect(201);

      expect(response.body).toMatchObject({
        shortUrl: 'expiring-url',
        originalUrl: testData.originalUrl,
        alias: testData.alias,
        clickCount: 0
      });

      expect(response.body.expiresAt).toBeDefined();
      
      const savedUrl = await urlRepo.findOne({ where: { alias: 'expiring-url' } });
      expect(savedUrl).toBeTruthy();
      expect(savedUrl?.expiresAt).toBeInstanceOf(Date);
    });

    it('should return an error for invalid URL', async () => {
      const testData = {
        originalUrl: 'invalid-url',
        alias: 'test-alias'
      };

      const response = await request(app)
        .post('/shorten')
        .send(testData)
        .expect(400);

      expect(response.body.message).toContain('Please provide a valid URL');
    });

    it('should return an error for too long alias', async () => {
      const testData = {
        originalUrl: 'https://www.example.com',
        alias: 'this-alias-is-way-too-long-for-validation'
      };

      const response = await request(app)
        .post('/shorten')
        .send(testData)
        .expect(400);

      expect(response.body.message).toContain('Alias must be at most 20 characters long');
    });
  });
}); 