import { IsOptional } from 'class-validator';
import { IsStringCustom } from '../../classValidator/decorators/isStringCustom';

export class UpdateStackBody {
  @IsOptional()
  @IsStringCustom()
  name: string;
}
