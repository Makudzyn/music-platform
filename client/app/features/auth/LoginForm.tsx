'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuthenticate } from '@/app/services/authService';
import { AtSign, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormInput } from '@/app/features/auth/FormInput';
import FormButton from '@/app/features/auth/FormButton';
import { z } from 'zod';
import Toaster from '@/app/features/toast/Toaster';
import { zodResolver } from '@hookform/resolvers/zod';
import FormError from '@/app/features/auth/FormError';
import { AxiosError } from 'axios';

const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password is required and must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
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
  const { login } = useAuthenticate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data);
      setToastOpen(true);
      setToastInfo({
        title: 'Login Successful',
        description: 'You have successfully logged in!',
      });
    } catch (error) {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Authorization error';
      } else errorMessage = 'An unexpected error occurred';

      setToastOpen(true);
      setToastInfo({
        title: 'Login Failed',
        description: errorMessage,
      });
    }
  };

  //If authorization was successful, redirect to the main page
  useEffect(() => {
    if (toastInfo.title === 'Login Successful') {
      const redirectTimeout = setTimeout(() => router.push('/'), 3000);
      return () => clearTimeout(redirectTimeout);
    }
  }, [toastInfo, router]);

  return (
    <>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput<LoginFormInputs>
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          icon={<AtSign />}
          register={register}
          error={errors.email}
          autoComplete="email"
        />

        <FormInput<LoginFormInputs>
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Key />}
          register={register}
          error={errors.password}
          autoComplete="current-password"
        />

        {errors.root && <FormError error={errors.root.message} />}

        <FormButton disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </FormButton>
      </form>

      <Toaster
        title={toastInfo.title}
        description={toastInfo.description}
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={5000}
      />
    </>
  );
}
