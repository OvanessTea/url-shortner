import { Request, Response } from 'express';
import { CreateUrlDto } from '../dtos/create-url.dto';
import { nanoid } from 'nanoid';
import { validateDto } from '../helpers/validate';
import { getRepositories } from '../helpers/getRepos';

export const shortenController = async (req: Request, res: Response) => {
    try {
        const dto = new CreateUrlDto();
        dto.originalUrl = req.body.originalUrl;
        dto.expiresAt = req.body.expiresAt;
        dto.alias = req.body.alias;

        await validateDto(dto, res);

        const { urlRepo } = getRepositories();
        const { originalUrl, expiresAt, alias } = dto;

        if (alias) {
            const exists = await urlRepo.findOne({ where: { alias } });
            if (exists) {
                return res.status(400).json({ error: 'Alias already exists' });
            }
        }

        const shortUrl = alias || nanoid(8);
        const url = urlRepo.create({
            originalUrl,
            shortUrl,
            alias,
            expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        });

        const savedUrl = await urlRepo.save(url);

        res.status(201).json({
            shortUrl: savedUrl.shortUrl,
            originalUrl: savedUrl.originalUrl,
            alias: savedUrl.alias,
            expiresAt: savedUrl.expiresAt,
            createdAt: savedUrl.createdAt.toISOString(),
            clickCount: 0,
        })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}