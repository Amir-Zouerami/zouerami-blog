'use client';

import { deleteCookie } from '@/utility/cookie';
import { useRouter } from 'next/navigation';
import Pocketbase from 'pocketbase';

function AlreadyLoggedinDialogue() {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  const router = useRouter();

  return (
    <div className="mx-auto flex h-[40vh] flex-col items-center justify-center">
      <p className="p-5 text-xl">شما وارد حساب کاربری خود شده اید!</p>
      <p>
        اگر می خواهید وارد حساب دیگری شوید باید ابتدا از این حساب خارج شوید.
      </p>
      <button
        className="mt-14 rounded-2xl bg-gradient-to-l from-[#005ffc] to-[#7435ef] p-5 font-extrabold text-white"
        onClick={() => {
          deleteCookie('pb_auth');
          pb.authStore.clear();
          router.refresh();
        }}
      >
        خروج از حساب کاربری
      </button>
    </div>
  );
}

export default AlreadyLoggedinDialogue;
