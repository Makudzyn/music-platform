import Link from "next/link"
import { cn } from "@/lib/utils"
import { ReactElement } from "react";

interface MenuItemProps {
  item: {
    icon: ReactElement
    label: string
    href: string
  }
  open: boolean
}

export default function MenuItemSh({ item, open }: MenuItemProps) {
  return (
    <li className="px-2">
      <Link
        href={item.href}
        className={cn(
          "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          open ? "justify-start" : "justify-center"
        )}
      >
        <span className={cn(
          "flex items-center justify-center",
          open ? "mr-3" : "mx-auto"
        )}>
          {item.icon}
        </span>
        {open && <span>{item.label}</span>}
      </Link>
    </li>
  )
}