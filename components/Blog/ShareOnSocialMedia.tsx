'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import copy from '@/icons/copy.svg';
import telegram from '@/icons/share-telegram.svg';
import whatsapp from '@/icons/share-whatsapp.svg';
import twitter from '@/icons/share-twitter.svg';
import linkedin from '@/icons/share-linkedin.svg';
import Link from 'next/link';
import { useEffect } from 'react';

function ShareOnSocialMedia({
  modalControl,
  title,
}: {
  modalControl: { shareModalOpen: boolean; closeModal: () => void };
  title: string;
}) {
  const pathname = usePathname();
  const shareUrl = encodeURI(`localhost:3000` + pathname);
  const shareTitle = encodeURIComponent(title);

  useEffect(() => {
    window.addEventListener('keydown', key => {
      if (key.code === 'Escape') {
        modalControl.closeModal();
      }
    });

    return () => {
      window.removeEventListener('keydown', key => {
        if (key.code === 'Escape') {
          modalControl.closeModal();
        }
      });
    };
  }, [modalControl]);

  return (
    <div
      className={`${
        modalControl.shareModalOpen ? 'shareArticleModalOpen' : ''
      } absolute right-0 top-0 z-[99] flex h-[100%] w-[100%] items-center justify-center bg-[#293036] opacity-[.9]`}
    >
      <div>
        <h3 className="mb-10 px-5 text-center text-2xl font-black lg:text-3xl">
          اشتراک گذاری در شبکه های اجتماعی
        </h3>

        <div className="flex flex-col items-center justify-center gap-10 text-lg lg:w-[900px]">
          <div className="flex items-center justify-center">
            <span className="pl-3 text-xl">لینک مقاله: </span>
            <input
              id="blogArticleShareLink"
              dir="ltr"
              className="w-[200px] rounded-2xl bg-[#000000] px-5 py-3 outline-none lg:w-[500px]"
              readOnly
              value={`localhost:3000` + pathname}
            />
            <span>
              <Image
                className="svg-white clicked svg-orange mx-5 inline-block hover:cursor-pointer"
                src={copy}
                width={30}
                alt="لینک مقاله را کپی کنید"
                onClick={() => {
                  const input = document.getElementById(
                    'blogArticleShareLink'
                  ) as HTMLInputElement;

                  navigator.clipboard.writeText(input.value);

                  toast.success('کپی شد!', {
                    position: 'top-center',
                    id: 'COPIED_TO_CLIPBOARD',
                  });
                }}
              />
            </span>
          </div>

          <div className="flex gap-10">
            <Link
              href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`}
              className="flex flex-col items-center reactiveButton"
            >
              <Image
                className="inline-block"
                src={telegram}
                width={50}
                alt="share on telegram"
              />
            </Link>
            <Link
              href={`whatsapp://send/?text=${shareTitle}%20${shareUrl}`}
              className="flex flex-col items-center reactiveButton"
            >
              <Image
                className="inline-block"
                src={whatsapp}
                width={50}
                alt="share on telegram"
              />
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              className="flex flex-col items-center reactiveButton"
            >
              <Image
                className="inline-block"
                src={twitter}
                width={50}
                alt="share on telegram"
              />
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              className="flex flex-col items-center reactiveButton"
            >
              <Image
                className="inline-block"
                src={linkedin}
                width={50}
                alt="share on telegram"
              />
            </Link>
          </div>
          <button
            className="rounded-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-5 py-3"
            onClick={modalControl.closeModal}
          >
            بستن این صفحه
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareOnSocialMedia;
