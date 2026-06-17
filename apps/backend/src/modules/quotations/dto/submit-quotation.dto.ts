import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';
import { VALIDATION } from '@stockup/shared';

export class SubmitQuotationDto {
  @IsNumber()
  @Min(0)
  priceOffer: number;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minimumOrderQuantity?: number;

  @IsString()
  @IsOptional()
  estimatedDeliveryTime?: string;

  @IsString()
  @IsOptional()
  @MaxLength(VALIDATION.NOTES_MAX_LENGTH)
  notes?: string;
}
