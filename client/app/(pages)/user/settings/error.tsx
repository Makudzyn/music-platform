'use client';

import RouteError from '@/app/features/routeErrors/RouteError';

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <RouteError error={error} reset={reset}>
      We&apos;re sorry, but an error occurred while loading your profile
      settings.
    </RouteError>
  );
}
