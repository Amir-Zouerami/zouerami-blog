'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { commentsModalAtom } from './BlogCommentsButton';

import SingleComment from './SingleComment';
import CommentTextarea from './CommentTextarea';

function Comments() {
  const commentsModal = useAtomValue(commentsModalAtom);
  const setCommentsModal = useSetAtom(commentsModalAtom);

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

          <CommentTextarea />

          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />

          <div>
            <button className="my-5 rounded-xl bg-[#4c585b] p-5 font-bold">
              بارگذاری کامنت های بیشتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
