'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { AtSign, Key, User } from 'lucide-react'
import { FormInput } from "@/app/features/auth/FormInput";
import FormError from "@/app/features/auth/FormError";
import FormButton from "@/app/features/auth/FormButton";
import { Toaster } from "@/app/features/toast/toast";
import { registration } from "@/app/services/authService";

interface RegistrationFormInputs {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegistrationForm() {
  const {register, handleSubmit, formState: {errors}, watch} = useForm<RegistrationFormInputs>();
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async(data: RegistrationFormInputs) => {
    try {
      const {confirmPassword, ...registrationData} = data;
      await registration(registrationData);
      setToastOpen(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 10000);
    } catch (error) {
      setRegistrationError(error.message || 'Registration error');
    }
  }

  return (
    <>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          icon={<User/>}
          register={register}
          error={errors.username}
          validation={{required: "Username is required"}}
          autocomplete="username"
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          icon={<AtSign/>}
          register={register}
          error={errors.email}
          validation={{required: "Email is required"}}
          autocomplete="email"
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Key/>}
          register={register}
          error={errors.password}
          validation={{required: "Password is required"}}
          autocomplete="new-password"
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          icon={<Key/>}
          register={register}
          error={errors.confirmPassword}
          validation={{
            required: 'Please confirm your password',
            validate: (value) => value === watch('password') || 'Passwords do not match'
          }}
          autocomplete="new-password"
        />

        {registrationError && <FormError error={registrationError}/>}

        <FormButton>Register</FormButton>
      </form>
      <Toaster
        title="Registration Successful!"
        description="Please check your email to confirm your account."
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={10000}
      />
    </>
  )
}