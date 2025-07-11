import { NextFunction, Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';
import { getUrl } from '../helpers/getUrl';
import NotFoundError from '../errors/not-found-error';

export const redirectController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shortUrl } = req.params;
        const url = await getUrl(shortUrl);
        const { urlRepo, clickRepo } = getRepositories();

        if (url.expiresAt && url.expiresAt < new Date()) {
            await urlRepo.delete(url.id);
            throw new NotFoundError('URL expired');
        }

        await clickRepo.save(clickRepo.create({
            urlId: url.id,
            ipAddress: req.ip || 'unknown',
        }));

        res.redirect(url.originalUrl);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return next(new NotFoundError(error.message || 'URL not found'));
        }
        next(error);
    }
};