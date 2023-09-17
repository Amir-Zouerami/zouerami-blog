'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import CommentTextarea from './CommentTextarea';

import randomPerson from '@/public/thispersondoesnotexist-min.jpeg';

function SingleComment() {
  const [replystate, setReplystate] = useState(false);

  return (
    <div className="my-5 max-w-full rounded-2xl bg-[#232c33]  p-3 lg:px-16">
      <div className="mb-4 flex items-center">
        <div className="ml-5">
          <Image
            src={randomPerson}
            className="rounded-full"
            width={50}
            alt="sample"
          />
        </div>
        <span className="mr-3 text-white">شهاب امینی</span>
        <span className="mr-10 text-white">سی دقیقه پیش</span>
      </div>

      <div className="px-3 text-justify leading-8">
        <p className="text-white">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه:
        </p>
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

      <div className="mt-5">
        <button
          onClick={() => {
            setReplystate(!replystate);
          }}
          className="rounded-2xl bg-[darkcyan] p-3 text-white"
        >
          پاسخ به این کامنت
        </button>

        {replystate ? <CommentTextarea /> : null}
      </div>
    </div>
  );
}

export default SingleComment;
