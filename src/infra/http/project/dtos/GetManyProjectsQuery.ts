import { IsArray, IsOptional, IsInt, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetManyProjectsQuery {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value)
      ? value.map((item) => Number(item))
      : [Number(value)];
  })
  stacksId?: number[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  perPage: number = 10;

  @IsOptional()
  @IsString()
  query?: string;
}
