import TrackList from "@/app/features/tracks/TrackList";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import Breadcrumbs from "@/app/features/breadcrumbs/Breadcrumbs";

export default function Page() {
  return (
    <div className="container px-2 py-3">
      <div className="flex w-full justify-between pt-1 pb-2 mb-0.5">
        <h1 className="text-3xl font-bold">All uploaded songs</h1>
      </div>
      <Breadcrumbs
        items={[
          {title: "Home", href: "/"},
          {title: "Track list"}
        ]}
      />
      <div className="grid grid-cols-[3rem,2fr,1fr,1fr,10rem,3rem] gap-4 items-center mb-2 pt-2 text-base text-muted-foreground">
        <div className="flex items-center justify-center">#</div>
        <div>Song</div>
        <div>Artist</div>
        <div>Album</div>
        <div>Date added</div>
        <div className="flex items-center justify-center"><Clock className="size-4"/></div>
      </div>
      <Separator className="mb-2"/>
      <TrackList/>
    </div>
  );
};