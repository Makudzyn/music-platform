'use client';

import Image from 'next/image';
import { Badge } from '@ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { CalendarDays, Mail, User, Shield, Info } from 'lucide-react';
import { useAppSelector } from '@hooks/hooks';
import { formatDate } from '@lib/utils';
import {
  selectCurrentUser,
  selectUserLoading,
} from '@lib/redux/userReducer/userSelectors';
import UserProfileSkeleton from '@features/skeletons/UserProfileSkeleton';

export default function UserProfile() {
  const user = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectUserLoading);

  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <UserProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <div className="relative size-32">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${user.avatar}`}
              alt={`${user.username}'s avatar`}
              fill
              className="rounded-full object-cover"
              sizes="128px"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold">{user.username}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-muted-foreground" />
            <span>Account Status:</span>
            <Badge variant={user.isVerified ? 'success' : 'destructive'}>
              {user.isVerified ? 'Verified' : 'Unverified'}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <span>Role:</span>
            <Badge variant="default">{user.role}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
            <span>Registered on: {formatDate(user.createdAt)}</span>
          </div>
          <div className="pt-4 border-t">
            <h3 className="flex items-center font-semibold text-lg mb-2">
              <Info className="w-5 h-5 mr-2" />
              Bio
            </h3>
            <p className="text-muted-foreground">{user.bio}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
