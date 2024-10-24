'use client';

import { ReactNode, useState } from "react";
import SidePanel from "@/app/features/sidePanel/SidePanel";
import Header from "@/app/features/header/Header";
import Player from "@/app/features/player/Player";
import QueuePanel from "@/app/features/queue/QueuePanel";

export default function GridWrapper({children}: {children: ReactNode}) {
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(false);
  const [isQueueExpanded, setIsQueueExpanded] = useState<boolean>(false);

  const toggleNavPanel = () => setIsNavExpanded(!isNavExpanded);
  const toggleQueuePanel = () => setIsQueueExpanded(!isQueueExpanded);

  return (
    <div className="grid h-screen grid-cols-6 gap-0 grid-rows-[4rem_1fr_4.5rem]">
      <div className="col-span-6 row-start-1">
        <Header isExpanded={isNavExpanded} toggleNavPanel={toggleNavPanel}/>
      </div>
      <aside className="col-span-1 row-start-2 overflow-hidden">
        <SidePanel isExpanded={isNavExpanded}/>
      </aside>
      <main className="col-start-2 col-end-6 row-start-2 overflow-auto">
        {children}
      </main>
      <aside className="col-span-6 row-start-2 overflow-y-auto overflow-x-hidden">
        <QueuePanel isExpanded={isQueueExpanded} />
      </aside>
      <div className="col-span-6 row-start-3">
        <Player toggleQueuePanel={toggleQueuePanel}/>
      </div>
    </div>
  );
};