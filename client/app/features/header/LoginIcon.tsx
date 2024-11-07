'use client';

import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

export default function LoginIcon() {
  const router = useRouter();
  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLoginRedirect}>
      <CustomTooltip content="Login" side="top">
        <LogIn className="size-6" />
      </CustomTooltip>
      <span className="sr-only">Log in</span>
    </Button>
  );
}
