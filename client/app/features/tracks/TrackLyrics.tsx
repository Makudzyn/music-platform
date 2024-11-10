'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@ui/button';
import { cn } from '@lib/utils';

interface TrackLyricsParams {
  lyrics: string;
}

export default function TrackLyrics({ lyrics }: TrackLyricsParams) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-5">
      <h2 className="mt-3 mb-1 text-lg font-bold leading-6 text-foreground">
        Lyrics
      </h2>
      <div className="relative rounded-lg">
        <div>
          {/* Первый блок - всегда видимые первые строки */}
          <div
            className={cn(
              'p-6 pb-0 rounded-lg whitespace-pre-wrap h-36 overflow-hidden relative w-full transition-opacity duration-700',
              isExpanded ? 'opacity-0 hidden' : 'opacity-100',
            )}
          >
            {lyrics}
          </div>

          {/* Второй блок - разворачиваемое содержимое */}
          <div
            className={cn(
              'grid transition-[grid-template-rows] duration-700 ease-in-out',
              isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            )}
          >
            <div className="overflow-hidden">
              <div className="whitespace-pre-wrap rounded-lg p-6">{lyrics}</div>
            </div>
          </div>
        </div>

        {!isExpanded && (
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t to-transparent from-background" />
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleExpand}
        className="mt-2 flex items-center transition-colors duration-200 text-muted-foreground hover:text-foreground"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="mr-1 h-4 w-4" />
            Show less
          </>
        ) : (
          <>
            <ChevronDown className="mr-1 h-4 w-4" />
            Show more
          </>
        )}
      </Button>
    </div>
  );
}
