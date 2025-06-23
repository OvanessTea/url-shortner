import { AppDataSource } from '../index';
import { Url } from '../entities/Url';
import { nanoid } from 'nanoid';
import { CreateUrlDto } from '../dtos/create-url.dto';

export async function createShortUrl(dto: CreateUrlDto) {
  const urlRepo = AppDataSource.getRepository(Url);

  const { originalUrl, expiresAt, alias } = dto;

  if (alias) {
    const exists = await urlRepo.findOne({ where: { alias } });
    if (exists) {
      throw new Error('Alias already exists');
    }
  }

  const shortUrl = alias || nanoid(8);
  const url = urlRepo.create({
    originalUrl,
    shortUrl,
    alias,
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
  });

  return await urlRepo.save(url);
}