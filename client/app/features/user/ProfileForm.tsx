'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Alert, AlertDescription } from '@ui/alert';
import { Button } from '@ui/button';
import { ProfileFormInputs } from '@features/user/ProfileSettings';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { Input } from '@ui/input';

interface ProfileFormProps {
  register: UseFormRegister<ProfileFormInputs>;
  errors: FieldErrors<ProfileFormInputs>;
  bioLength: number;
  isSubmitting: boolean;
}

export default function ProfileForm({
  register,
  errors,
  bioLength,
  isSubmitting,
}: ProfileFormProps) {
  return (
    <>
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
        <div className="text-sm text-gray-500">{bioLength}/300 characters</div>
        {errors.bio && (
          <Alert variant="destructive">
            <AlertDescription>{errors.bio.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </>
  );
}
