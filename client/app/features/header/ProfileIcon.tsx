'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteCookie } from "cookies-next";
import { logout } from "@/lib/redux/authSlice";
import { redirect } from "next/navigation";

export default function ProfileIcon() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch(logout())
    redirect("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src="https://github.com/makudzyn.png"
            alt="User"
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => console.log("Profile clicked")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log("Settings clicked")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};