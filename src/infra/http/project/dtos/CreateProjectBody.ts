import { IsArray, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotEmptyCustom } from '../../classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from '../../classValidator/decorators/isStringCustom';

export class CreateProjectBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  title: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  description: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  videoUrl: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  projectUrl: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  githubUrl: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  coverUrl: string;

  @IsNotEmptyCustom()
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
