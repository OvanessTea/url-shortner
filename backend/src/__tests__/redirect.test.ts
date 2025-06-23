import request from 'supertest';
import app from '../__tests__/test-app';
import { TestDataSource } from '../db';
import { Url } from '../entities/Url';
import { Click } from '../entities/Click';

describe('GET /:shortUrl', () => {
  const urlRepo = TestDataSource.getRepository(Url);
  const clickRepo = TestDataSource.getRepository(Click);

  describe('redirect', () => {
    beforeEach(async () => {
      const testUrl = urlRepo.create({
        originalUrl: 'https://www.google.com',
        shortUrl: 'test-redirect',
        alias: 'test-redirect'
      });
      await urlRepo.save(testUrl);
    });

    it('should redirect to original url', async () => {
      const response = await request(app)
        .get('/test-redirect')
        .expect(302);

      expect(response.header.location).toBe('https://www.google.com');
    });

    it('should write click to database', async () => {
      await request(app)
        .get('/test-redirect')
        .expect(302);

      const clicks = await clickRepo.find({ where: { urlId: 1 } });
      expect(clicks).toHaveLength(1);
      expect(clicks[0].ipAddress).toBeDefined();
    });

    it('should return 404 for non-existent url', async () => {
      const response = await request(app)
        .get('/non-existent-url')
        .expect(404);

      expect(response.body).toMatchObject({
        message: 'URL not found'
      });
    });

    it('should delete expired url and return 404', async () => {
      const expiredUrl = urlRepo.create({
        originalUrl: 'https://www.example.com',
        shortUrl: 'expired-url',
        alias: 'expired-url',
        expiresAt: new Date(Date.now() - 1000)
      });
      await urlRepo.save(expiredUrl);

      const response = await request(app)
        .get('/expired-url')
        .expect(404);

      expect(response.body).toMatchObject({
        message: 'URL expired'
      });

      const deletedUrl = await urlRepo.findOne({ where: { shortUrl: 'expired-url' } });
      expect(deletedUrl).toBeNull();
    });

    it('should work with automatically generated shortUrl', async () => {
      const autoUrl = urlRepo.create({
        originalUrl: 'https://www.github.com',
        shortUrl: 'abc12345'
      });
      await urlRepo.save(autoUrl);

      const response = await request(app)
        .get('/abc12345')
        .expect(302);

      expect(response.header.location).toBe('https://www.github.com');
    });

    it('should correctly handle client IP address', async () => {
      await request(app)
        .get('/test-redirect')
        .set('X-Forwarded-For', '192.168.1.1')
        .expect(302);

      const clicks = await clickRepo.find({ where: { urlId: 1 } });
      expect(clicks).toHaveLength(1);
      
      expect(['::1', '127.0.0.1', '::ffff:127.0.0.1', 'unknown']).toContain(clicks[0].ipAddress);
    });

    it('should handle multiple clicks on the same url', async () => {
      await request(app).get('/test-redirect').expect(302);
      await request(app).get('/test-redirect').expect(302);
      await request(app).get('/test-redirect').expect(302);

      const clicks = await clickRepo.find({ where: { urlId: 1 } });
      expect(clicks).toHaveLength(3);
    });
  });
}); 