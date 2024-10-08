import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TrackSection from "@/app/features/tracks/TrackSection";
import AlbumSection from "@/app/features/albums/AlbumSection";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ArtistSection from "@/app/features/artist/ArtistSection";

export default function Home() {
  return (
    <ScrollArea.Root className="h-full px-2 overflow-hidden shadow shadow-foreground">
      <ScrollArea.Viewport className="size-full rounded-md">
        <div className="container flex flex-col max-w-screen-2xl px-4">
          <div className="container mx-auto px-4 pb-2">
            <Link href={"#"} className="flex flex-row items-center w-full pt-1.5 pb-1 px-4 mt-2 mb-1">
              <h2 className="font-bold text-foreground leading-6">All uploaded songs</h2>
              <ChevronRight/>
            </Link>
            <TrackSection/>
          </div>
          <div className="container mx-auto px-4 pb-2">
            <Link href={"#"} className="flex flex-row items-center w-full pt-1.5 pb-1 px-4 mt-2 mb-1">
              <h2 className="font-bold text-foreground leading-6">All albums</h2>
              <ChevronRight/>
            </Link>
            <AlbumSection/>
          </div>
          <div className="container mx-auto px-4 pb-2">
            <Link href={"#"} className="flex flex-row items-center w-full pt-1.5 pb-1 px-4 mt-2 mb-1">
              <h2 className="font-bold text-foreground leading-6">All artists</h2>
              <ChevronRight/>
            </Link>
            <ArtistSection/>
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-accent-foreground transition-colors duration-300 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-md bg-accent before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-black" />
    </ScrollArea.Root>
  );
}
