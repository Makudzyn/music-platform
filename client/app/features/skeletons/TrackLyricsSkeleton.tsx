import { Skeleton } from '@ui/skeleton';
import { Button } from '@ui/button';
import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';

export default function TrackLyricsSkeleton() {
  return (
    <div className="mb-5">
      <h2 className="mt-3 mb-1 text-lg font-bold leading-6 text-foreground">
        Lyrics
      </h2>
      <div className="relative rounded-lg">
        <div className="p-6 space-y-2">
          {[...Array(5)].map((_, index) => (
            <Fragment key={index}>
              <Skeleton className="h-4 w-1/3" />
            </Fragment>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t to-transparent from-background" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 flex items-center transition-colors duration-200 text-muted-foreground hover:text-foreground"
        disabled
      >
        <ChevronDown className="mr-1 h-4 w-4" />
        Show more
      </Button>
    </div>
  );
}
