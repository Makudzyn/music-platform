import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrackCardSkeleton() {
  return (
    <Card className="w-full max-w-80">
      <CardContent className="flex flex-row items-center p-2">
        <div className="relative size-14 shrink-0">
          <Skeleton className="size-14 rounded-sm" />
        </div>
        <div className="flex flex-col text-sm font-semibold leading-normal pl-3 overflow-hidden w-full">
          <Skeleton className="h-4 w-3/4 mb-1" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
}
