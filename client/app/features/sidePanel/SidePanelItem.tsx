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
    <Button variant="ghost" className={cn(
      "flex items-center my-2 py-2 px-3 rounded-sm text-base font-medium transition-all w-full",
      "hover:bg-accent hover:text-accent-foreground",
      isExpanded ? "justify-start" : "justify-center"
    )}>
      <Link href={item.href} className={"flex items-center justify-center transition-all"}>
        <span className={cn(isExpanded ? "mr-4" : "mx-auto")}>
          {item.icon}
        </span>
        {isExpanded && <span>{item.label}</span>}
      </Link>
      <span className="sr-only">{item.label}</span>
    </Button>
  )
}