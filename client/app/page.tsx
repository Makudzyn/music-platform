import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TrackSection from "@/app/features/tracks/TrackSection";

export default function Home() {
  return (
    <div className="container max-w-screen-2xl px-4">
      <Link href={"#"} className="flex flex-row items-center w-full py-1.5 px-4 mb-2">
        <h2 className="font-bold text-foreground leading-6">All uploaded songs</h2>
        <ChevronRight/>
      </Link>
      <TrackSection/>
    </div>
  );
}
