import { IsOptional, IsString, IsIn } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class QuotationQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(['SUBMITTED', 'SELECTED', 'NOT_SELECTED'])
  status?: string;
}
