'use server';

import { redirect } from 'next/navigation';
import { deleteSessionTokenCookie } from './cookies';
import { getCurrentSession, invalidateSession } from './sessions';

export async function signOut() {
  const { session } = await getCurrentSession();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  return redirect('/login');
}
