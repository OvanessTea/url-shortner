import { getRepositories } from './getRepos';

export const getUrl = async (shortUrl: string) => {
    const { urlRepo } = getRepositories();
    const url = await urlRepo.findOne({ where: { shortUrl } });
    if (!url) {
        throw new Error('URL not found');
    }
    return url;
};