import { Button } from '@ui/button';
import { ReactNode } from 'react';

interface FormButtonProps {
  children?: ReactNode;
  disabled?: boolean;
}

export default function FormButton({ children, disabled }: FormButtonProps) {
  return (
    <Button
      size="lg"
      type="submit"
      className="w-full rounded-md px-4 text-base font-medium transition duration-300 py-2.5"
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
