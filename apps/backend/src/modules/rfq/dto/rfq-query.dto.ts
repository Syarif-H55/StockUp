import { IsOptional, IsString, IsIn } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class RfqQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['OPEN', 'CLOSED', 'COMPLETED'])
  status?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
