import { Request, Response } from 'express';
import { getRepositories } from '../helpers/getRepos';

export const analyticsController = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        const { urlRepo, clickRepo } = getRepositories();
        const url = await urlRepo.findOne({ where: { shortUrl } });
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
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
        res.status(500).json({ error: (error as Error).message });
    }
}