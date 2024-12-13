'use client';

import { User } from '@nextui-org/user';
import { User2Icon } from 'lucide-react';

type UserAvatarProps = {
  url: string;
  name: string;
};

export function UserAvatar({ name, url }: UserAvatarProps) {
  const initials = name.charAt(0).toUpperCase();

  return (
    <User
      name={name}
      isFocusable
      className="flex-row-reverse"
      avatarProps={{
        src: url,
        fallback: <User2Icon className="size-4" />,
        showFallback: true,
        name: initials,
      }}
    />
  );
}
