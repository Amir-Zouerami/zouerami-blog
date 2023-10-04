// 'use client';

import Image from 'next/image';

import authImage from '@/public/auth-image-big.webp';
import user from '@/icons/user-auth.svg';
import email from '@/icons/messages.svg';
import password from '@/icons/password.svg';
import google from '@/icons/google.svg';
import github from '@/icons/github.svg';
import Link from 'next/link';

import { auth, Auth } from '@/app/(utility)/lucia';

import { Metadata } from 'next';
import PasswordInput from '@/components/Auth/PasswordInput';

export const metadata: Metadata = {
  title: 'ساخت حساب کاربری',
  description: 'sign up an account',
};

async function Page() {
  return (
    <div className="mx-auto max-w-[95%] lg:mt-20 lg:max-w-[1000px] lg:shadow-lg dark:lg:bg-[#363842]">
      <div className="flex items-center justify-center">
        <div className="text-center lg:w-1/2">
          <p className="py-3 pt-10 text-4xl font-black">
            ساخت حساب کاربری جدید
          </p>
          <p className="mb-10">
            برای ساخت حساب اطلاعاتتان را به صورت دقیق وارد کنید.
          </p>

          <div className="p-3">
            <p className="pr-3 text-right">ثبت نام با ایمیل:</p>

            <form
              className="mx-auto my-5 flex flex-col gap-10 lg:w-[90%]"
              action=""
            >
              <div className="relative w-full">
                <Image
                  src={user}
                  width={25}
                  alt="enter your name"
                  className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 dark:invert"
                />
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی شما"
                  required
                  className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
                />
              </div>

              <div className="relative w-full">
                <Image
                  src={email}
                  width={25}
                  alt="enter your name"
                  className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 invert dark:invert-0"
                />
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  required
                  className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
                />
              </div>

              <div className="relative w-full">
                <Image
                  src={password}
                  width={25}
                  alt="enter your name"
                  className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 dark:invert"
                />

                <PasswordInput />
              </div>
            </form>

            <div className="mx-auto my-10 max-w-[90%] lg:max-w-[70%]">
              <button className="w-full rounded-xl bg-gradient-to-r from-[#D93965] to-[#EE8C68] p-4 text-xl font-black text-white hover:opacity-[.7]">
                ساخت حساب کاربری
              </button>
            </div>
          </div>

          <div>
            <p className="mb-10 pr-6 text-right">
              ثبت نام سریع با شبکه های اجتماعی:
            </p>

            <div className="mx-auto flex max-w-[85%] flex-col items-center justify-center gap-10 pb-10 lg:max-w-[70%]">
              <Link
                href={'#'}
                className="w-full rounded-xl bg-gradient-to-r from-[#6BAEEB] to-[#7B68EE] p-4 hover:opacity-[.7]"
              >
                <Image
                  src={google}
                  width={25}
                  alt="signup with google"
                  className="ml-3 inline-block"
                />
                <span className="font-bold text-white">
                  ثبت نام بــا حســــاب گوگــــــــل
                </span>
              </Link>

              <Link
                href={'#'}
                className="w-full rounded-xl bg-gradient-to-r from-[#6BAEEB] to-[#7B68EE] p-4 hover:opacity-[.7]"
              >
                <Image
                  src={github}
                  width={28}
                  alt="signup with github"
                  className="ml-3 inline-block invert"
                />
                <span className="font-bold text-white">
                  ثبت نام با حساب گیت هاب
                </span>
              </Link>

              <p>
                اگر حساب کاربری دارید، باید{' '}
                <Link
                  href={'sign-in'}
                  className="font-bold text-sky-400 hover:opacity-[.7]"
                >
                  وارد حسابتان شوید
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="relative hidden bg-blue-300 text-center lg:block lg:h-[900px] lg:w-1/2">
          <div className="absolute flex h-full w-full flex-col items-center justify-end bg-gray-900 bg-opacity-[.6]">
            <div className="mb-32">
              <p className="py-6 text-4xl font-black text-white">
                به جمع ما ملحق شو!
              </p>
              <p className="font-bold text-white">
                کلی مقالات تخصصی و پیشرفته به زبان فارسی!
              </p>
            </div>
          </div>
          <Image
            src={authImage}
            className="h-full w-full object-cover"
            alt="sign into your account"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
