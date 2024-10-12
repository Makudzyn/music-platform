import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TrackSection from "@/app/features/tracks/TrackSection";
import AlbumSection from "@/app/features/playlists/albums/AlbumSection";
import ArtistSection from "@/app/features/artist/ArtistSection";
import ScrollWrapper from "@/app/features/scroll/ScrollWrapper";

export default function Home() {
  return (
    <ScrollWrapper>
      <div className="container flex max-w-screen-2xl flex-col px-4">
        <div className="container mx-auto px-4 pb-2">
          <Link href="/tracks" className="mt-2 mb-1 flex w-full flex-row items-center px-4 pb-1 pt-1.5">
            <h2 className="font-bold leading-6 text-foreground">All songs</h2>
            <ChevronRight/>
          </Link>
          <TrackSection/>
        </div>
        <div className="container mx-auto px-4 pb-2">
          <Link href={"#"} className="mt-2 mb-1 flex w-full flex-row items-center px-4 pb-1 pt-1.5">
            <h2 className="font-bold leading-6 text-foreground">All albums</h2>
            <ChevronRight/>
          </Link>
          <AlbumSection/>
        </div>
        <div className="container mx-auto px-4 pb-2">
          <Link href={"#"} className="mt-2 mb-1 flex w-full flex-row items-center px-4 pb-1 pt-1.5">
            <h2 className="font-bold leading-6 text-foreground">All artists</h2>
            <ChevronRight/>
          </Link>
          <ArtistSection/>
        </div>
      </div>
    </ScrollWrapper>
  );
}
