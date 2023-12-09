'use client';

import Image from 'next/image';
import { atom, useAtom } from 'jotai';
import user from '@/icons/user.svg';

export const UserMenuLinksAtom = atom(false);

function UserProfileButton() {
  const [userModal, setUserModal] = useAtom(UserMenuLinksAtom);

  return (
    <div>
      <button
        onClick={() => {
          setUserModal(!userModal);
        }}
      >
        <Image
          src={user}
          width={27}
          alt="open user profile menu"
          className="h-auto dark:invert"
        />
      </button>
    </div>
  );
}

export default UserProfileButton;
