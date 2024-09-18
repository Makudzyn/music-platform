import "./globals.css";
import { inter } from '@/app/features/fonts';
import { ReactNode } from "react";
import { Metadata } from "next";
import DrawerSh from "@/app/features/drawer/DrawerSh";
import Player from "@/app/features/player/Player";
import StoreProvider from "@/app/StoreProvider";

export const metadata: Metadata = {
  title: {
    template: '%s | Cookie Music',
    default: 'Cookie Music',
  },
  description: 'Music platform where you can listen to your favorite songs, albums and create your own playlists.',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiasing`}>
    <StoreProvider>
      {/*<DrawerSh/>*/}

      {children}

      {/*<Player/>*/}

    </StoreProvider>
    </body>
    </html>
  );
}
