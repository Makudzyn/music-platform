import { Skeleton } from '@/components/ui/skeleton';

export default function TrackItemSkeleton() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Skeleton className="size-5" />
      </div>
      <div className="flex items-center space-x-3">
        <Skeleton className="size-12" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-12" />
    </>
  );
}
