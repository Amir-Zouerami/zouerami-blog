'use client';

import Link from 'next/link';
import { atom, useAtom } from 'jotai';

export const commentsModalAtom = atom(false);

function BlogCommentsButton() {
  const [commentsModal, setCommentsModal] = useAtom(commentsModalAtom);

  return (
    <div className="my-10 text-center">
      <Link
        href={'#'}
        scroll={false}
        className="w-10 rounded-xl bg-gradient-to-r from-[#5e4b55] to-[#da8b83] px-12 py-4 dark:from-[#5AA68C] dark:to-[#C0B35F]"
        onClick={() => {
          setCommentsModal(!commentsModal);
        }}
      >
        <span className="pr-2 font-bold text-white">مشاهده نظرات</span>
      </Link>
    </div>
  );
}

export default BlogCommentsButton;
