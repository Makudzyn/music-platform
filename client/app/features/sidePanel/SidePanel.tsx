import { Fragment } from "react"
import { Home, Music, Album, MicVocal } from "lucide-react"
import SidePanelItem from "@/app/features/sidePanel/SidePanelItem";
import { cn } from "@/lib/utils";

const sidePanelItems = [
  {icon: <Home className="size-6"/>, label: 'Main page', href: "/"},
  {icon: <Music className="size-6"/>, label: 'Tracks', href: "/tracks"},
  {icon: <Album className="size-6"/>, label: 'Albums', href: "/albums"},
  {icon: <MicVocal className="size-6"/>, label: 'Artists', href: "/artists"},
];

interface SidePanelProps {
  isExpanded: boolean;
}

export default function SidePanel({isExpanded}: SidePanelProps) {
  return (
    <div
      className={cn(
        "h-full bg-background box-border border-r border-border transition-all duration-300 flex flex-col z-40",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <nav className="flex-1 py-3 transition-all duration-300">
        {sidePanelItems.map((item) => (
          <Fragment key={item.href}>
            <SidePanelItem item={item} isExpanded={isExpanded}/>
          </Fragment>
        ))}
      </nav>
    </div>
  )
}
