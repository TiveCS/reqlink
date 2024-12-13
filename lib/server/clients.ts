import { getCurrentSession } from '@/auth/sessions';
import { createSafeActionClient } from 'next-safe-action';

export const publicClient = createSafeActionClient();

export const authedClient = createSafeActionClient().use(async ({ next }) => {
  const { user, session } = await getCurrentSession();

  if (!user || !session) {
    throw new Error('Unauthorized');
  }

  return next({ ctx: { user, session } });
});
