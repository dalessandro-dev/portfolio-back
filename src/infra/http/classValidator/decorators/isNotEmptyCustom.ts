import {
  registerDecorator,
  ValidationOptions,
  isNotEmpty,
} from 'class-validator';

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isNotEmpty(value);
        },
      },
    });
  };
}
