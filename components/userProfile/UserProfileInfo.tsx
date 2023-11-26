'use client';

import Image from 'next/image';
import Link from 'next/link';
import image from '@/icons/image.svg';
import defaultUser from '@/icons/user.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { createFileURL } from '@/utility/utils';
import toast from 'react-hot-toast';
import Pocketbase from 'pocketbase';
import { useRouter } from 'next/navigation';
import { editProfileInfo } from '@/utility/actions';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function UserProfileInfo() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState<false | string>(
    pb.authStore?.model?.avatar
      ? createFileURL(
          pb.authStore.model.id,
          pb.authStore.model.collectionId,
          pb.authStore.model.avatar
        )
      : false
  );

  useEffect(() => {
    if (!pb.authStore.model || !pb.authStore.isValid) {
      pb.authStore.clear();
      return router.replace('/sign-in');
    }

    setUsername(pb.authStore.model.username);
    setEmail(pb.authStore.model.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      id="editUserProfileForm"
      className="flex w-full flex-col items-center justify-between lg:flex-row"
      action={async (rawFormData: FormData) => {
        const res = await editProfileInfo(
          rawFormData,
          pb.authStore.exportToCookie()
        );

        if (!res.ok) {
          let errorMessage;
          switch (res.level) {
            case 'NONE':
              errorMessage =
                'خطا: از خالی نبودن فیلد ها و اعتبار آنها اطمینان حاصل کنید.';
              break;

            case 'EMAIL_VALIDATION':
              errorMessage = 'ایمیل ارسال شده معتبر نیست.';
              break;

            case 'AVATAR':
              errorMessage =
                'از فرمت های png، jpg یا webp برای تصویر پروفایل خود استفاده کنید..';
              break;

            default:
              errorMessage =
                'درخواست شما با خطای سرور روبرو شد بعدا دوباره امتحان کنید.';
              break;
          }

          return toast.error(errorMessage, {
            id: 'ERRROR_EDITING_PROFILE_INFO',
          });
        }

        let successMessage;
        switch (res.level) {
          case 'SECOND':
            successMessage =
              'عملیات موفقیت آمیز بود. لینک نهایی سازی درخواست، به ایمیل جدید شما ارسال شد.';
            break;

          default:
            successMessage = 'پروفایل کاربری شما با موفقیت به روز رسانی شد.';
            break;
        }

        return toast.success(successMessage, {
          id: 'SUCCESS_EDITING_PROFILE_INFO',
        });
      }}
    >
      <div className="lg:grow">
        <div className="flex flex-col gap-10">
          <div>
            <label
              className="mb-5 inline-block pr-3 text-black dark:text-white"
              htmlFor="profile_username"
            >
              نام کاربری:{' '}
            </label>

            <input
              id="profile_username"
              name="username"
              className="w-full rounded-3xl bg-[#cbdad5] p-3 text-black outline-none dark:bg-[#2f353c] dark:text-white"
              type="text"
              dir="ltr"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div>
            <label
              className="mb-5 inline-block pr-3 text-black dark:text-white"
              htmlFor="profile_email"
            >
              ایمیل:{' '}
            </label>
            <input
              id="profile_email"
              name="email"
              className="w-full rounded-3xl bg-[#cbdad5] p-3 text-black outline-none dark:bg-[#2f353c] dark:text-white"
              type="text"
              value={email}
              dir="ltr"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="text-white max-lg:mb-10 max-lg:text-center lg:mb-5">
            <span className="text-[#2b2b2b] dark:text-white">
              وضعیت تایید حساب:{' '}
            </span>
            {pb.authStore?.model?.verified ? (
              <span className="text-lg font-bold text-[#193280] dark:text-green-500">
                تایید شده
              </span>
            ) : (
              <span className="text-lg font-bold text-red-500">تایید نشده</span>
            )}
            {!pb.authStore?.model?.verified ? (
              <p className="pt-2 text-sm text-[#2b2b2b] dark:text-white">
                لطفا از سربرگ «امنیت» برای تایید حساب خود اقدام کنید.
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="text-center lg:mr-10">
        <div
          className={`relative flex flex-col items-center justify-center overflow-hidden`}
        >
          <Link
            href={''}
            onClick={e => {
              e.preventDefault();
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            className={`${
              !userAvatar ? 'hidden' : ''
            }absolute bottom-0 flex w-full items-center justify-center bg-black opacity-[.6] transition-all
             lg:left-0 lg:h-full lg:w-auto lg:max-w-[60px] lg:-translate-x-8 lg:hover:translate-x-0`}
          >
            <Image
              src={image}
              width={50}
              height={50}
              className="svg-white h-[50px] w-[50px]"
              alt="تغییر تصویر پروفایل"
            />
          </Link>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg, image/jpg, image/png, image/webp"
            className="hidden"
            name="user_avatar"
            id="profile_user_avatar"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const allowedTypes = [
                'image/png',
                'image/jpg',
                'image/jpeg',
                'image/webp',
              ];
              const file = event.target.files?.item(0)
                ? event.target.files[0]
                : false;

              if (file && allowedTypes.includes(file.type)) {
                setUserAvatar(URL.createObjectURL(file));
              } else {
                return toast.error(
                  'این فرمت پشتیبانی نمی شود. از png یا jpg یا webp استفاده کنید.'
                );
              }
            }}
          />
          <Image
            src={userAvatar ? userAvatar : defaultUser}
            width={300}
            height={300}
            className={`${
              !userAvatar ? 'svg-white hover:cursor-pointer' : ''
            } h-[250px] w-[250px] border-[3px] border-solid border-black object-cover dark:border-none
            max-lg:rounded-t-full lg:rounded-r-full`}
            alt="تصویر پروفایل کاربر"
            onClick={e => {
              if (!userAvatar && fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          />
          <span className={`${userAvatar ? 'hidden' : 'text-sm'}`}>
            برای تغییر تصویر پروفایل روی آیکون بالا کلیک کنید.
          </span>
        </div>
      </div>
    </form>
  );
}

export default UserProfileInfo;
