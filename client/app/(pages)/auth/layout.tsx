import CookieLogo from "@/app/features/logo/CookieLogo";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authorization"
};

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-12 bg-background sm:px-6 lg:px-8">
      <div className="mb-4 flex w-48 items-center justify-center md:w-56">
        <CookieLogo/>
      </div>
      <div className="w-full max-w-md rounded-lg p-8 shadow-md bg-accent-foreground">
        {children}
      </div>
    </div>
  );
};