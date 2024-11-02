import TrackItemSkeleton from "@/app/features/skeletons/TrackItemSkeleton";
import { Fragment } from "react";

export default function TrackListGenericSkeleton() {
  return (
    <div className="grid grid-cols-[3rem,1.5fr,1fr,1fr,8rem,3.75rem] gap-x-4 gap-y-2 items-center pb-2 rounded-md">
      {[...Array(5)].map((_, index) => (
        <Fragment key={index}>
          <TrackItemSkeleton />
        </Fragment>
      ))}
    </div>
  )
}