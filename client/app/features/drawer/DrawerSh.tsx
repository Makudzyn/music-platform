"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home, Music, Album, ChevronLeft, ChevronRight } from "lucide-react"
import MenuItemSh from "@/app/features/drawer/MenuItemSh";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const menuItems = [
  { icon: <Home className="h-4 w-4" />, label: 'Main page', href: "/" },
  { icon: <Music className="h-4 w-4" />, label: 'Track list', href: "/tracks" },
  { icon: <Album className="h-4 w-4" />, label: 'Album list', href: "/albums" },
];

export default function DrawerSh() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="flex items-center justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <nav className="space-y-1 p-2">
            {menuItems.map((item) => (
              <React.Fragment key={item.label}>
                <MenuItemSh item={item} open={open} />
              </React.Fragment>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
