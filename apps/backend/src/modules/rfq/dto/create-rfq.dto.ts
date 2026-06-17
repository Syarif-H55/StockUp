import { IsString, IsOptional, IsNumber, Min, IsDateString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { VALIDATION } from '@stockup/shared';

export class CreateRfqDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(VALIDATION.RFQ_TITLE_MIN_LENGTH)
  @MaxLength(VALIDATION.RFQ_TITLE_MAX_LENGTH)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(VALIDATION.RFQ_DESCRIPTION_MIN_LENGTH)
  @MaxLength(VALIDATION.RFQ_DESCRIPTION_MAX_LENGTH)
  description: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  quantity?: number;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  budget?: number;

  @IsDateString()
  @IsNotEmpty()
  deadlineAt: string;
}
