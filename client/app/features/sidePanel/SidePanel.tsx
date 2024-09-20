import { Fragment } from "react"
import { Home, Music, Album, Menu, X } from "lucide-react"
import SidePanelItem from "@/app/features/sidePanel/SidePanelItem";
import { cn } from "@/lib/utils";

const sidePanelItems = [
  {icon: <Home className="size-6"/>, label: 'Main page', href: "/"},
  {icon: <Music className="size-6"/>, label: 'Track list', href: "/tracks"},
  {icon: <Album className="size-6"/>, label: 'Album list', href: "/albums"}
];

interface SidePanelProps {
  isExpanded: boolean;
}

export default function SidePanel({isExpanded}: SidePanelProps) {
  return (
    <div
      className={cn(
        "h-full bg-background box-border border-r border-yellow-500 transition-all duration-300 ease-in-out flex flex-col z-40 ",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <nav className={"flex-1 overflow-y-auto py-4"}>
        {sidePanelItems.map((item) => (
          <Fragment key={item.href}>
            <SidePanelItem item={item} isExpanded={isExpanded}/>
          </Fragment>
        ))}
      </nav>
    </div>
  )
}
