'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Pocketbase from 'pocketbase';

function Report({
  modalControl,
  postId,
}: {
  modalControl: { reportModalOpen: boolean; closeModal: () => void };
  postId: string;
}) {
  const [isReqSent, setIsReqSent] = useState(false);

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
        modalControl.reportModalOpen ? 'shareArticleModalOpen' : ''
      } absolute right-0 top-0 z-[99] flex h-[100%] w-[100%] items-center justify-center bg-[#293036] opacity-[.9]`}
    >
      <div>
        <h3 className="mb-10 px-5 text-center text-2xl font-black lg:text-3xl">
          گزارش اشتباهات مقاله / مشکلات صفحه
        </h3>

        <div className="flex flex-col items-center justify-center gap-10 text-lg lg:w-[900px]">
          <p className="text-sm">
            این درخواست برای هر پست فقط یک بار قابل ثبت بوده و امکان ویرایش
            ندارد. در نوشتار خود دقت داشته باشید.
          </p>
          <span className="pl-3 text-xl">
            مشکل مورد نظر را در حداکثر ۲۰۰ کلمه بنویسید:{' '}
          </span>
          <textarea
            id="reportBlogTeaxtarea"
            placeholder="مشکل مورد نظر را در این قسمت بنویسید..."
            className="h-[300px] w-[95%] rounded-2xl bg-[#000000] p-5 outline-none lg:w-[500px]"
          />
          <div className="flex flex-col gap-10 lg:flex-row">
            <button
              className="rounded-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-5 py-3 hover:opacity-[.7]"
              onClick={() => modalControl.closeModal()}
            >
              بستن این صفحه
            </button>

            <button
              className="rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-3 hover:opacity-[.7]"
              onClick={async () => {
                if (isReqSent)
                  return toast.error('لطفا تا پایان درخواست قبل صبر کنید.', {
                    id: 'TOO_MANY_REQ',
                  });

                setIsReqSent(true);

                setTimeout(() => {
                  setIsReqSent(false);
                }, 3000);

                const textarea = document.getElementById(
                  'reportBlogTeaxtarea'
                ) as HTMLTextAreaElement;

                if (
                  textarea.value.trim().length < 50 ||
                  textarea.value.trim().length > 1100
                ) {
                  return toast.error(
                    'پیام شما نباید خیلی کوتاه یا خیلی بلند باشد.',
                    { id: 'REPORT_LENGTH_ERROR' }
                  );
                } else {
                  try {
                    const pb = new Pocketbase(
                      process.env.NEXT_PUBLIC_PB_DOMAIN
                    );
                    const submitReport = async () => {
                      return pb.collection('user_reports').create({
                        user_id: pb.authStore.model?.id,
                        post_id: postId,
                        message: textarea.value,
                      });
                    };

                    toast.promise(
                      submitReport(),
                      {
                        loading: 'در حال ثبت...',
                        success: 'گزارش شما با موفقیت ثبت شد.',
                        error:
                          'گزارش شما ثبت نشد.\n\n در صورتی که قبلا برای این مقاله گزارش ثبت کرده‌اید، نمی‌توانید این کار را دوباره انجام بدهید.',
                      },
                      { id: 'REPORT_SUBMISSION_PROMISE' }
                    );
                  } catch (error) {
                    console.log('ERROR in REPORT SUBMISSION');
                  }
                }
              }}
            >
              ارسال به ادمین
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
