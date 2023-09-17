import Image from 'next/image';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import markdown from '@/icons/markdown.svg';
import code from '@/icons/code.svg';

function CommentTextarea() {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [commentContent, setCommentContent] = useState('');

  return (
    <div className="w-full p-5">
      <div className="relative mx-auto max-h-[350px] rounded-xl bg-[#363943] lg:w-[70%]">
        <div className="flex items-center justify-between p-4">
          <div className="fix-hoverOpacity">
            <button
              onClick={() => {
                setActiveTab('write');
              }}
              className={`rounded-2xl ${
                activeTab === 'write' ? 'bg-[#e55287]' : null
              } px-3 py-2 text-white hover:opacity-[.7]`}
            >
              نوشتن دیدگاه
            </button>
            <button
              onClick={() => {
                setActiveTab('preview');
              }}
              className={`mr-3 rounded-2xl px-3 py-2 ${
                activeTab === 'preview' ? 'bg-[#e55287]' : null
              } text-white hover:opacity-[.7]`}
            >
              پیش نمایش دیدگاه
            </button>
          </div>
          <div>
            <button className="hover:opacity-[.7]">
              <Image src={code} width={20} alt="insert code block" />
            </button>
          </div>
        </div>

        <div className="w-full">
          {activeTab === 'write' ? (
            <textarea
              className="mb-5 h-[200px] w-full rounded-t-xl bg-[#363943]  p-3 outline-none"
              placeholder="نظر خود را در این بخش بنویسید (برخی از دستورات مارک داون محدود شده اند) ..."
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
              value={commentContent}
            />
          ) : (
            <div className="prose dark:prose-invert mb-5 h-[200px] overflow-y-auto px-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                disallowedElements={['h1', 'h2']}
                unwrapDisallowed={true}
                linkTarget={'_blank'}
              >
                {commentContent}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex h-[20px] items-center justify-between px-3 pb-7">
          <div className="text-xs text-slate-400">
            <Image
              src={markdown}
              width={18}
              alt="comment sections supports markdown"
              className="ml-1 inline"
            />
            از Markdown پشتیبانی می شود.
          </div>
          <div>
            <button
              onClick={() => {
                console.log(commentContent);
              }}
              className="rounded-3xl bg-[darkcyan] px-5 py-2 text-white hover:opacity-[.7]"
            >
              ثبت دیدگاه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentTextarea;
