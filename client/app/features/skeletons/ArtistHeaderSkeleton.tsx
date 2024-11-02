import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistHeaderSkeleton() {
  return (
    <div className="mb-4 h-full">
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-t to-transparent from-foreground dark:from-background"/>
        <div className="relative overflow-hidden h-[28rem]">
          <Skeleton className="absolute inset-0"/>
          <div className="absolute inset-x-0 bottom-0 z-20 h-6 bg-gradient-to-t to-transparent from-background"/>
        </div>
        <div className="absolute w-full bottom-0 left-0 z-20 max-w-2xl p-6">
          <Skeleton className="mb-4 h-12 w-3/4 md:h-16"/>
          <div className="relative">
            <Skeleton className="h-16 w-full mb-2"/>
            <Skeleton className="h-6 w-24 mt-1"/>
          </div>
          <Skeleton className="h-4 w-48 mt-4"/>
        </div>
      </div>
    </div>
  );
};