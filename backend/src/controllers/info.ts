import { Request, Response } from 'express';
import { AppDataSource } from '..';
import { Click } from '../entities/Click';
import { Url } from '../entities/Url';

export const infoController = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        const urlRepo = AppDataSource.getRepository(Url);
        const clickRepo = AppDataSource.getRepository(Click);
        const url = await urlRepo.findOne({ where: { shortUrl } });
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
        const clickCount = await clickRepo.count({ where: { urlId: url.id } });
        res.json({
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            alias: url.alias,
            createdAt: url.createdAt,
            clickCount,
            expiresAt: url.expiresAt,
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}