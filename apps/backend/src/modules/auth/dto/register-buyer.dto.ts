import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { VALIDATION } from '@stockup/shared';

export class RegisterBuyerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(VALIDATION.PASSWORD_MIN_LENGTH)
  @MaxLength(VALIDATION.PASSWORD_MAX_LENGTH)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(VALIDATION.BUSINESS_NAME_MIN_LENGTH)
  @MaxLength(VALIDATION.BUSINESS_NAME_MAX_LENGTH)
  businessName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(VALIDATION.PHONE_MIN_LENGTH)
  @MaxLength(VALIDATION.PHONE_MAX_LENGTH)
  phoneNumber: string;

  @IsString()
  address?: string;
}
