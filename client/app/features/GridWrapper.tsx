'use client';

import { ReactNode, useState } from "react";
import SidePanel from "@/app/features/sidePanel/SidePanel";
import Header from "@/app/features/header/Header";
import Player from "@/app/features/player/Player";

export default function GridWrapper({children}: {children: ReactNode}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleDrawer = () => setIsExpanded(!isExpanded)
  return (
    <div className="grid h-screen grid-cols-6 gap-0 grid-rows-[4rem_1fr_4.5rem]">
      <div className="col-span-6 row-start-1">
        <Header isExpanded={isExpanded} toggleDrawer={toggleDrawer}/>
      </div>
      <aside className="col-span-1 row-start-2 overflow-y-auto">
        <SidePanel isExpanded={isExpanded}/>
      </aside>
      <main className="col-start-2 col-end-6 row-start-2 overflow-auto">
        {children}
      </main>
      <div className="col-span-6 row-start-3">
        <Player/>
      </div>
    </div>
  );
};