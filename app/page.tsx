import { getCurrentSession } from '@/auth/sessions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect('/login');
  }

  return (
    <>
      Hello page
      {user.name}
    </>
  );
}
