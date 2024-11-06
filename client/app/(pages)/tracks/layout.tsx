import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tracks',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center flex-col h-full">
      {children}
    </div>
  );
}
