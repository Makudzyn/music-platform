import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TrackSection from "@/app/features/tracks/TrackSection";
import AlbumSection from "@/app/features/albums/AlbumSection";

export default function Home() {
  return (
    <div className="container flex flex-col max-w-screen-2xl px-4">
      <div className="container mx-auto px-4">
        <Link href={"#"} className="flex flex-row items-center w-full pt-1.5 pb-1 px-4 mt-2 mb-1">
          <h2 className="font-bold text-foreground leading-6">All uploaded songs</h2>
          <ChevronRight/>
        </Link>
        <TrackSection/>
      </div>
      <div className="container mx-auto px-4">
        <Link href={"#"} className="flex flex-row items-center w-full pt-1.5 pb-1 px-4 mt-2 mb-1">
          <h2 className="font-bold text-foreground leading-6">All albums</h2>
          <ChevronRight/>
        </Link>
        <AlbumSection/>
      </div>
    </div>
  );
}
