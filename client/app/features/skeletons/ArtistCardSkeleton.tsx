import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ArtistCardSkeleton() {
  return (
    <Card className="border-none shadow-none transition-colors duration-300 group bg-background hover:shadow mb-1">
      <CardContent className="p-4">
        <div className="relative mb-4 aspect-square overflow-hidden rounded-full">
          <Skeleton className="absolute inset-0" />
        </div>
        <div className="text-start space-y-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}