import { IsNotEmptyCustom } from '../../classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from '../../classValidator/decorators/isStringCustom';

export class CreateStackBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;
}
