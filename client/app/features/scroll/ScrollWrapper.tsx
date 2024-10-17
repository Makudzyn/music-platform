import * as ScrollArea from "@radix-ui/react-scroll-area";
import { LegacyRef, ReactNode, RefObject } from "react";

interface ScrollWrapperProps {
  children: ReactNode;
  scrollRef?: LegacyRef<HTMLDivElement>;
}

export default function ScrollWrapper({children, scrollRef}: ScrollWrapperProps) {
  return (
    <ScrollArea.Root className="size-full overflow-hidden px-2 shadow shadow-foreground">
      <ScrollArea.Viewport className="rounded-md size-full" ref={scrollRef}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-accent-foreground transition-colors duration-300 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb
          className="before:absolute relative before:top-1/2 before:left-1/2 flex-1 before:-translate-x-1/2 before:-translate-y-1/2 rounded-md bg-accent before:size-full before:min-h-11 before:min-w-11"/>
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-black"/>
    </ScrollArea.Root>
  );
}
