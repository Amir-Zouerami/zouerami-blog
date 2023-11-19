'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { commentsModalAtom } from './ShowCommentsButton';

import SingleComment from './SingleComment';
import CommentTextarea from './CommentTextarea';
import Pocketbase from 'pocketbase';
import Link from 'next/link';
import { Comment, CommentsAPIData } from '@/utility/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import loading from '@/icons/loading.svg';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function Comments({ slug, postId }: { slug: string; postId: string }) {
  const commentsModal = useAtomValue(commentsModalAtom);
  const setCommentsModal = useSetAtom(commentsModalAtom);

  const [commentsArray, setCommentsArray] = useState<Comment[] | undefined>();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    console.log('INSIDE EFFECT PAGE', page);

    if (commentsModal) {
      fetch('http://localhost:3000/api/comments', {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({ postId, page }),
      }).then(async data => {
        const CommentsData: CommentsAPIData = await data.json();
        setCommentsArray(CommentsData.data.items);
        setIsLoading(false);

        if (page >= CommentsData.totalPages) {
          setEnd(() => true);
        }
      });
      // ------------------------------------
      // setCommentsArray([
      //   {
      //     collectionId: 'asd',
      //     collectionName: 'asd',
      //     comment_content: 'asd',
      //     created: 'asd',
      //     id: 'asd',
      //     post_id: 'asd',
      //     updated: 'asdasd',
      //     user_id: 'asdqwe',
      //     expand: {
      //       user_id: {
      //         collectionId: 'asd',
      //         collectionName: 'asd',
      //         created: 'asd',
      //         id: 'asd',
      //         updated: 'asdasd',
      //         email: 'asdads',
      //         emailVisibility: false,
      //         username: 'aaaaaaaaaaaaaaaaaaaaaa',
      //         verified: false,
      //         avatar: '',
      //       },
      //     },
      //   },
      // ]);
      // ------------------------------------
    }
  }, [page, postId, commentsModal]);

  return (
    <div className={`${commentsModal ? 'block' : 'hidden'}`}>
      <div
        className="fixed bottom-0 left-0 right-0 top-0"
        onClick={() => {
          setCommentsModal(!commentsModal);
        }}
      ></div>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[70vh] max-w-[95%] overflow-auto
rounded-t-3xl bg-[#293036] py-4 lg:max-w-[1000px]"
      >
        <div className="relative flex flex-col items-center justify-center overflow-y-auto">
          <span
            onClick={() => {
              setCommentsModal(!commentsModal);
            }}
            className="ml-5 cursor-pointer self-end text-3xl font-black text-white"
          >
            X
          </span>

          <h2 className="p-5 text-2xl font-black text-white">نظرات کاربران</h2>

          {pb.authStore.isValid ? (
            <CommentTextarea />
          ) : (
            <div className="lg:w-1/2">
              <p className="mt-5 text-center text-white">
                {' '}
                برای ثبت نظر باید وارد حساب کاربری خود شوید.
              </p>
              <div className="my-10 flex flex-col items-center justify-around lg:flex-row">
                <Link
                  className="mb-5 rounded-lg bg-gradient-to-r from-[#9554f9] to-[#e289f6] p-4 font-bold text-white hover:from-[#e289f6] hover:to-[#9554f9] lg:mb-0"
                  href={'/sign-in?next=blog/' + slug}
                >
                  ورود به حساب کاربری
                </Link>
                <Link
                  className="rounded-lg bg-gradient-to-r from-[#9554f9] to-[#e289f6] p-4 font-bold text-white hover:from-[#e289f6] hover:to-[#9554f9]"
                  href={'/sign-up?next=blog/' + slug}
                >
                  ثبت نام حساب کاربری جدید
                </Link>
              </div>
            </div>
          )}

          {(() => {
            if (commentsArray) {
              return commentsArray.map(comment => {
                return (
                  <SingleComment
                    key={comment.id}
                    time={comment.created}
                    comment_content={comment.comment_content}
                    user={comment.expand!.user_id}
                  />
                );
              });
            } else if (!commentsArray && isLoading) {
              return (
                <div>
                  <Image
                    src={loading}
                    width={50}
                    alt="wait for comments to load"
                  />
                </div>
              );
            } else {
              return (
                <div className="my-20">
                  <p className="text-lg">
                    برای این پست هیچ نظری ثبت نشده است ...
                  </p>
                </div>
              );
            }
          })()}

          <div>
            {end ? (
              <p className="py-5">نظر دیگری وجود ندارد.</p>
            ) : (
              <button
                onClick={() => {
                  setPage(prev => prev + 1);
                }}
                className="my-5 rounded-xl bg-[#4c585b] p-5 font-bold text-white"
              >
                بارگذاری کامنت های بیشتر
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
