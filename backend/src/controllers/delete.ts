import { NextFunction, Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';
import { getUrl } from '../helpers/getUrl';
import NotFoundError from '../errors/not-found-error';

export const deleteController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shortUrl } = req.params;
        const url = await getUrl(shortUrl);
        const { urlRepo } = getRepositories();

        await urlRepo.delete(url.id);
        res.json({ message: 'URL deleted successfully' });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return next(new NotFoundError('URL not found'));
        }
        next(error);
    }
}