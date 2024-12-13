'use client';

import { Link } from '@nextui-org/link';
import { UserAvatar } from './user-avatar';

type AppNavbarProps = {
  name: string;
  avatarUrl: string;
};

export function AppNavbar({ name, avatarUrl }: AppNavbarProps) {
  return (
    <nav className="w-full grid grid-flow-col px-8 py-6">
      <div className="grid grid-cols-6 gap-x-6">
        <div>
          <Link href="/">ReqLink</Link>
        </div>

        <div className="col-span-5 space-x-6">
          <Link href="/projects">Projects</Link>
        </div>
      </div>

      <div className="flex flex-row-reverse">
        <UserAvatar name={name} url={avatarUrl} />
      </div>
    </nav>
  );
}
