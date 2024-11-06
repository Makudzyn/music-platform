import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  PlayCircle,
  Heart,
  Share2,
  Calendar,
  Clock,
  Wifi,
  FileAudio,
} from 'lucide-react';

export default function TrackHeaderSkeleton() {
  return (
    <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-center">
      <div className="relative flex-shrink-0 rounded-sm shadow-lg size-48 md:size-64">
        <Skeleton className="size-full" />
      </div>

      <div className="w-full">
        <Skeleton className="mb-4 h-10 w-3/4 md:h-14" />
        <div className="flex items-center text-sm space-x-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="size-1 rounded-full mx-1 bg-foreground" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="size-1 rounded-full mx-1 bg-foreground" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="pr-4">
          <Separator className="text-muted-foreground mb-6 mt-2" />
        </div>
        <div className="flex gap-4 mb-6">
          <Button size="lg" className="rounded-full" disabled>
            <PlayCircle className="mr-2 h-6 w-6" />
            Play
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            disabled
          >
            <Heart className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            disabled
          >
            <Share2 className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center">
            <Wifi className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center">
            <FileAudio className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
