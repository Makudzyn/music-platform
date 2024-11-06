'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteCookie } from 'cookies-next';
import { logout } from '@/lib/redux/userReducer/userSlice';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks/hooks';
import { selectCurrentUser } from '@/lib/redux/userReducer/userSelectors';

export default function ProfileIcon() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={`http://localhost:5000/${user.avatar}`}
            alt={`${user.username}'s avatar`}
          />
          <AvatarFallback>${user.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => router.push('/user/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push('/user/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
