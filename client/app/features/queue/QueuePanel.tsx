'use client';

import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { useAppSelector } from "@/lib/hooks";
import QueueItem from "@/app/features/queue/QueueItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QueuePanelProps {
  isExpanded: boolean;
}

export default function QueuePanel({isExpanded}: QueuePanelProps) {
  const {queue} = useAppSelector(state => state.player);
  console.log("Tracks in Q:", queue)
  return (
    <ScrollArea
      className={cn(
        "h-full ml-auto bg-background box-border border-border transition-all transform ease-in-out duration-300 z-40",
        isExpanded ? "w-[16.55rem] border-l translate-x-0 opacity-100" : "border-l translate-x-full opacity-0 w-64"
      )}
    >
      <nav className="py-3 pl-1 pr-2 transition-all duration-300">
        {queue.map((track, index) => (
          <Fragment key={track._id}>
            <QueueItem track={track} index={index}/>
          </Fragment>
        ))}
      </nav>
    </ScrollArea>
  );
};