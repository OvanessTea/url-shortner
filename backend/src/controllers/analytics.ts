import { NextFunction, Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';
import { getUrl } from '../helpers/getUrl';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';

export const analyticsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shortUrl } = req.params;
        const url = await getUrl(shortUrl);
        const { clickRepo } = getRepositories();
        
        const clickCount = await clickRepo.count({ where: { urlId: url.id } });
        const recentClicks = await clickRepo.find({ 
            where: { urlId: url.id }, 
            order: { clickedAt: 'DESC' }, 
            take: 5 
        });
        const recentIps = recentClicks.map(c => c.ipAddress);
        res.json({ 
            shortUrl, 
            clickCount, 
            recentIps 
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return next(new NotFoundError('URL not found'));
        }
        if (error instanceof BadRequestError) {
            return next(new BadRequestError('Invalid URL'));
        }
        next(error);
    }
}