import { validate } from 'class-validator';
import { Response } from 'express';

export async function validateDto(dto: object, res: Response) {
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors[0].toString() });
  }
}