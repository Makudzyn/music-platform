'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuthenticate } from "@/app/services/authService";
import { AtSign, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/app/features/auth/FormInput";
import FormError from "@/app/features/auth/FormError";
import FormButton from "@/app/features/auth/FormButton";

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
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email address"
        icon={<AtSign />}
        register={register}
        error={errors.email}
        validation={{ required: "Email is required" }}
        autocomplete="email"
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        icon={<Key />}
        register={register}
        error={errors.password}
        validation={{ required: "Password is required" }}
        autocomplete="current-password"
      />

      {loginError && <FormError error={loginError}/>}

      <FormButton>Login</FormButton>
    </form>
  );
}
