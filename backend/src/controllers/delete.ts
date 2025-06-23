import { Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';

export const deleteController = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        const { urlRepo } = getRepositories();
        const url = await urlRepo.findOne({ where: { shortUrl } });
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
        await urlRepo.delete(url.id);
        res.json({ message: 'URL deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}