'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import markdown from '@/icons/markdown.svg';
import Link from 'next/link';
import Pocketbase from 'pocketbase';
import toast, { Toaster } from 'react-hot-toast';
import { toastOptions } from '@/utility/toast';
import loading from '@/icons/loading.svg';

function CommentTextarea({ postId }: { postId: string }) {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [commentContent, setCommentContent] = useState(``);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full p-5">
      <div className="relative mx-auto  rounded-xl bg-[#363943] lg:w-[80%]">
        <div className="flex items-center justify-between p-4">
          <div className="fix-hoverOpacity">
            <button
              onClick={() => {
                setActiveTab('write');
              }}
              className={`rounded-2xl ${
                activeTab === 'write' ? 'bg-[#e55287]' : null
              } reactiveButton px-3 py-2 text-white`}
            >
              نوشتن دیدگاه
            </button>
            <button
              onClick={() => {
                setActiveTab('preview');
              }}
              className={`mr-3 rounded-2xl px-3 py-2 ${
                activeTab === 'preview' ? 'bg-[#e55287]' : null
              } reactiveButton text-white`}
            >
              پیش نمایش دیدگاه
            </button>
          </div>
        </div>

        <div className="w-full">
          {activeTab === 'write' ? (
            <textarea
              id="markdown-preview"
              className="mb-5 h-[300px] max-h-[500px] w-full rounded-t-xl bg-[#363943] p-3 leading-8  outline-none lg:h-[200px]"
              placeholder="نظر خود را در این بخش بنویسید (برخی از دستورات مارک داون محدود شده اند) ..."
              onChange={e => {
                setCommentContent(e.target.value);
              }}
              value={commentContent}
            />
          ) : (
            <div
              id="rendered-markdown"
              className="prose mb-5 h-[200px] min-w-full overflow-y-auto px-5 dark:prose-invert prose-table:text-center"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}
                unwrapDisallowed={true}
                components={{a: ({ node, children, ...props }) => {
                  if (!props.href?.startsWith('http://localhost:3000')){
                    props.target = "_blank"
                    props.rel = "noopener noreferrer"
                  }

                  return <a {...props}>{children}</a>
                }}}
              >
                {commentContent}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="text-xs text-slate-400">
            <Link href={'/markdown'} className="hover:text-[#59cdcd]">
              <Image
                src={markdown}
                width={18}
                alt="comment sections supports markdown"
                className="ml-1 inline"
              />
              <span>از Markdown پشتیبانی می شود.</span>
            </Link>
          </div>
          <div>
            <button
              onClick={async () => {
                if (isLoading) return;
                setIsLoading(true);

                try {
                  if (pb.authStore.model && pb.authStore.isValid) {
                    const res = await pb.collection('comments').create({
                      post_id: postId,
                      user_id: pb.authStore.model.id,
                      comment_content: commentContent,
                    });

                    toast.success(
                      'کامنت شما با موفقیت ثبت شد. \n \n پس از تایید نمایش داده می شود.',
                      {
                        duration: 6000,
                        ...toastOptions,
                      }
                    );
                  }

                  setCommentContent('');
                } catch (error) {
                  toast.error('خطایی در ثبت دیدگاه شما اتفاق افتاده است...', {
                    duration: 6000,
                    ...toastOptions,
                  });
                  console.log('ERRORRRRRR SETTING COMMENT ', error);
                }

                setIsLoading(false);
              }}
              className={`${
                isLoading ? 'hover:cursor-wait' : ''
              } reactiveButton rounded-3xl bg-[darkcyan] px-5 py-2 text-white`}
            >
              {isLoading ? (
                <Image
                  className="svg-white"
                  src={loading}
                  width={25}
                  alt="در حال ثبت نظر شما هستیم، لطفا منتظر بمانید..."
                />
              ) : (
                'ثبت دیدگاه'
              )}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default CommentTextarea;
