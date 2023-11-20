'use client';

import Link from 'next/link';
import { atom, useAtom } from 'jotai';
import comment from '@/icons/comment.svg';
import Image from 'next/image';
import { useEffect } from 'react';

export const commentsModalAtom = atom(false);

function BlogCommentsButton() {
  const [commentsModal, setCommentsModal] = useAtom(commentsModalAtom);

  useEffect(() => {
    window.addEventListener('keydown', key => {
      if (key.code === 'Escape') {
        setCommentsModal(false);
      }
    });

    return () => {
      window.removeEventListener('keydown', key => {
        if (key.code === 'Escape') {
          setCommentsModal(false);
        }
      });
    };
  }, [setCommentsModal]);

  return (
    <div className="mt-16 text-center">
      <Link
        href={'#'}
        scroll={false}
        className="w-10 rounded-xl bg-gradient-to-r from-[#5e4b55] to-[#da8b83] px-12 py-4 hover:opacity-[.7] dark:from-[#5AA68C] dark:to-[#C0B35F]"
        onClick={e => {
          e.preventDefault();
          setCommentsModal(!commentsModal);
        }}
      >
        <Image
          className="inline"
          src={comment}
          width={20}
          alt="Open Comments Modal"
        />
        <span className="pr-2 font-bold text-white">مشاهده نظرات</span>
      </Link>
    </div>
  );
}

export default BlogCommentsButton;
