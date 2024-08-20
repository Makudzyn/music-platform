'use client';

import "./globals.css";
import { inter } from '@/app/ui/fonts';
import { ReactNode, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { HomeOutlined, MusicNoteOutlined, CollectionsOutlined, MenuOpenOutlined } from "@mui/icons-material";
import Link from "next/link";
import Player from "@/app/ui/player/Player";

import StoreProvider from "@/app/StoreProvider";

const menuItems = [
  {
    "icon": <HomeOutlined/>,
    "label": 'Main page',
    "href": "/"
  },
  {
    "icon": <MusicNoteOutlined/>,
    "label": 'Track list',
    "href": "/tracks"
  },
  {
    "icon": <CollectionsOutlined/>,
    "label": 'Album list',
    "href": "/albums"
  }
];

export default function RootLayout({children}: Readonly<{children: ReactNode;}>) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (currentState: boolean) => () => {
    setOpen(!currentState);
  };
  return (
    <html lang="en">
    <body className={`${inter.className} antialiasing`}>
    <AppRouterCacheProvider>
      <StoreProvider>
        <Drawer
          open={open}
          onClose={toggleDrawer(open)}
          anchor={"left"}
        >
          <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(open)}>
            <List>
              {menuItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <Link
                    href={item.href}
                    className="flex flex-row py-3 gap-x-2 border-b border-gray-500 w-full"
                  >
                    <ListItemIcon sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label}/>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Button
          onClick={toggleDrawer(open)}
          sx={{
            position: "absolute",
            top: 25,
            left: open ? "250px" : "0",
            width: 40,
            height: 40,
            zIndex: 1400,
            bgcolor: "white",
            border: "1px solid black",
            borderLeft: "none",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            transition: "left .225s cubic-bezier(0, 0, 0.2, 1), color .3s ease, background-color .3s ease",
            "&:hover": {
              bgcolor: "lightgreen",
              borderColor: "darkgreen",
              "& .MuiSvgIcon-root": {
                color: "black"
              }
            }
          }}
        >
          <MenuOpenOutlined
            sx={{
              color: "darkgreen",
              transform: open ? "rotate(0deg)" : "rotate(180deg)"
            }}
          />
        </Button>

        <main className={"p-6 bg-white rounded-sm min-h-full ml-10"}>
          {children}
        </main>

        <Player/>
      </StoreProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
