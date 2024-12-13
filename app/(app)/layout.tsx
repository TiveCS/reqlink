import { getCurrentSession } from '@/auth/sessions';
import { redirect } from 'next/navigation';
import React from 'react';
import { AppNavbar } from './_components/app-navbar';

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const { user } = await getCurrentSession();

  if (!user) {
    return redirect('/login');
  }

  return (
    <>
      <AppNavbar name={user.name} avatarUrl={user.picture} />

      <main className="flex-1 flex flex-col">{children}</main>
    </>
  );
}
