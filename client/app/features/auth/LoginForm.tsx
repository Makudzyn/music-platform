'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuthenticate } from "@/app/services/authService";
import { AtSign, Key } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuthenticate();

  const onSubmit = async(data: LoginFormInputs) => {
    try {
      await login(data);

      router.push('/');
    } catch (error) {
      setLoginError(error.message || 'Authorization error');
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-3">
        <label className="block text-base font-medium mb-1.5" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            {...register('email', {required: 'Email is required'})}
            placeholder="Enter your email address"
            className="py-2 pr-3 pl-11 text-base transition-all duration-300 bg-background peer placeholder-muted-foreground focus-visible:ring-accent focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-0"
          />
          <Separator
            orientation="vertical"
            className="pointer-events-none absolute top-1/2 left-9 h-full -translate-y-1/2 w-[1.5px] bg-muted-foreground peer-focus:bg-accent"/>
          <AtSign
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground peer-focus:text-accent"/>
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label className="block text-base font-medium mb-1.5" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <Input
            autoComplete="current-password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            {...register('password', {required: 'Password is required'})}
            className="py-2 pr-3 pl-11 text-base transition-all duration-300 bg-background peer placeholder-muted-foreground focus-visible:ring-accent focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-0"
          />
          <Separator
            orientation="vertical"
            className="pointer-events-none absolute top-1/2 left-9 h-full -translate-y-1/2 w-[1.5px] bg-muted-foreground peer-focus:bg-accent"/>
          <Key
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 size-4 text-muted-foreground peer-focus:text-accent"/>
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {loginError && <p className="mb-4 text-sm text-red-500">{loginError}</p>}

      <Button
        size="lg"
        type="submit"
        className="w-full rounded-md px-4 text-base font-medium transition duration-300 py-2.5"
      >
        Login
      </Button>
    </form>

  );
}
