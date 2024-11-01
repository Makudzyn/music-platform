'use client';

import RouteError from "@/app/features/routeErrors/RouteError";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function ErrorComponent({error, reset}: ErrorComponentProps) {
  return (
    <RouteError error={error} reset={reset}>
      An error occurred while registration.
    </RouteError>
  );
}