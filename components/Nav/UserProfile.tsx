'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import user from '@/icons/user.svg';
import heart from '@/icons/heart.svg';
import bookmark from '@/icons/bookmark.svg';
import profile from '@/icons/profile.svg';
import messages from '@/icons/messages.svg';
import settings from '@/icons/settings.svg';
import logout from '@/icons/logout.svg';
import ProfileMenuLink from './ProfileMenuLink';

function UserProfile() {
  const [userModal, setUserModal] = useState(false);

  return (
    <>
      <div className="z-10">
        <button
          onClick={() => {
            setUserModal(!userModal);
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
              className="absolute left-0 top-10 h-auto min-w-[85vw] rounded-lg bg-slate-600 dark:bg-[#293036]
        p-5 lg:left-16 lg:top-20 lg:min-w-[500px] lg:text-lg"
              id="userProfileModal"
              onClick={() => {
                setUserModal(!userModal);
              }}
            >
              <div className="mb-5 text-center text-white">
                <p>
                  کاربر: <span>امیر زوارمی</span>
                </p>
              </div>

              <hr className="py-2" />

              <ProfileMenuLink
                icon={heart}
                title="مقالات مورد علاقه"
                subtitle="مقالاتی که توسط شما لایک شده اند."
              />

              <ProfileMenuLink
                icon={bookmark}
                title="مقالات نشان شده"
                subtitle="مقالاتی که برای مطالعه در آینده ذخیره کرده اید."
              />

              <hr className="py-2" />

              <ProfileMenuLink
                icon={profile}
                title="پروفایل شما"
                subtitle="نمایی کلی از پروفایل خود را مشاهده کنید."
              />
              <ProfileMenuLink
                icon={messages}
                title="پیام ها و اعلانات"
                subtitle="پیام های خود را در این بخش مشاهده کنید."
              />

              <ProfileMenuLink
                icon={settings}
                title="تنظیمات حساب کاربری"
                subtitle="اطلاعات حسابتان را در این بخش تغییر بدهید."
              />

              <ProfileMenuLink
                icon={logout}
                title="خروج از حساب کاربری"
                subtitle="به صورت کامل از حساب کاربری خود خارج شوید."
              />

              <div className="py-5 text-center text-white">
                <p className="mb-10">شما وارد حساب کاربری خود نشده اید!</p>
                <Link
                  href={'#'}
                  className="ml-5 rounded-lg bg-gradient-to-r from-[#A880C0] to-[#4CB8B2] p-3 hover:opacity-[.7]"
                >
                  ثبت نام
                </Link>
                <Link
                  href={'#'}
                  className="rounded-lg bg-gradient-to-r from-[#A880C0] to-[#4CB8B2] p-3 hover:opacity-[.7]"
                >
                  ورود
                </Link>
              </div>
            </div>

            <div
              onClick={(e) => {
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
