import { Skeleton } from '@/components/ui/skeleton';

export default function AlbumHeaderSkeleton() {
  return (
    <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-center">
      <Skeleton className="relative flex-shrink-0 rounded-sm shadow-lg size-48 md:size-64" />
      <div className="flex flex-col items-start w-full">
        <Skeleton className="mb-1 h-4 w-20" />
        <Skeleton className="mb-4 h-10 w-[55%]" />
        <Skeleton className="mb-2 h-16 w-full" />
        <div className="flex items-center space-x-2 w-full">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="size-1 rounded-full bg-foreground" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="size-1 rounded-full bg-foreground" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>
    </div>
  );
}
