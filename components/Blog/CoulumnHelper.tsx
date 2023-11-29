'use client';

import Image from 'next/image';
import Link from 'next/link';
import Pocketbase from 'pocketbase';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { userActivity } from '@/utility/types';
import toast from 'react-hot-toast';
import ShareOnSocialMedia from './ShareOnSocialMedia';
import Report from './Report';

import heart from '@/icons/heart.svg';
import share from '@/icons/share.svg';
import bookmark from '@/icons/bookmark.svg';
import comment from '@/icons/comment.svg';
import report from '@/icons/report.svg';

function CoulumnHelper({ postId, title }: { postId: string; title: string }) {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
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
      pb.collection('user_activity')
        .getFirstListItem<userActivity>(
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
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {shareModalOpen ? (
        <ShareOnSocialMedia
          modalControl={{ shareModalOpen, closeModal: closeShareModal }}
          title={title}
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
      <div className="flex items-center justify-center">
        <div
          className="md:desktopColumnHelper max-md:columnHelper fixed bottom-3 flex justify-center gap-8 rounded-3xl
        bg-[#1E1F25] p-5 font-bold max-md:flex-row md:flex-col lg:bottom-auto lg:right-10 lg:top-[50%]"
        >
          <div className="text-white hover:text-cyan-500">
            <Link
              href={'#'}
              onClick={async e => {
                e.preventDefault();

                if (!pb.authStore.isValid) {
                  return toast.error('باید ابتدا وارد حساب کاربری خود شوید.', {
                    position: 'top-center',
                    id: 'SING_IN_FIRST',
                  });
                }

                if (userActivity.liked && pb.authStore.model) {
                  try {
                    const { liked } = await pb
                      .collection('user_activity')
                      .update<userActivity>(userActivity.id, {
                        liked: !userActivity.liked,
                      });

                    setuserActivity(prev => ({
                      ...prev,
                      liked,
                    }));
                  } catch (error) {
                    return toast.error('درخواست شما با خطا مواجه شد.', {
                      position: 'top-center',
                    });
                  }
                }

                if (!userActivity.history && !userActivity.liked) {
                  try {
                    const { id, liked, bookmarked } = await pb
                      .collection('user_activity')
                      .create<userActivity>({
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
                    return toast.error('درخواست شما با خطا مواجه شد.', {
                      position: 'top-center',
                    });
                  }
                }

                if (userActivity.history && !userActivity.liked) {
                  try {
                    const { liked } = await pb
                      .collection('user_activity')
                      .update<userActivity>(userActivity.id, {
                        liked: !userActivity.liked,
                      });

                    setuserActivity(prev => ({
                      ...prev,
                      liked,
                    }));

                    setShowConfetti(() => true);
                  } catch (error) {
                    return toast.error('درخواست شما با خطا مواجه شد.', {
                      position: 'top-center',
                    });
                  }
                }
              }}
            >
              <Image
                src={heart}
                width={35}
                alt="sample"
                className={`${
                  userActivity.liked ? 'svg-liked' : ''
                } inline-block`}
              />
              <span className="max-md:columnSpan desktopColumnSpan mr-2">
                {userActivity.liked
                  ? 'حذف از مقالات پسندیده'
                  : 'پسندیدن این مقاله'}
              </span>
            </Link>
          </div>

          {showConfetti ? (
            <Confetti
              width={400}
              height={400}
              recycle={false}
              onConfettiComplete={() => {
                setShowConfetti(false);
              }}
            />
          ) : (
            ''
          )}

          <div className="text-white hover:text-cyan-500">
            <Link
              href={'#'}
              onClick={e => {
                e.preventDefault();
                setShareModalOpen(!shareModalOpen);
              }}
            >
              <Image
                src={share}
                width={35}
                alt="sample"
                className="inline-block"
              />
              <span className="max-md:columnSpan desktopColumnSpan mr-2 max-md:hidden">
                اشتراک گذاری مقاله
              </span>
            </Link>
          </div>

          <div className="text-white hover:text-cyan-500">
            <Link
              href={'#'}
              onClick={async e => {
                e.preventDefault();

                if (!pb.authStore.isValid) {
                  return toast.error('باید ابتدا وارد حساب کاربری خود شوید.', {
                    position: 'top-center',
                    id: 'REPORT_LOGGED_IN_ACC_ERR',
                  });
                }

                if (userActivity.bookmarked && pb.authStore.model) {
                  try {
                    const { bookmarked } = await pb
                      .collection('user_activity')
                      .update<userActivity>(userActivity.id, {
                        bookmarked: !userActivity.bookmarked,
                      });

                    setuserActivity(prev => ({
                      ...prev,
                      bookmarked,
                    }));
                  } catch (error) {
                    return toast.error('درخواست شما با خطا مواجه شد.', {
                      position: 'top-center',
                    });
                  }
                }

                if (!userActivity.history && !userActivity.bookmarked) {
                  try {
                    const { id, liked, bookmarked } = await pb
                      .collection('user_activity')
                      .create<userActivity>({
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
                    return toast.error('درخواست شما با خطا مواجه شد.', {
                      position: 'top-center',
                    });
                  }
                }

                if (userActivity.history && !userActivity.bookmarked) {
                  try {
                    const { bookmarked } = await pb
                      .collection('user_activity')
                      .update<userActivity>(userActivity.id, {
                        bookmarked: !userActivity.bookmarked,
                      });

                    setuserActivity(prev => ({
                      ...prev,
                      bookmarked,
                    }));

                    setShowConfetti(() => true);
                  } catch (error) {
                    return toast.error('درخواست شما با خطا مواجه شد.', {
                      position: 'top-center',
                    });
                  }
                }
              }}
            >
              <Image
                src={bookmark}
                width={35}
                alt="sample"
                className={`${
                  userActivity.bookmarked ? 'svg-bookmarked' : ''
                } inline-block`}
              />
              <span className="max-md:columnSpan desktopColumnSpan mr-2 max-md:hidden">
                {userActivity.bookmarked
                  ? 'حذف از مقالات نشان شده'
                  : 'نشان کردن برای مطالعه'}
              </span>
            </Link>
          </div>

          <div
            className="text-white hover:text-cyan-500"
            onClick={() => {
              window.scrollTo({
                top: document.getElementById('commentsModal')!.offsetTop - 300,
                behavior: 'smooth',
              });
            }}
          >
            <a href={'#'} onClick={e => e.preventDefault()}>
              <Image
                src={comment}
                width={35}
                alt="sample"
                className="inline-block"
              />
              <span className="max-md:columnSpan desktopColumnSpan mr-2 max-md:hidden">
                نمایش کامنت ها
              </span>
            </a>
          </div>

          <div className="text-white hover:text-cyan-500">
            <Link
              href={'#'}
              onClick={e => {
                e.preventDefault();
                if (pb.authStore.isValid && pb.authStore.model?.verified) {
                  setReportModalOpen(true);
                } else {
                  toast.error(
                    'برای انجام این عملیات باید حسابتان تایید شده باشد.',
                    { position: 'top-center', id: 'REPORT_VERIFIED_ACC_ERR' }
                  );
                }
              }}
            >
              <Image
                src={report}
                width={35}
                alt="sample"
                className="inline-block"
              />
              <span className="max-md:columnSpan desktopColumnSpan mr-2 max-md:hidden">
                گزارش اشتباهات و مشکلات
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoulumnHelper;
