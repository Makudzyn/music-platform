import Link from 'next/link';
import { cn } from '@/lib/utils';
import React, { ReactElement } from 'react';
import { Button } from '@/components/ui/button';

interface SidePanelItemProps {
  item: {
    icon: ReactElement;
    label: string;
    href: string;
  };
  isExpanded: boolean;
}

export default function SidePanelItem({
  item,
  isExpanded,
}: SidePanelItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'my-1 flex items-center rounded-sm transition-all p-1 h-[63px] tr hover:bg-accent group',
        !isExpanded && 'justify-center',
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'flex items-center p-0 m-0 text-base font-medium w-full group-hover:text-background transition-all',
          isExpanded ? 'justify-start ml-4 mr-2' : 'justify-center',
        )}
      >
        <span
          className={cn(
            'flex items-center justify-center',
            isExpanded ? 'mr-4' : 'mx-auto',
          )}
        >
          {item.icon}
        </span>
        {isExpanded && <span>{item.label}</span>}
      </Button>
      <span className="sr-only">{item.label}</span>
    </Link>
  );
}
