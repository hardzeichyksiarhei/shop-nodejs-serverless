import { Type } from "class-transformer";
import { IsNotEmpty, IsString, Min, IsInt } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  count: number;
}
