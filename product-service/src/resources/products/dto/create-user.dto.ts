import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  description: string;

  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  count: number;
}
