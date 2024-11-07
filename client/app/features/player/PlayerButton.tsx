import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface PlayerButtonProps {
  onClick: () => void;
  icon: ReactNode;
  tooltip: string;
  className?: string;
}

export default function PlayerButton({
  onClick,
  icon,
  tooltip,
  className,
}: PlayerButtonProps) {
  return (
    <CustomTooltip content={tooltip}>
      <div
        onClick={onClick}
        className={cn(
          'size-6 text-foreground transition-all duration-300 cursor-pointer hover:scale-125 hover:text-accent',
          className,
        )}
      >
        {icon}
      </div>
    </CustomTooltip>
  );
}
