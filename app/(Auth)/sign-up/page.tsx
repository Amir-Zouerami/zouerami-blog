export const fetchCache = 'default-no-store'

import Link from 'next/link';
import Image from 'next/image';
import SignupForm from '@/components/Auth/SignupForm';

import { Metadata } from 'next';
import Pocketbase from 'pocketbase';
import GoogleoAuthButton from '@/components/Auth/GoogleoAuthButton';
import GithuboAuthButton from '@/components/Auth/GithuboAuthButton';
import { cookies } from 'next/headers';
import AlreadyLoggedinDialogue from '@/components/Auth/AlreadyLoggedinDialogue';
import authImage from '@/public/auth-form-cover.webp';

export const metadata: Metadata = {
  title: 'ساخت حساب کاربری',
  description: 'sign up an account',
};

async function Page() {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  const oauthList = (await pb.collection('users').listAuthMethods())
    .authProviders;

  const googleoAuth = oauthList.find(obj => obj.name === 'google');
  const githuboAuth = oauthList.find(obj => obj.name === 'github');

  const response = cookies().get('pb_auth') && !cookies().get('just_authed') ? (
    <AlreadyLoggedinDialogue />
  ) : (
    <div>
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
                <GoogleoAuthButton text="SIGNUP" googleoAuth={googleoAuth} />
                <GithuboAuthButton text="SIGNUP" githuboAuth={githuboAuth} />
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
    </div>
  );

  return response;
}

export default Page;
