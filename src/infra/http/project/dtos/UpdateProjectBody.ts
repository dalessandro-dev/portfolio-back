import { IsArray, IsInt, IsOptional } from 'class-validator';
import { IsStringCustom } from '../../classValidator/decorators/isStringCustom';
import { Transform } from 'class-transformer';

export class UpdateProjectBody {
  @IsOptional()
  @IsStringCustom()
  title: string;

  @IsOptional()
  @IsStringCustom()
  description: string;

  @IsOptional()
  @IsStringCustom()
  videoUrl: string;

  @IsOptional()
  @IsStringCustom()
  projectUrl: string;

  @IsOptional()
  @IsStringCustom()
  githubUrl: string;

  @IsOptional()
  @IsStringCustom()
  coverUrl: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value)
      ? value.map((item) => Number(item))
      : [Number(value)];
  })
  stacksId: number[];
}
