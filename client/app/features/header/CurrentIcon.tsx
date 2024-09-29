'use client';

import { useAppSelector } from "@/lib/hooks";
import ProfileIcon from "@/app/features/header/ProfileIcon";
import LoginIcon from "@/app/features/header/LoginIcon";

export default function CurrentIcon() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <ProfileIcon/>
      ) : (
        <LoginIcon/>
      )}
    </>
  );
};