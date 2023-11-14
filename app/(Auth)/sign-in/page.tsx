export const fetchCache = 'default-no-store';

import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Pocketbase from 'pocketbase';
import SigninForm from '@/components/Auth/SigninForm';
import { cookies } from 'next/headers';

import authImage from '@/public/auth-image-big.webp';
import AlreadyLoggedinDialogue from '@/components/Auth/AlreadyLoggedinDialogue';
import GoogleoAuthButton from '@/components/Auth/GoogleoAuthButton';
import GithuboAuthButton from '@/components/Auth/GithuboAuthButton';

export const metadata: Metadata = {
  title: 'ورود به حساب کاربری',
  description: 'Sign-in to your account',
};

async function Page() {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  const oauthList = (await pb.collection('users').listAuthMethods())
    .authProviders;

  const googleoAuth = oauthList.find(obj => obj.name === 'google');
  const githuboAuth = oauthList.find(obj => obj.name === 'github');

  const response =
    cookies().get('pb_auth') && !cookies().get('just_authed') ? (
      <AlreadyLoggedinDialogue />
    ) : (
      <div className="mx-auto max-w-[95%] lg:mt-20 lg:max-w-[1000px] lg:shadow-xl dark:lg:bg-[#363842]">
        <div className="flex items-center justify-center">
          <div className="text-center lg:w-1/2">
            <p className="py-3 pt-10 text-4xl font-black">
              ورود به حساب کاربری
            </p>
            <p className="mb-10">
              برای ورود به حساب اطلاعاتتان را به صورت دقیق وارد کنید.
            </p>

            <div className="p-3">
              <p className="pr-3 text-right">ورود با ایمیل و رمز عبور:</p>

              <SigninForm />
            </div>

            <div>
              <p className="mb-10 pr-6 text-right">
                ورود سریع با شبکه های اجتماعی:
              </p>

              <div className="mx-auto flex max-w-[90%] flex-col items-center justify-center gap-10 pb-10 lg:max-w-[70%]">
                <GoogleoAuthButton text="LOGIN" googleoAuth={googleoAuth} />
                <GithuboAuthButton text="LOGIN" githuboAuth={githuboAuth} />

                <div className="mt-5">
                  <p>
                    اگر حساب کاربری ندارید، باید{' '}
                    <Link
                      href={'sign-up'}
                      className="font-bold text-sky-400 hover:opacity-[.7]"
                    >
                      ثبت نام کنید
                    </Link>
                    .
                  </p>

                  <p className="mt-6 font-bold text-sky-400 hover:opacity-[.7]">
                    <Link href={'#'}>رمز عبورم را فراموش کرده ام.</Link>
                  </p>
                </div>
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

  return response;
}

export default Page;
