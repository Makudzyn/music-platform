interface FormErrorProps {
  error?: string | null;
}

export default function FormError({ error }: FormErrorProps) {
  return <p className="mt-1 text-sm text-red-500">{error}</p>;
}
