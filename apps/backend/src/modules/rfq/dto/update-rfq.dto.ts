import { IsString, IsOptional, IsNumber, Min, IsDateString, MinLength, MaxLength } from 'class-validator';
import { VALIDATION } from '@stockup/shared';

export class UpdateRfqDto {
  @IsString()
  @IsOptional()
  @MinLength(VALIDATION.RFQ_TITLE_MIN_LENGTH)
  @MaxLength(VALIDATION.RFQ_TITLE_MAX_LENGTH)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(VALIDATION.RFQ_DESCRIPTION_MIN_LENGTH)
  @MaxLength(VALIDATION.RFQ_DESCRIPTION_MAX_LENGTH)
  description?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

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
  @IsOptional()
  deadlineAt?: string;
}
