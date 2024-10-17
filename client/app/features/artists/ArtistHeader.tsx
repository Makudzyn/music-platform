'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Artist } from "@/lib/defenitions";

interface ArtistHeaderProps {
  artist: Artist;
}

export default function ArtistHeader({artist}: ArtistHeaderProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="mb-4 h-full">
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-t to-transparent from-foreground"/>
        <div className={cn(
          "relative overflow-hidden transition-all duration-500",
          isExpanded ? "h-[32rem]" : "h-[28rem]"
        )}>
          <Image
            src={`http://localhost:5000/${artist.artistImage}`}
            alt={`${artist.name} cover`}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-x-0 bottom-0 z-20 h-6 bg-gradient-to-t to-transparent from-background"/>
        </div>
        <div className="absolute bottom-0 left-0 z-20 max-w-2xl p-6">
          <h1 className="mb-4 text-4xl font-bold drop-shadow-lg text-primary-foreground md:text-6xl">
            {artist.name}
          </h1>
          <div className="relative">
            <p
              className={cn(
                "text-sm md:text-base text-primary-foreground/90 mb-2 transition-all duration-500 drop-shadow-md",
                isExpanded ? 'max-h-[62.5rem]' : 'max-h-12 overflow-hidden opacity-90'
              )}>
              {artist.aboutInfo}
            </p>
            {artist.aboutInfo.length > 100 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 p-0 transition-all duration-500 text-primary-foreground/80 hover:text-primary-foreground"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <div className="flex justify-center items-center h-5">
                    Show less <ChevronUp className="ml-1 size-5"/>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-5">
                    Show more <ChevronDown className="ml-1 size-5"/>
                  </div>
                )}
              </Button>
            )}
          </div>
          <p className="text-sm text-primary-foreground/80">
            {artist.totalListens} all time listens
          </p>
        </div>
      </div>
    </div>
  );
};