import CookieIcon from "./cookie-icon.svg"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isExpanded: boolean;
  toggleDrawer: () => void;
}

export default function Header({isExpanded, toggleDrawer}: HeaderProps) {
  return (
    <header className="h-16 w-full border-b border-yellow-500 bg-background flex items-center justify-between z-50 box-border">
      <div className={"flex justify-center items-center min-w-16 min-h-16 size-16"}>
        <Button variant="ghost" size="icon" onClick={toggleDrawer} className={"size-full box-border rounded-none border-b border-transparent hover:border-yellow-500"}>
          {isExpanded ? <X/> : <Menu />}
          <span className="sr-only"> {isExpanded ? "Collapse menu" : "Expand menu"}</span>
        </Button>
      </div>

      <div className={"flex px-4 w-full justify-between items-center"}>
        <div className="flex items-center space-x-4">
          <Image src={CookieIcon} width={42} height={42} alt={"Cookie Logo"}/>
          <span className="font-semibold text-lg">Cookie Music</span>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input
              type="search"
              placeholder="Search songs, albums, artists"
              className="pl-8 w-64"
            />
          </div>
        </div>

        <Avatar>
          <AvatarImage src="https://github.com/makudzyn.png" alt="User"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
