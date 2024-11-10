import { Card, CardContent } from '@ui/card';
import { Skeleton } from '@ui/skeleton';

export default function AlbumCardSkeleton() {
  return (
    <Card className="relative aspect-square w-full overflow-hidden">
      <Skeleton className="absolute inset-0" />
      <CardContent className="absolute px-2 py-1 inset-x-0 bottom-0 flex flex-col justify-center border-t border-accent bg-foreground/60" />
    </Card>
  );
}
