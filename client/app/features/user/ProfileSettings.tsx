'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { useAppSelector } from '@hooks/hooks';
import { selectCurrentUser } from '@lib/redux/userReducer/userSelectors';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Toaster from '@/app/features/toast/Toaster';
import { patchUserData } from '@/app/services/userService';
import AvatarUploader from "@features/user/AvatarUploader";
import ProfileForm from "@features/user/ProfileForm";

export const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().max(300, 'Bio must not exceed 300 characters').optional(),
});

export type ProfileFormInputs = z.infer<typeof profileSchema>;

export default function ProfileSettings() {
  const user = useAppSelector(selectCurrentUser);

  const [avatar, setAvatar] = useState<File | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState({
    title: '',
    description: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
    },
  });

  const bio = watch('bio');

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('bio', data.bio || '');

      // Add the avatar file if it has been uploaded
      if (avatar) formData.append('avatar', avatar);

      if (!user) return;

      await patchUserData(formData, user._id);
      handleToast('Profile updated', 'Your profile has been successfully updated.');
    } catch (error) {
      handleToast('Error', 'Failed to update profile. Please try again.');
    }
  };

  const currentAvatarUrl = avatar
    ? URL.createObjectURL(avatar)
    : user?.avatar
      ? `http://localhost:5000/${user.avatar}`
      : null;

  const handleToast = (title: string, description: string) => {
    setToastContent({ title, description });
    setToastOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AvatarUploader
              currentAvatar={currentAvatarUrl}
              onAvatarChange={setAvatar}
              onError={handleToast}
            />

            <ProfileForm
              register={register}
              errors={errors}
              bioLength={bio?.length || 0}
              isSubmitting={isSubmitting}
            />
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
