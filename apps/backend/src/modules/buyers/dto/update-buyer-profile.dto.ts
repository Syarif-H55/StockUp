import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { VALIDATION } from '@stockup/shared';

export class UpdateBuyerProfileDto {
  @IsString()
  @IsOptional()
  @MinLength(VALIDATION.BUSINESS_NAME_MIN_LENGTH)
  @MaxLength(VALIDATION.BUSINESS_NAME_MAX_LENGTH)
  businessName?: string;

  @IsString()
  @IsOptional()
  @MinLength(VALIDATION.PHONE_MIN_LENGTH)
  @MaxLength(VALIDATION.PHONE_MAX_LENGTH)
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
