'use client';

import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import { ReactElement } from "react";

interface MenuItemProps {
  item: {icon: ReactElement, label: string, href: string};
  open: boolean;
}

export default function MenuItem({item, open}: MenuItemProps) {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link href={item.href}>
        <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};