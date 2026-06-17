import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class AddSupplierCategoriesDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  categoryIds: string[];
}
