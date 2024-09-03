'use client';

import "./globals.css";
import { inter } from '@/app/features/fonts';
import { ReactNode, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { HomeOutlined, MusicNoteOutlined, CollectionsOutlined, MenuOpenOutlined } from "@mui/icons-material";
import Link from "next/link";
import Player from "@/app/features/player/Player";
import StoreProvider from "@/app/StoreProvider";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MiniDrawer from "@/app/features/drawer/Drawer";



export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1db954'
      },
      secondary: {
        main: '#000'
      }
    }
  });

  return (
    <html lang="en">
    <body className={`${inter.className} antialiasing`}>
    <AppRouterCacheProvider>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <MiniDrawer/>

          <main className={"p-6 bg-white rounded-sm min-h-full ml-10"}>
            {children}
          </main>

          <Player/>
        </ThemeProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
