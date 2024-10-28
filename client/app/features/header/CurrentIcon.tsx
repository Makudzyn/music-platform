'use client';

import { useAppSelector } from "@/lib/hooks/hooks";
import ProfileIcon from "@/app/features/header/ProfileIcon";
import LoginIcon from "@/app/features/header/LoginIcon";
import { selectIsAuthenticated } from "@/lib/redux/userReducer/userSelectors";

export default function CurrentIcon() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
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