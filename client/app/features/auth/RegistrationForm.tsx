'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AtSign, Key, User } from 'lucide-react';
import { FormInput } from '@/app/features/auth/FormInput';
import FormError from '@/app/features/auth/FormError';
import FormButton from '@/app/features/auth/FormButton';
import Toaster from '@/app/features/toast/Toaster';
import { registration } from '@/app/services/authService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(20, 'Username must be 20 characters or less'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationFormInputs = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<{
    title: string;
    description: string;
  }>({
    title: '',
    description: '',
  });
  const router = useRouter();

  const onSubmit = async (data: RegistrationFormInputs) => {
    try {
      const { confirmPassword, ...registrationData } = data;
      await registration(registrationData);
      setToastOpen(true);
      setToastInfo({
        title: 'Registration Successful',
        description: 'Please check your email to confirm your account.',
      });
    } catch (error) {
      setToastOpen(true);
      setToastInfo({
        title: 'Registration error',
        description:
          error.message || 'Something went wrong during registration.',
      });
    }
  };

  //If registration was successful, redirect to the login page
  useEffect(() => {
    if (toastInfo.title === 'Registration Successful') {
      const redirectTimeout = setTimeout(
        () => router.push('/auth/login'),
        10000,
      );
      return () => clearTimeout(redirectTimeout);
    }
  }, [toastInfo, router]);

  return (
    <>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          icon={<User />}
          register={register}
          error={errors.username}
          autoComplete="username"
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          icon={<AtSign />}
          register={register}
          error={errors.email}
          autoComplete="email"
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Key />}
          register={register}
          error={errors.password}
          autoComplete="new-password"
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          icon={<Key />}
          register={register}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        {errors.root && <FormError error={errors.root.message} />}

        <FormButton disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </FormButton>
      </form>

      <Toaster
        title={toastInfo.title}
        description={toastInfo.description}
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={10000}
      />
    </>
  );
}
