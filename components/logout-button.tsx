'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: '/' })}
      variant="outline"
      size="sm"
    >
      Sign Out
    </Button>
  );
}