import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export default function FormButton({children}: ReactNode) {
  return (
    <Button
      size="lg"
      type="submit"
      className="w-full rounded-md px-4 text-base font-medium transition duration-300 py-2.5"
    >
      {children}
    </Button>
  );
};