'use client';

import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RouteNotFoundError() {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="text-center space-y-8 p-8 w-full">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <FileQuestion className="size-64"/>
          </div>
          <div className="relative z-10">
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>
        <Button asChild variant="default">
          <Link href="/">
            <Home className="mr-2 h-4 w-4"/>
            Go to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};