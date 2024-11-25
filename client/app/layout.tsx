import './globals.css';
import { inter } from '@/app/features/fonts';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import StoreProvider from '@/app/providers/StoreProvider';
import GridWrapper from '@/app/features/GridWrapper';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Cookie Music',
    default: 'Cookie Music',
  },
  description:
    'Cookie music is a platform where you can explore a vast collection of tracks and albums, follow your favorite artists,' +
    ' enjoy seamless audio playback and a user-friendly interface tailored to music lovers.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiasing`}>
        <StoreProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <GridWrapper>{children}</GridWrapper>
            </ThemeProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
