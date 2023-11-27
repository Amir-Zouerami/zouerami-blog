'use client';
import { editNewsletterInfo } from '@/utility/actions';
import { Newsletter } from '@/utility/types';
import Pocketbase from 'pocketbase';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function UserNotification() {
  const [notification, setNotification] = useState({
    id: '',
    advertisement: false,
    messages: false,
    updated: false,
  });

  useEffect(() => {
    pb.collection('newsletter')
      .getFirstListItem<Pick<Newsletter, 'advertisement' | 'messages' | 'id'>>(
        pb.filter('user={:userId}', { userId: pb.authStore?.model?.id }),
        { fields: 'advertisement, messages, id' }
      )
      .then(res => {
        setNotification(_prev => ({
          id: res.id,
          advertisement: res.advertisement,
          messages: res.messages,
          updated: false,
        }));
      })
      .catch(e => {
        console.log('ERROR FETCHING NEWSLETTER');
      });
  }, []);

  return (
    <div>
      <div className="flex w-full flex-col justify-between gap-10">
        <div>
          <p>در این بخش می توانید دسته بندی ایمیل های ارسالی مشخص کنید.</p>
        </div>
        <form
          id="editUserProfileForm"
          action={async (rawFormData: FormData) => {
            const res = await editNewsletterInfo(
              rawFormData,
              pb.authStore.exportToCookie(),
              notification.updated,
              notification.id
            );

            if (!res.ok) {
              let errorMessage;
              switch (res.level) {
                case 'NO_CHANGE':
                  errorMessage =
                    'تنظیمات خود را تغییر نداده اید. نیازی به به روز رسانی نیست.';
                  break;

                default:
                  errorMessage = 'خطا: مشکلی در ثبت درخواست شما پیش آمده است.';
                  break;
              }

              return toast.error(errorMessage, {
                id: 'ERROR_EDITING_NEWSLETTER',
              });
            }

            return toast.success('تنظیمات شما به روز رسانی شد.', {
              id: 'SUCCESS_EDITING_NEWSLETTER',
            });
          }}
          className="flex flex-col items-start gap-5"
        >
          <label
            dir="ltr"
            className="relative mb-5 inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              value="advertisement"
              name="advertisement"
              className="peer sr-only"
              checked={notification.advertisement}
              onChange={e => {
                if (e.target.checked)
                  setNotification(prev => ({
                    ...prev,
                    advertisement: true,
                    updated: true,
                  }));

                if (!e.target.checked)
                  setNotification(prev => ({
                    ...prev,
                    advertisement: false,
                    updated: true,
                  }));
              }}
            />
            <div
              className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5
            after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600
            peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
            dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
            ></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              :تبلیغات
            </span>
          </label>

          <label
            dir="ltr"
            className="relative mb-5 inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              checked={notification.messages}
              value="messages"
              name="messages"
              onChange={e => {
                if (e.target.checked)
                  setNotification(prev => ({
                    ...prev,
                    messages: true,
                    updated: true,
                  }));

                if (!e.target.checked)
                  setNotification(prev => ({
                    ...prev,
                    messages: false,
                    updated: true,
                  }));
              }}
              className="peer sr-only"
            />
            <div
              className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5
            after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600
            peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
            dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
            ></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              :پیام های ارسالی
            </span>
          </label>
        </form>
      </div>
    </div>
  );
}

export default UserNotification;
