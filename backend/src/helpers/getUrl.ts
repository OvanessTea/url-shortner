import { getRepositories } from './getRepos';
import NotFoundError from '../errors/not-found-error';

export const getUrl = async (shortUrl: string) => {
    const { urlRepo } = getRepositories();
    const url = await urlRepo.findOne({ where: { shortUrl } });
    if (!url) {
        throw new NotFoundError('URL not found');
    }
    return url;
};