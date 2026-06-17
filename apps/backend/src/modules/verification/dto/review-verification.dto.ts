import { IsString, IsOptional, IsIn } from 'class-validator';

export class ReviewVerificationDto {
  @IsString()
  @IsIn(['APPROVED', 'REJECTED'])
  status: 'APPROVED' | 'REJECTED';

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
