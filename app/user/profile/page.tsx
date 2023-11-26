'use client';

import UserProfileInfo from '@/components/userProfile/UserProfileInfo';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import Pocketbase from 'pocketbase';
import { User } from '@/utility/types';
import loading from '@/icons/loading.svg';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { editProfileInfo } from '@/utility/actions';
import toast, { Toaster } from 'react-hot-toast';
import UserSecurity from '@/components/userProfile/UserSecurity';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function Page() {
  const [userData, setUserData] = useState<User | false>(false);
  const [error, setError] = useState(false);
  const [activeTab, setactiveTab] = useState<
    'USER_INFO' | 'USER_PRIVACY' | 'USER_NOTIFICATIONS'
  >('USER_INFO');
  const router = useRouter();

  if (error) throw new Error('YOUR ACCESS TO THIS PAGE IS DENIED');

  useLayoutEffect(() => {
    pb.collection('users')
      .authRefresh()
      .then(async () => {
        if (!pb.authStore.isValid || !pb.authStore.model)
          return router.replace('/sign-in');

        try {
          const user = await pb
            .collection('users')
            .getOne<User>(pb.authStore.model.id);
          setUserData(() => user);
        } catch (err) {
          setError(true);
        }
      })
      .catch(_err => {
        pb.authStore.clear();
        router.replace('/sign-in');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto mt-20 flex items-center justify-center lg:max-w-[1000px]">
      <div className="rounded-3xl bg-[#cbdad5] p-5 dark:bg-[#19222b] lg:w-[700px]">
        <div className="mb-16 flex flex-col justify-between px-5 pt-10">
          <h1 className="py-5 text-3xl font-bold text-[#5b5b5b] dark:text-white">
            تنظیمات حساب کاربری
          </h1>
          <p className="text-[#5b5b5b] dark:text-white">
            جهت هرگونه ویرایش اطلاعات حساس، حتما باید رمز عبور خود را ارائه
            نمایید.
          </p>
        </div>

        <div>
          <div className="pb-4">
            <Link
              className={`${
                activeTab === 'USER_INFO'
                  ? 'profileActiveTab dark:profileActiveTabDark'
                  : 'text-[#5b5b5b] dark:text-white'
              } p-5 text-lg font-bold`}
              href={''}
              onClick={e => {
                e.preventDefault();
                setactiveTab('USER_INFO');
              }}
            >
              اطلاعات کاربری{' '}
            </Link>
            <Link
              className={`${
                activeTab === 'USER_PRIVACY'
                  ? 'profileActiveTab dark:profileActiveTabDark'
                  : 'text-[#5b5b5b] dark:text-white'
              } p-5 text-lg font-bold`}
              href={''}
              onClick={e => {
                e.preventDefault();
                setactiveTab('USER_PRIVACY');
              }}
            >
              امنیت{' '}
            </Link>
            <Link
              className={`${
                activeTab === 'USER_NOTIFICATIONS'
                  ? 'profileActiveTab dark:profileActiveTabDark'
                  : 'text-[#5b5b5b] dark:text-white'
              } p-5 text-lg font-bold`}
              href={''}
              onClick={e => {
                e.preventDefault();
                setactiveTab('USER_NOTIFICATIONS');
              }}
            >
              اطلاع رسانی{' '}
            </Link>
          </div>
          <div
            className="rounded-b-3xl rounded-tl-3xl border-[3px] border-dashed border-black bg-[#89a7b1]
          px-5 py-10 dark:border-solid dark:border-[#d89c38] dark:bg-[#0f141a] lg:w-[800px]"
          >
            {!userData ? (
              <div className="flex items-center gap-5">
                <Image
                  src={loading}
                  width={50}
                  alt="تا بارگذاری صفحه منتظر باشید..."
                />
                <span className="">لطفا تا بارگذاری صفحه منتظر باشید...</span>
              </div>
            ) : activeTab === 'USER_INFO' ? (
              <UserProfileInfo />
            ) : activeTab === 'USER_PRIVACY' ? (
              <UserSecurity />
            ) : activeTab === 'USER_NOTIFICATIONS' ? (
              'NOTIFICATION'
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="my-10">
          <button
            type="submit"
            form="editUserProfileForm"
            className="rounded-2xl bg-[#ea777b] p-5 font-bold text-white dark:bg-[#d89c38] max-lg:ml-3 lg:ml-10"
          >
            ذخیره تنظیمات
          </button>
          <Link
            href={'/'}
            className="rounded-2xl bg-[#5b5b5b] p-5 font-bold text-white dark:bg-[#3289b3]"
          >
            برگشت به صفحه ی اصلی
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Page;
