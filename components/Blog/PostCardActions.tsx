'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Pocketbase from 'pocketbase';
import toast, { Toaster } from 'react-hot-toast';
import { userInteraction } from '@/utility/types';
import Confetti from 'react-confetti';

import heart from '@/icons/heart.svg';
import bookmark from '@/icons/bookmark.svg';
import share from '@/icons/share.svg';
import bugReport from '@/icons/bug-report.svg';
import ShareOnSocialMedia from './ShareOnSocialMedia';
import Report from './Report';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function PostCardActions({
  postId,
  title,
  slug,
}: {
  postId: string;
  title: string;
  slug: string;
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [userActivity, setuserActivity] = useState({
    id: '',
    history: false,
    liked: false,
    bookmarked: false,
  });

  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  const closeReportModal = () => {
    setReportModalOpen(false);
  };

  useEffect(() => {
    if (pb.authStore.isValid) {
      pb.collection('user_interaction')
        .getFirstListItem<userInteraction>(
          pb.filter('post_id = {:postId}', { postId })
        )
        .then(data => {
          setuserActivity(() => ({
            id: data.id,
            history: true,
            liked: data.liked,
            bookmarked: data.bookmarked,
          }));
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showConfetti ? (
        <Confetti
          recycle={false}
          onConfettiComplete={() => {
            setShowConfetti(false);
          }}
        />
      ) : (
        ''
      )}

      {shareModalOpen ? (
        <ShareOnSocialMedia
          modalControl={{ shareModalOpen, closeModal: closeShareModal }}
          title={title}
          slug={slug}
        />
      ) : (
        ''
      )}

      {reportModalOpen ? (
        <Report
          modalControl={{ reportModalOpen, closeModal: closeReportModal }}
          postId={postId}
        />
      ) : (
        ''
      )}

      <div
        className="col-span-12 my-auto hidden justify-center gap-10 px-5 lg:col-span-1
      lg:mx-auto lg:flex lg:flex-col lg:px-0"
      >
        <Link
          href={''}
          title="اضافه کردن به مقالات مورد علاقه"
          className="svg-red mx-1"
          onClick={async e => {
            e.preventDefault();

            if (!pb.authStore.isValid) {
              return toast.error('باید ابتدا وارد حساب کاربری خود شوید.', {
                id: 'SING_IN_FIRST',
              });
            }

            if (userActivity.liked && pb.authStore.model) {
              try {
                const { liked } = await pb
                  .collection('user_interaction')
                  .update<userInteraction>(userActivity.id, {
                    liked: !userActivity.liked,
                  });

                setuserActivity(prev => ({
                  ...prev,
                  liked,
                }));
              } catch (error) {
                return toast.error('درخواست شما با خطا مواجه شد.');
              }
            }

            if (!userActivity.history && !userActivity.liked) {
              try {
                const { id, liked, bookmarked } = await pb
                  .collection('user_interaction')
                  .create<userInteraction>({
                    user_id: pb.authStore.model?.id,
                    post_id: postId,
                    liked: true,
                    bookmarked: false,
                  });

                setuserActivity(() => ({
                  id,
                  liked,
                  bookmarked,
                  history: true,
                }));

                setShowConfetti(() => true);
              } catch (error) {
                return toast.error('درخواست شما با خطا مواجه شد.');
              }
            }

            if (userActivity.history && !userActivity.liked) {
              try {
                const { liked } = await pb
                  .collection('user_interaction')
                  .update<userInteraction>(userActivity.id, {
                    liked: !userActivity.liked,
                  });

                setuserActivity(prev => ({
                  ...prev,
                  liked,
                }));

                setShowConfetti(() => true);
              } catch (error) {
                return toast.error('درخواست شما با خطا مواجه شد.');
              }
            }
          }}
        >
          <Image
            src={heart}
            width={35}
            alt="اضافه کردن به مقالات مورد علاقه"
            className={`${
              userActivity.liked
                ? 'svg-liked'
                : 'svg-current-color invert dark:invert-0'
            }`}
          />
        </Link>
        <Link
          href={''}
          className="svg-yellow mx-1"
          title="نشان کردن مقاله"
          onClick={async e => {
            e.preventDefault();

            if (!pb.authStore.isValid) {
              return toast.error('باید ابتدا وارد حساب کاربری خود شوید.', {
                id: 'REPORT_LOGGED_IN_ACC_ERR',
              });
            }

            if (userActivity.bookmarked && pb.authStore.model) {
              try {
                const { bookmarked } = await pb
                  .collection('user_interaction')
                  .update<userInteraction>(userActivity.id, {
                    bookmarked: !userActivity.bookmarked,
                  });

                setuserActivity(prev => ({
                  ...prev,
                  bookmarked,
                }));
              } catch (error) {
                return toast.error('درخواست شما با خطا مواجه شد.', {});
              }
            }

            if (!userActivity.history && !userActivity.bookmarked) {
              try {
                const { id, liked, bookmarked } = await pb
                  .collection('user_interaction')
                  .create<userInteraction>({
                    user_id: pb.authStore.model?.id,
                    post_id: postId,
                    liked: false,
                    bookmarked: true,
                  });

                setuserActivity(() => ({
                  id,
                  liked,
                  bookmarked,
                  history: true,
                }));

                setShowConfetti(() => true);
              } catch (error) {
                return toast.error('درخواست شما با خطا مواجه شد.', {});
              }
            }

            if (userActivity.history && !userActivity.bookmarked) {
              try {
                const { bookmarked } = await pb
                  .collection('user_interaction')
                  .update<userInteraction>(userActivity.id, {
                    bookmarked: !userActivity.bookmarked,
                  });

                setuserActivity(prev => ({
                  ...prev,
                  bookmarked,
                }));

                setShowConfetti(() => true);
              } catch (error) {
                return toast.error('درخواست شما با خطا مواجه شد.', {});
              }
            }
          }}
        >
          <Image
            src={bookmark}
            width={35}
            alt="نشان کردن مقاله"
            className={`${
              userActivity.bookmarked
                ? 'svg-bookmarked'
                : 'svg-current-color invert dark:invert-0'
            }`}
          />
        </Link>
        <Link
          href={''}
          className="svg-blue mx-1"
          title="اشتراک گذاری مقاله"
          onClick={e => {
            e.preventDefault();
            setShareModalOpen(!shareModalOpen);
          }}
        >
          <Image
            src={share}
            width={35}
            alt="اشتراک گذاری مقاله"
            className="svg-current-color invert dark:invert-0"
          />
        </Link>
        <Link
          href={''}
          className="svg-orange mx-1"
          title="گزارش خطا در مقاله"
          onClick={e => {
            e.preventDefault();
            if (pb.authStore.isValid && pb.authStore.model?.verified) {
              setReportModalOpen(true);
            } else {
              toast.error(
                'برای انجام این عملیات باید حسابتان تایید شده باشد.',
                { id: 'REPORT_VERIFIED_ACC_ERR' }
              );
            }
          }}
        >
          <Image
            src={bugReport}
            width={35}
            alt="گزارش خطا در مقاله"
            className="svg-current-color invert dark:invert-0"
          />
        </Link>
        <Toaster />
      </div>
    </>
  );
}

export default PostCardActions;
