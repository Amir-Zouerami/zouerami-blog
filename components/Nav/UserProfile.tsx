'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Pocketbase from 'pocketbase';

import user from '@/icons/user.svg';
import heart from '@/icons/heart.svg';
import bookmark from '@/icons/bookmark.svg';
import messages from '@/icons/messages.svg';
import settings from '@/icons/settings.svg';
import logout from '@/icons/logout.svg';
import ProfileMenuLink from './ProfileMenuLink';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from '@/utility/cookie';

function UserProfile() {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  const router = useRouter();
  const pathName = usePathname();

  let signinHref: string;
  let signupHref: string;

  const protectedRoute = pathName.startsWith('/user/');
  const authRoute = pathName.startsWith('/sign-');

  if (authRoute) {
    signinHref = '/sign-in';
    signupHref = '/sign-up';
  } else {
    signinHref = `/sign-in?next=${pathName}`;
    signupHref = `/sign-up?next=${pathName}`;
  }

  const [userModal, setUserModal] = useState(false);
  const [authed, setAuthed] = useState(pb.authStore.isValid);

  return (
    <>
      <div className="z-10">
        <button
          onClick={() => {
            setAuthed(pb.authStore.isValid);
            setUserModal(!userModal);
            // console.log(pb.authStore.model);
          }}
        >
          <Image
            src={user}
            width={27}
            alt="open user profile settings"
            className="h-auto dark:invert"
          />
        </button>

        {userModal ? (
          <div>
            <div
              className={`${
                authed
                  ? 'bg-gradient-to-r from-[#2c343e] to-[#424b56] dark:from-[#293036] dark:to-[#293036]'
                  : 'bg-gradient-to-r from-[#2c343e] to-[#373f48]'
              } absolute left-0 top-10 h-auto min-w-[85vw] rounded-lg
              p-5 lg:left-16 lg:top-20 lg:min-w-[500px] lg:text-lg`}
              id="userProfileModal"
              onClick={() => {
                setUserModal(!userModal);
              }}
            >
              {authed ? (
                <>
                  <div className="mb-5 text-center text-white">
                    <p>
                      کاربر: <span>{pb.authStore.model?.username}</span>
                    </p>
                  </div>

                  <hr className="py-2" />

                  <ProfileMenuLink
                    href="/user/liked-articles"
                    icon={heart}
                    title="مقالات مورد علاقه"
                    subtitle="مقالاتی که توسط شما لایک شده اند."
                  />

                  <ProfileMenuLink
                    href="/user/bookmarked-articles"
                    icon={bookmark}
                    title="مقالات نشان شده"
                    subtitle="مقالاتی که برای مطالعه در آینده ذخیره کرده اید."
                  />

                  <hr className="py-2" />

                  <ProfileMenuLink
                    href="/user/messages"
                    icon={messages}
                    title="پیام ها و اعلانات"
                    subtitle="پیام های خود را در این بخش مشاهده کنید."
                  />

                  <ProfileMenuLink
                    href="/user/profile"
                    icon={settings}
                    title="تنظیمات حساب کاربری"
                    subtitle="اطلاعات حسابتان را در این بخش تغییر بدهید."
                  />

                  <ProfileMenuLink
                    href=""
                    icon={logout}
                    title="خروج از حساب کاربری"
                    subtitle="به صورت کامل از حساب کاربری خود خارج شوید."
                    onClick={() => {
                      pb.authStore.clear();
                      deleteCookie('pb_auth');

                      if (protectedRoute) return router.push('/sign-in');

                      router.refresh();
                    }}
                  />
                </>
              ) : (
                <div className="py-5 text-center text-white">
                  <p className="mb-10">شما وارد حساب کاربری خود نشده اید!</p>
                  <Link
                    href={signupHref}
                    className="reactiveButton ml-5 rounded-lg bg-gradient-to-r from-[#A880C0] to-[#4CB8B2] p-3"
                  >
                    ثبت نام
                  </Link>
                  <Link
                    href={signinHref}
                    className="reactiveButton rounded-lg bg-gradient-to-r from-[#A880C0] to-[#4CB8B2] p-3"
                  >
                    ورود
                  </Link>
                </div>
              )}
            </div>

            <div
              onClick={e => {
                setUserModal(!userModal);
              }}
              className="absolute left-0 z-[-20] -mr-24 -mt-20 min-h-[100vh] min-w-[100vw]"
            ></div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UserProfile;
