import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PlayerButtonProps {
  onClick: () => void;
  icon: ReactNode;
  className?: string;
}

export default function PlayerButton({onClick, icon, className}: PlayerButtonProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "size-6 text-foreground transition-all duration-300 cursor-pointer hover:scale-125 hover:text-accent",
        className
      )}
    >
      {icon}
    </div>
  );
}
