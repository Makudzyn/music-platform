import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { ReactNode } from 'react';
import FormError from '@/app/features/auth/FormError';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: ReactNode;
  register: UseFormRegister<FieldValues>;
  autoComplete?: string;
  error?: FieldError;
  validation?: object;
}

export function FormInput({
  id,
  label,
  type,
  placeholder,
  icon,
  register,
  autoComplete,
  error,
  validation = {},
}: FormInputProps) {
  return (
    <div>
      <label className="block text-base font-medium mb-1.5" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Input
          type={type}
          id={id}
          autoComplete={autoComplete}
          {...register(id, validation)}
          placeholder={placeholder}
          className="py-2 pr-3 pl-11 text-base transition-all duration-300 bg-background peer placeholder-muted-foreground focus-visible:ring-accent focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-0"
        />
        <Separator
          orientation="vertical"
          className="pointer-events-none absolute top-1/2 left-9 h-full -translate-y-1/2 w-[1.5px] bg-muted-foreground peer-focus:bg-accent"
        />
        <div className="flex justify-center items-center pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground peer-focus:text-accent">
          {icon}
        </div>
      </div>
      {error && <FormError error={error.message} />}
    </div>
  );
}
