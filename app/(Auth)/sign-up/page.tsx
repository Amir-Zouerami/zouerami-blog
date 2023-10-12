// 'use client';

import authImage from '@/public/auth-image-big.webp';
import google from '@/icons/google.svg';
import github from '@/icons/github.svg';

import Link from 'next/link';
import Image from 'next/image';
import SignupForm from '@/components/Auth/SignupForm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ساخت حساب کاربری',
  description: 'sign up an account',
};

function Page() {
  return (
    <div className="mx-auto max-w-[95%] lg:mt-20 lg:max-w-[1000px] lg:shadow-lg dark:lg:bg-[#363842]">
      <div className="flex items-center justify-center">
        <div className="text-center lg:w-1/2">
          <p className="py-3 pt-10 text-4xl font-black">
            ساخت حساب کاربری جدید
          </p>
          <p className="mb-12">
            برای ساخت حساب اطلاعاتتان را به صورت دقیق وارد کنید.
          </p>

          <SignupForm />

          <div>
            <p className="mb-10 pr-6 pt-3 text-right">
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
