import { NextFunction, Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';
import { getUrl } from '../helpers/getUrl';
import NotFoundError from '../errors/not-found-error';

export const infoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shortUrl } = req.params;
        const url = await getUrl(shortUrl);
        const { clickRepo } = getRepositories();

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
        if (error instanceof NotFoundError) {
            return next(new NotFoundError('URL not found'));
        }
        next(error);
    }
}