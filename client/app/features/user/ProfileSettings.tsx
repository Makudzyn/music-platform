'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/lib/hooks/hooks';
import { selectCurrentUser } from '@/lib/redux/userReducer/userSelectors';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import Toaster from '@/app/features/toast/Toaster';
import { patchUserData } from '@/app/services/userService';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().max(300, 'Bio must not exceed 300 characters').optional(),
});

export default function ProfileSettings() {
  const user = useAppSelector(selectCurrentUser);

  const [avatar, setAvatar] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState({
    title: '',
    description: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
    },
  });

  const bio = watch('bio');

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('bio', data.bio || '');

      // Add the avatar file if it has been uploaded
      if (avatar) {
        formData.append('avatar', avatar);
      }

      await patchUserData(formData, user._id);
      setToastContent({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
      setToastOpen(true);
    } catch (error) {
      setToastContent({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
      });
      setToastOpen(true);
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer?.files[0];
      if (file?.type.startsWith('image/')) {
        setAvatar(file);
      } else {
        setToastContent({
          title: 'Invalid file type',
          description: 'Please upload an image file.',
        });
        setToastOpen(true);
      }
    },
    [setAvatar],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      setAvatar(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Picture</Label>
              <div
                className={cn(
                  'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 transition-colors',
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="relative size-32 mb-4">
                  <Image
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : user?.avatar
                          ? `http://localhost:5000/${user.avatar}`
                          : `/api/placeholder/400/400`
                    }
                    alt="Profile picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Drag and drop your image here, or click to select
                </p>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register('username')}
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.username.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register('bio')}
                rows={3}
                className={errors.bio ? 'border-red-500' : ''}
              />
              <div className="text-sm text-gray-500">
                {bio?.length || 0}/300 characters
              </div>
              {errors.bio && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.bio.message}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Toaster
        title={toastContent.title}
        description={toastContent.description}
        open={toastOpen}
        onOpenChange={setToastOpen}
      />
    </div>
  );
}
