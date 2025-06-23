import { NextFunction, Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';
import { getUrl } from '../helpers/getUrl';

export const redirectController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shortUrl } = req.params;
        const url = await getUrl(shortUrl);
        const { urlRepo, clickRepo } = getRepositories();

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
        next(error);
    }
};