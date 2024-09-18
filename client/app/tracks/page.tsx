import Link from "next/link";
import TrackList from "@/app/features/tracks/TrackList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Clock, Upload } from "lucide-react";

export default function Page() {
  return (
    <div className={"max-w-screen-lg"}>
      <Breadcrumb aria-label="breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Tracks</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <div className={"flex justify-between w-full py-1.5 mb-0.5"}>
          <h2>Track list</h2>
          <div>
            <Link href="/tracks/upload">
              <Upload className={"size-6 text-green-500"}/>
            </Link>
          </div>
        </div>
        <div className={"flex flex-col w-full"}>
          <div className={"flex flex-nowrap flex-row py-1 mb-1"}>
            <div className="min-w-6 mx-1 flex justify-center items-center">#</div>
            <div className="min-w-80 mx-1 flex justify-start items-center">Title</div>
            <div className="min-w-72 flex mx-1 justify-start items-center">Artist</div>
            <div className="min-w-48 flex mx-1 justify-start items-center">Date Added</div>
            <div className="min-w-28 flex mx-1 justify-start items-center">Current</div>
            <div className="w-full flex mx-1 justify-center items-center">
              <Clock className="size-6"/>
            </div>
          </div>

          <Separator/>
        </div>
        <TrackList/>
      </div>
    </div>
  );
};