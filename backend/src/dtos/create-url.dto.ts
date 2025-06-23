import { IsUrl, IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreateUrlDto {
  @IsUrl({}, { message: 'Please provide a valid URL' })
  originalUrl!: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Alias must be at most 20 characters long' })
  alias?: string;
}