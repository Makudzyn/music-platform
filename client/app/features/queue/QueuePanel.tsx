'use client';

import { cn } from '@lib/utils';
import { Fragment } from 'react';
import { useAppSelector } from '@hooks/hooks';
import QueueItem from '@/app/features/queue/QueueItem';
import { ScrollArea } from '@ui/scroll-area';
import { Play } from 'lucide-react';

interface QueuePanelProps {
  isExpanded: boolean;
}

export default function QueuePanel({ isExpanded }: QueuePanelProps) {
  const { queue } = useAppSelector((state) => state.player);

  return (
    <ScrollArea
      className={cn(
        'h-full ml-auto bg-background box-border border-border transition-all transform ease-in-out duration-300 z-40',
        isExpanded
          ? 'w-[16.55rem] border-l translate-x-0 opacity-100'
          : 'border-l translate-x-full opacity-0 w-64',
      )}
    >
      <nav className="py-3 pl-1 pr-2 transition-all duration-300">
        {queue && queue.length > 0 ? (
          queue.map((track, index) => (
            <Fragment key={track._id}>
              <QueueItem track={track} index={index} />
            </Fragment>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 text-sm text-muted-foreground">
            <Play className="w-12 h-12 mb-3 fill-muted" />
            <p className="mb-1 font-semibold">Here you will see music queue</p>
            <p className="text-muted-foreground">
              Start playing an album or track to see the list here
            </p>
          </div>
        )}
      </nav>
    </ScrollArea>
  );
}
