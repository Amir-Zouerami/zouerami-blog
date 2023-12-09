'use client';

import heart from '@/icons/heart.svg';
import bookmark from '@/icons/bookmark.svg';
import messages from '@/icons/messages.svg';
import settings from '@/icons/settings.svg';
import logout from '@/icons/logout.svg';
import ProfileMenuLink from './ProfileMenuLink';
import { deleteCookie } from '@/utility/cookie';
import Pocketbase from 'pocketbase';
import { usePathname, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { UserMenuLinksAtom } from './UserProfileButton';
import Link from 'next/link';

function UserProfileMenu() {
  const [modal, setModal] = useAtom(UserMenuLinksAtom);
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

  return (
    <>
      {modal && (
        <div
          className="absolute left-0 top-[60px] z-20 mx-4 rounded-2xl bg-white p-5 opacity-[0.95]
    shadow-2xl dark:bg-gradient-to-r dark:from-[#293036] dark:to-[#424b56] dark:opacity-[1]
    dark:shadow-none max-md:right-0 lg:left-16 lg:top-20 lg:min-w-[500px] lg:max-w-[400px] lg:text-lg"
        >
          {pb.authStore.isValid ? (
            <div>
              <div className="mb-5 text-center text-[#464646] dark:text-white">
                <p>
                  کاربر: <span>{pb.authStore.model?.username}</span>
                </p>
              </div>
              <div
                onClick={() => {
                  setModal(false);
                }}
              >
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
                  href="/user/notifications"
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
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setModal(false);
              }}
            >
              <div className="py-5 text-center text-white">
                <p className="mb-10 text-black dark:text-white">
                  شما وارد حساب کاربری خود نشده اید!
                </p>
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
            </div>
          )}
        </div>
      )}

      <div
        className={`${
          !modal && 'hidden'
        } fixed left-0 right-0 top-0 min-h-[100vh] min-w-[100vw]`}
        onClick={() => {
          setModal(false);
        }}
      ></div>
    </>
  );
}

export default UserProfileMenu;
