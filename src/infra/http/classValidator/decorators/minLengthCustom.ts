import {
  registerDecorator,
  ValidationOptions,
  minLength,
} from 'class-validator';

export function MinLengthCustom(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsMinLengthCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return minLength(value, min);
        },
      },
    });
  };
}
