import "./globals.css";
import { inter } from '@/app/features/fonts';
import { ReactNode } from "react";
import ClientProviders from "@/app/features/ClientProviders";
import { Metadata } from "next";

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
    <ClientProviders>
      <main className={"p-6 rounded-sm min-h-full ml-10"}>
        {children}
      </main>
    </ClientProviders>
    </body>
    </html>
  );
}
