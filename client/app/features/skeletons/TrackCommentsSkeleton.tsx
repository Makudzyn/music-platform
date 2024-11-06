'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function TrackCommentsSkeleton() {
  return (
    <div>
      <h2 className="font-bold text-lg leading-6 text-foreground mt-3 mb-1">
        Comments
      </h2>
      <div className="space-y-6 mt-4 mb-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-start p-4 space-x-4 bg-background border border-border rounded-lg shadow"
          >
            <Avatar>
              <AvatarFallback className="bg-gray-100">
                <Skeleton className="size-full rounded-full" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
