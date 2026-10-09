'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Provide from '@/app/Provide';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>
    <Provide>
      {children}
    </Provide>
  </SessionProvider>;
}
