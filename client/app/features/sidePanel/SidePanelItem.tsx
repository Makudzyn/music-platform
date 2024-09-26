import Link from "next/link"
import { cn } from "@/lib/utils"
import React, { ReactElement } from "react";
import { Button } from "@/components/ui/button";

interface SidePanelItemProps {
  item: {
    icon: ReactElement
    label: string
    href: string
  }
  isExpanded: boolean
}

export default function SidePanelItem({item, isExpanded}: SidePanelItemProps) {
  return (
    <Link href={item.href} className="my-1 flex items-center justify-center rounded-sm transition-all p-1.5 h-[63px] hover:bg-accent group ">
      <Button variant="ghost" className={cn(
        "flex items-center text-base font-medium w-full group-hover:text-background",
        isExpanded ? "justify-start" : "justify-center"
      )}>
        <span className={cn(isExpanded ? "mr-4" : "mx-auto")}>
          {item.icon}
        </span>
        {isExpanded && <span>{item.label}</span>}
      </Button>
      <span className="sr-only">{item.label}</span>
    </Link>
  )
}