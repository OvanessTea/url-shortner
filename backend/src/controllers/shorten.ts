import { NextFunction, Request, Response } from 'express';
import { CreateUrlDto } from '../dtos/create-url.dto';
import { nanoid } from 'nanoid';
import { validateDto } from '../helpers/validate';
import { getRepositories } from '../helpers/getRepos';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const shortenController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = new CreateUrlDto();
        dto.originalUrl = req.body.originalUrl;
        dto.expiresAt = req.body.expiresAt;
        dto.alias = req.body.alias;

        if (dto.alias && dto.alias.length > 20) {
            throw new BadRequestError('Alias must be at most 20 characters long');
        }

        await validateDto(dto, res);

        const { urlRepo } = getRepositories();
        const { originalUrl, expiresAt, alias } = dto;

        if (alias) {
            const exists = await urlRepo.findOne({ where: { alias } });
            if (exists) {
                throw new ConflictError('Alias already exists');
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
        if (error instanceof BadRequestError) {
            return next(error);
        }
        if (error instanceof ConflictError) {
            return next(error);
        }
        next(error);
    }
}