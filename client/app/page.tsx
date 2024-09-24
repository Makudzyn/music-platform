import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import TrackSection from "@/app/features/tracks/TrackSection";

export default function Home() {
  return (
    <div className="container max-w-screen-2xl px-4">
      <Link href={"#"} className="flex flex-row items-center w-full py-1.5 mb-4">
        <h2>All uploaded songs</h2>
        <ChevronRight/>
      </Link>
      <TrackSection/>
    </div>
  );
}
