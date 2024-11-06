import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PlaylistCardSkeleton() {
  return (
    <Card>
      <CardContent className="pb-4 px-0">
        <div className="aspect-square relative overflow-hidden mb-4">
          <Skeleton className="absolute inset-0 rounded-t-md rounded-b-none" />
        </div>
        <div className="px-4 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex flex-row items-center">
            <Skeleton className="h-4 w-11" />
            <Skeleton className="size-1 rounded-full mx-1" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
