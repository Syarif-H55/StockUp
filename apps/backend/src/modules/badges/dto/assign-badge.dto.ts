import { IsString, IsNotEmpty } from 'class-validator';

export class AssignBadgeDto {
  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @IsString()
  @IsNotEmpty()
  badgeId: string;
}
