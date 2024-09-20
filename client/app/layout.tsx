import "./globals.css";
import { inter } from '@/app/features/fonts';
import { ReactNode } from "react";
import { Metadata } from "next";
import StoreProvider from "@/app/StoreProvider";
import GridWrapper from "@/app/features/GridWrapper";

export const metadata: Metadata = {
  title: {
    template: '%s | Cookie Music',
    default: 'Cookie Music'
  },
  description: 'Music platform where you can listen to your favorite songs, albums and create your own playlists.'
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiasing`}>
    <StoreProvider>
      <GridWrapper>
        {children}
      </GridWrapper>
    </StoreProvider>
    </body>
    </html>
  );
}
