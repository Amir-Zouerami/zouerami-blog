'use client';

import Image from 'next/image';
import Pocketbase from 'pocketbase';
import { useEffect, useState } from 'react';

import loading from '@/icons/loading.svg';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function UserSecurity() {
  const [OAuthMethods, setOAuthMethods] =
    useState<Array<Record<string, string>>>();

  useEffect(() => {
    pb.collection('users')
      .listExternalAuths(pb.authStore?.model?.id)
      .then(res => {
        setOAuthMethods(res);
      })
      .catch(() => console.log('ERROR'));
  }, []);

  return (
    <div>
      <div className="flex w-full flex-col justify-between gap-10">
        {!OAuthMethods ? (
          <div className="flex items-center gap-5">
            <Image
              src={loading}
              width={50}
              alt="تا بارگذاری صفحه منتظر باشید..."
            />
            <span>لطفا تا بارگذاری صفحه منتظر باشید...</span>
          </div>
        ) : (
          <>
            <div className="max-lg:flex max-lg:flex-col max-lg:gap-5">
              <span className="font-bold">روش/روش‌های استفاده شده برای ثبت نام: </span>
              {(() => {
                if (OAuthMethods.length === 0)
                  return (
                    <span className="mx-3 rounded-xl bg-[#3b7d80] p-2 text-center font-bold text-white">
                      ایمیل/نام کاربری + رمز عبور
                    </span>
                  );

                const OAUTHLIST = OAuthMethods.map(method => (
                  <span
                    className="mx-3 rounded-xl bg-[#3b7d80] p-2 text-center font-bold text-white"
                    key={method.id}
                  >
                    استفاده از حساب {method.provider}
                  </span>
                ));

                return OAUTHLIST;
              })()}
            </div>

            <div>
              <span className="text-[#2b2b2b] dark:text-white">
                وضعیت تایید حساب:{' '}
              </span>
              {pb.authStore?.model?.verified ? (
                <span className="text-lg font-bold text-[#193280] dark:text-green-500">
                  تایید شده
                </span>
              ) : (
                <span className="text-lg font-bold text-red-500">
                  تایید نشده
                </span>
              )}

              <div className="my-3">
                <span>ایمیل شما: </span>
                <span>{pb.authStore?.model?.email}</span>
              </div>
              <div className="my-3">
                <span>نام کاربری شما: </span>
                <span>{pb.authStore?.model?.username}</span>
              </div>
            </div>

            {OAuthMethods.length > 0 ? (
              <>
                <div>
                  <p className="text-justify leading-9">
                    <span className="font-bold text-red-500">تذکر: </span>
                    از آنجایی که شما از سرویس هایی مثل گوگل یا گیت هاب برای ثبت
                    نام استفاده کرده اید، نمی توانید با رمز عبور عادی وارد حساب
                    خود شوید. در صورتی که می خواهید با رمز عبور وارد حسابتان
                    شوید از گزینه ی{' '}
                    <span className="font-bold">«تغییر رمز عبور»</span> استفاده
                    کنید.
                  </p>
                </div>
              </>
            ) : (
              ''
            )}

            <div>
              <form
                id="editUserProfileForm"
                action={async (rawFormData: FormData) => {
                  console.log('ARRAY ', Array.from(rawFormData.entries()));
                  console.log('LENGTH ', [...rawFormData.entries()].length);
                }}
              >
                <div className="flex flex-col gap-5">
                  <p className="text-lg">تغییر رمز عبور</p>

                  <div>
                    <label
                      className="inline-block max-lg:mb-3 lg:ml-3"
                      htmlFor="currentPassword"
                    >
                      رمز عبور فعلی:{' '}
                    </label>
                    <input
                      className="w-[300px] rounded-3xl bg-[#cbdad5] p-3 text-black outline-none dark:bg-[#2f353c] dark:text-white max-lg:w-full"
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                    />
                  </div>

                  <div>
                    <label
                      className="inline-block max-lg:mb-3 lg:ml-3"
                      htmlFor="newPassword"
                    >
                      رمز عبور جدید:{' '}
                    </label>
                    <input
                      className="w-[300px] rounded-3xl bg-[#cbdad5] p-3 text-black outline-none dark:bg-[#2f353c] dark:text-white max-lg:w-full"
                      type="password"
                      name="newPassword"
                      id="newPassword"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div>
              <p className="py-5">ارسال دوباره ایمیل تایید حساب کاربری: </p>
              <button
                className={`reactiveButton rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5
                font-bold text-white ${
                  pb.authStore?.model?.verified
                    ? 'hover:cursor-not-allowed'
                    : 'hover:cursor-pointer'
                }`}
                disabled={pb.authStore?.model?.verified}
                title={`${
                  pb.authStore?.model?.verified
                    ? 'حساب شما قبلا فعال شده است'
                    : 'برای ارسال ایمیل کلیک کنید'
                }`}
                onClick={e => {
                  console.log(e);
                }}
              >
                ارسال ایمیل فعال سازی
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserSecurity;
