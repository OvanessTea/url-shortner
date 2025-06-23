import { Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';

export const redirectController = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        const { urlRepo, clickRepo } = getRepositories();
        const url = await urlRepo.findOne({ where: { shortUrl } });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        if (url.expiresAt && url.expiresAt < new Date()) {
            await urlRepo.delete(url.id);
            return res.status(404).json({ error: 'URL expired' });
        }

        await clickRepo.save(clickRepo.create({
            urlId: url.id,
            ipAddress: req.ip || 'unknown',
        }));

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};