import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Кастомная функция для проверки формата даты
export function IsFormattedDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFormattedDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Регулярное выражение для проверки формата даты DD Mon, YYYY
          const dateRegex = /^\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec), \d{4}$/;
          return typeof value === 'string' && dateRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Date ($value) is not in the correct format (e.g., 12 Oct, 2024)';
        },
      },
    });
  };
}