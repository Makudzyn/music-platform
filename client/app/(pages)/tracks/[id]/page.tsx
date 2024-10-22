import Breadcrumbs from "@/app/features/breadcrumbs/Breadcrumbs";
import ScrollWrapper from "@/app/features/scroll/ScrollWrapper";
import TrackView from "@/app/features/tracks/TrackView";

export default function Page({params}: {params: {id: string}}) {
  const id = params.id;

  return (
    <ScrollWrapper>
      <div className="container px-2 py-3">
        <div className="my-2">
          <Breadcrumbs
            items={[
              {title: "Home", href: "/"},
              {title: "Tracks", href: "/tracks"},
              {title: "Current track"}
            ]}
          />
        </div>
        <TrackView trackId={id}/>
      </div>
    </ScrollWrapper>
  );
};
