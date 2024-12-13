'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export default function RootProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <div className="min-h-screen flex flex-col text-foreground">
            {children}
          </div>

          <Toaster richColors />
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
