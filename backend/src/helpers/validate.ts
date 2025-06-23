import { validate } from 'class-validator';
import { Response } from 'express';
import BadRequestError from '../errors/bad-request-error';

export async function validateDto(dto: object, res: Response) {
  const errors = await validate(dto);
  if (errors.length > 0) {
    const firstError = errors[0];
    const constraints = firstError.constraints;
    const errorMessage = constraints ? Object.values(constraints)[0] : 'Validation failed';
    throw new BadRequestError(errorMessage);
  }
}