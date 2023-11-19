'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import dayjs from '@/utility/dayjs';
// import CommentTextarea from './CommentTextarea';

import userImage from '@/icons/user-auth.svg';
import { ToFaNumbers, createFileURL } from '@/utility/utils';
import { User } from '@/utility/types';

function SingleComment({
  time,
  comment_content,
  user,
}: {
  time: string;
  comment_content: string;
  user: User;
}) {
  // const [replystate, setReplystate] = useState(false);

  return (
    <div className="my-5 max-w-full rounded-2xl bg-[#232c33]  p-3 lg:px-16">
      <div className="mb-4 flex items-center">
        <div className="ml-5">
          <Image
            src={
              user.avatar
                ? createFileURL(user.id, user.collectionId, user.avatar)
                : userImage
            }
            className={`rounded-full ${!user.avatar ? 'svg-white' : ''}`}
            width={50}
            height={50}
            alt={user.username + ' profile photo'}
          />
        </div>
        <span className="mr-3 text-white">{user.username}</span>
        <span className="mr-10 text-white">
          {ToFaNumbers(dayjs(time).locale('fa').fromNow())}
        </span>
      </div>

      <div className="px-3 text-justify leading-8">
        <p className="text-white">{comment_content}</p>
        <pre className="ltr mt-5 overflow-x-scroll text-white">
          <code>
            {`export async function getServerSideProps(context) {
    const id = context.params.id;
    const user = await prisma.user.findFirst({ where: { id: id } });
  
    return { props: { user } };
  }`}
          </code>
        </pre>
      </div>

      {/* TODO: MAYBE RESPONDING TO COMMENTS ...? */}
      {/* <div className="mt-5">
        <button
          onClick={() => {
            setReplystate(!replystate);
          }}
          className="rounded-2xl bg-[darkcyan] p-3 text-white"
        >
          پاسخ به این کامنت
        </button>

        {replystate ? <CommentTextarea /> : null}
      </div> */}
    </div>
  );
}

export default SingleComment;
