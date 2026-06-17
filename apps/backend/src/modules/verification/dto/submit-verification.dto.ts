import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class SubmitVerificationDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  documentUrl: string;
}
