import { IsNotEmptyCustom } from '../../classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from '../../classValidator/decorators/isStringCustom';
import { MinLengthCustom } from '../../classValidator/decorators/minLengthCustom';
import { IsEmailCustom } from '../../classValidator/decorators/isEmailCustom';

export class SignInBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
}
