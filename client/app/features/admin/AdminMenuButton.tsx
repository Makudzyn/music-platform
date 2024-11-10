import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuthState } from '@/lib/hooks/hooks';

export default function AdminMenuButton() {
  const { isAuthenticated, user } = useAuthState();
  return (
    <>
      {isAuthenticated && user.role === 'ADMIN' && (
        <Button asChild className="gap-2 bg-foreground hover:bg-accent">
          <Link href={`/admin`}>
            <Settings className="size-4" />
            Admin Panel
          </Link>
        </Button>
      )}
    </>
  );
}
