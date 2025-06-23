import { validate } from 'class-validator';
import { Response } from 'express';
import BadRequestError from '../errors/bad-request-error';

export async function validateDto(dto: object, res: Response) {
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new BadRequestError(errors[0].toString());
  }
}