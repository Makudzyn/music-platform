import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-screen-lg h-full">
      <div className="my-14 flex h-full w-full max-w-screen-lg items-center justify-center mx-1.5 py-2.5 px-1.5">
        {children}
      </div>
    </div>
  );
}
