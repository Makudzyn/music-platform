import "./globals.css";
import { inter } from '@/app/features/fonts';
import { ReactNode } from "react";
import { Metadata } from "next";
import StoreProvider from "@/app/providers/StoreProvider";
import GridWrapper from "@/app/features/GridWrapper";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: '%s | Cookie Music',
    default: 'Cookie Music'
  },
  description: 'Music platform where you can listen to your favorite songs, albums and create your own playlists.'
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} antialiasing`}>
    <StoreProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <GridWrapper>
            {children}
          </GridWrapper>
        </ThemeProvider>
      </AuthProvider>
    </StoreProvider>
    </body>
    </html>
  );
}

