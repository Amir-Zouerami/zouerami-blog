'use client';
export const fetchCache = 'default-no-store';

import Pocketbase from 'pocketbase';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addCookie } from '@/utility/cookie';
import Image from 'next/image';
import loading from '@/icons/loading.svg';
import checkmark from '@/icons/checkmark.svg';

import toast, { Toaster } from 'react-hot-toast';
import { toastOptions } from '@/utility/toast';

function Page() {
  const [isLoading, setisLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectURL = 'http://localhost:3000/oauth2-redirect';

  useEffect(() => {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    const providerString = localStorage.getItem('oAuth_provider');
    const providerData = providerString ? JSON.parse(providerString) : false;
    const oAuthState = searchParams.get('state');
    const oAuthCode = searchParams.get('code');

    if (
      !providerData ||
      !oAuthState ||
      !oAuthCode ||
      providerData.state !== oAuthState
    ) {
      toast.error('در فرآیند مشکلی پیش آمده است. لطفا مدیریت را با خبر کنید.', {
        id: 'OAUTH_PROBLEM_OCCURED',
        ...toastOptions,
      });

      return router.push('/');
    }

    pb.collection('users')
      .authWithOAuth2Code(
        providerData.name,
        oAuthCode,
        providerData.codeVerifier,
        redirectURL
      )
      .then(async authData => {
        addCookie(pb.authStore.exportToCookie({ httpOnly: false }));
        localStorage.removeItem('oAuth_provider');

        if (authData.meta && authData.meta.isNew) {
          const fetchResponse = await fetch(authData.meta.avatarUrl);

          const userAvatar = fetchResponse.ok
            ? await fetchResponse.blob()
            : undefined;

          const username =
            authData.meta.username && authData.meta.username !== ''
              ? authData.meta.username
              : authData.meta.name.replace(/\s/g, '') +
                Math.floor(1000 + Math.random() * 9000).toString();

          console.log('META USERNAME: ', authData.meta.username);
          console.log(
            'META USERNAME 2: ',
            authData.meta.name.replace(/\s/g, '') +
              Math.floor(1000 + Math.random() * 9000).toString()
          );
          console.log('ALL IN ONE: ', username);

          await pb
            .collection('users')
            .update(authData.record.id, {
              avatar: userAvatar,
              username,
            })
            .then(() => {
              setisLoading(false);
            })
            .catch(err => {
              console.log('AVATAR UPDATE ERROR');
              throw new Error(err);
            });
        }

        setisLoading(false);
      })
      .catch(err => {
        console.log('An Error Occured During the OAuth Callback: ', err);
        throw new Error('An Error Occured During the OAuth Callback:');
      });
  }, [searchParams, router]);

  return (
    <>
      <Toaster />
      <div className="mx-auto my-32 flex h-[60vh] flex-col justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Image
              src={loading}
              width={50}
              height={50}
              alt="wait until you are registered"
              className="align-bottom"
            />
            <span className="mx-3 self-center text-xl font-bold">
              لطفا تا پایان عملیات احراز هویت صبر کنید...
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Image
                src={checkmark}
                width={50}
                height={50}
                alt="please wait for the authentication process to finish."
                className="align-bottom"
              />
              <span className="mx-3 text-xl font-bold">
                احراز هویت شما با موفقیت انجام شد!
              </span>
            </div>

            <div className="mx-auto mt-10 flex max-w-[90vw] flex-col items-center justify-center rounded-xl border p-6 lg:max-w-[60vw]">
              <p className="mb-5 text-lg font-bold">
                لطفا نکات زیر را به دقت مطالعه کنید:
              </p>
              <ul className="p-3 text-justify leading-8">
                <li className="list-item list-disc p-2">
                  شما از شبکه های اجتماعی برای احراز هویت استفاده کرده اید!
                </li>

                <li className="list-item list-disc p-2">
                  با مراجعه به تنظیمات پروفایل، می توانید برای خود یک رمز عبور
                  تنظیم کنید تا با رمز عبور و ایمیل عادی وارد شوید.
                </li>

                <li className="list-item list-disc p-2">
                  در غیر این صورت، از این به بعد برای ورود نیز باید از دکمه های
                  «ورود با شبکه های اجتماعی» استفاده کنید.
                </li>
              </ul>

              <button
                className="rounded-2xl bg-gradient-to-l from-[#005ffc] to-[#7f42f8] px-7 py-4 font-extrabold hover:opacity-[.7]"
                onClick={() => {
                  router.push('/');
                }}
              >
                متوجه شدم
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Page;
