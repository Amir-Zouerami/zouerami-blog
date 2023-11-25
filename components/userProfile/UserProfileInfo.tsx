'use client';

import Image from 'next/image';
import Link from 'next/link';
import image from '@/icons/image.svg';
import me from '@/public/me.png';
import { useLayoutEffect, useRef, useState } from 'react';
import { User } from '@/utility/types';

function UserProfileInfo({ userData }: { userData: User }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
  }, [userData.username, userData.email]);

  return (
    <>
      <div className="lg:grow">
        <div className="flex flex-col gap-10">
          <div>
            <label
              className="mb-5 inline-block pr-3 text-white"
              htmlFor="profile_username"
            >
              نام کاربری:{' '}
            </label>

            {userData ? (
              <input
                id="profile_username"
                className="w-full rounded-3xl bg-[#2f353c] p-3 text-white"
                type="text"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            ) : (
              <div className="w-full rounded-3xl bg-[#2f353c] p-3 text-white"></div>
            )}
          </div>
          <div>
            <label
              className="mb-5 inline-block pr-3 text-white"
              htmlFor="profile_email"
            >
              ایمیل:{' '}
            </label>
            <input
              id="profile_email"
              className="w-full rounded-3xl bg-[#2f353c] p-3 text-white"
              type="text"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-5 text-white">
            <span>وضعیت تایید حساب: </span>
            <span className="text-lg font-bold">تایید نشده</span>
          </div>
        </div>
      </div>
      <div className="text-center lg:mr-10">
        <div className="relative overflow-hidden">
          <Link
            href={''}
            onClick={e => {
              e.preventDefault();
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            className="absolute bottom-0 flex w-full justify-center bg-black opacity-[.6] transition-all max-lg:translate-y-5 max-lg:hover:translate-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-[60px] lg:-translate-x-8 lg:hover:translate-x-0"
          >
            <Image
              src={image}
              width={50}
              height={50}
              className="svg-white"
              alt="تغییر تصویر پروفایل"
            />
          </Link>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            name="user_avatar"
            id="profile_user_avatar"
          />
          <Image
            src={me}
            width={250}
            className="max-lg:rounded-t-full lg:rounded-r-full"
            alt="تصویر پروفایل کاربر"
          />
        </div>
      </div>
    </>
  );
}

export default UserProfileInfo;
