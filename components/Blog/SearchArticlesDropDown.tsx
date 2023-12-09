'use client';

import { useEffect, useState } from 'react';
import AdvancedArticleSearch from './AdvancedArticleSearch';
import { searchBlogs } from '@/utility/actions';
import toast from 'react-hot-toast';
import { BlogPostData } from '@/utility/types';
import Link from 'next/link';

function SearchArticlesDropDown() {
  const [articleSearchModal, setArticleSearchModal] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [posts, setPosts] = useState<BlogPostData[]>([]);

  useEffect(() => {
    const toggleBodyScroll = (enableScroll: boolean) => {
      const root = document.querySelector('html') as HTMLHtmlElement;
      if (root) {
        root.style.overflow = enableScroll ? 'auto' : 'hidden';
      }
    };

    if (posts.length > 0) {
      toggleBodyScroll(false);
    } else {
      toggleBodyScroll(true);
    }
  }, [posts.length]);

  return (
    <>
      <div className="mt-10 w-[100%] grow text-center lg:mt-0 lg:w-auto">
        <div className="flex items-center justify-center px-4 lg:px-0">
          <form
            action={async (rawFormData: FormData) => {
              const res = await searchBlogs(rawFormData);

              if (!res.ok && res.data === 'SEARCH_FIELD_EMPTY') {
                return toast.error('فیلد جست و جو نمی تواند خالی باشد.', {
                  id: 'SEARCH_FIELD_EMPTY',
                });
              }

              if (!res.ok && res.data === 'UNKNOWN_ERROR') {
                return toast.error('متاسفانه درخواست شما با خطا روبرو شد', {
                  id: 'UNKNOWN_ERROR',
                });
              }

              if (
                res.ok &&
                typeof res.data === 'object' &&
                res.data.length === 0
              ) {
                return toast.error('هیچ پستی با این مشخصات پیدا نشد', {
                  id: 'NO_SUCH_POST',
                });
              }

              if (
                res.ok &&
                typeof res.data === 'object' &&
                res.data.length > 0
              ) {
                return setPosts(res.data);
              }
            }}
            className="relative inline-block grow"
          >
            <input
              className={`${
                articleSearchModal ? 'rounded-tr-2xl' : 'rounded-r-2xl'
              } h-14 w-[100%] rounded-tr-2xl bg-[#f1f5f9] from-[#2c343e] to-[#4a5561] px-3 text-[#252836]
              shadow-2xl shadow-gray-400 outline-none focus:shadow-blue-500 dark:bg-gradient-to-r dark:text-white
              dark:shadow-none dark:placeholder:text-white`}
              placeholder="جست و جو در عنوان مقالات"
              name="searchString"
              value={searchString}
              autoComplete="off"
              onChange={e => {
                setSearchString(e.target.value);
              }}
            />

            <AdvancedArticleSearch modalState={articleSearchModal} />
          </form>

          <button
            className={`reactiveButton h-14 w-[15%] rounded-bl-2xl rounded-tl-2xl bg-[#f1f5f9]
            font-black text-blue-500  shadow-xl shadow-gray-400 dark:bg-[#2a2c39] dark:text-teal-400 dark:shadow-none`}
            onClick={() => {
              setArticleSearchModal(!articleSearchModal);
            }}
          >
            {articleSearchModal ? 'Ʌ' : 'V'}
          </button>
        </div>
      </div>

      {posts.length > 0 ? (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-20 flex flex-col
        items-center overflow-y-auto overscroll-none bg-[#293036] bg-opacity-[0.95] p-5 dark:bg-opacity-[0.8]"
        >
          <p className="mb-10 mt-5 text-lg font-bold text-white">
            حداکثر نتایج نشان داده شده{' '}
            <span className="text-red-500">۱۰ عدد</span> است.
          </p>

          <button
            className="mb-10 rounded-xl bg-red-400 px-3 py-2 font-bold text-white"
            onClick={() => setPosts([])}
          >
            X بستن صفحه
          </button>

          <div className="flex max-h-96 flex-col text-white lg:flex-row lg:flex-wrap">
            {posts.map(post => (
              <div
                key={post.id}
                className="m-5 flex flex-col gap-5 rounded-2xl border-2 bg-gray-900 p-5"
              >
                <p className="text-lg font-semibold">{post.title}</p>
                <div className="flex flex-col gap-5 lg:flex-row">
                  <p className="mr-5 inline-block">
                    سطح مقاله:{' '}
                    <span
                      className={
                        post.skill_level === 'مبتدی'
                          ? 'text-green-500'
                          : post.skill_level === 'متوسط'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }
                    >
                      {post.skill_level}
                    </span>
                  </p>
                  <p className="mr-5 inline-block">
                    دسته بندی:{' '}
                    {post.expand.post_categories.map(category => (
                      <span key={category.id} className="mx-2">
                        {category.category}
                      </span>
                    ))}
                  </p>
                </div>
                <Link
                  className="reactiveButton rounded-2xl bg-blue-400 px-3 py-2 text-center font-bold"
                  href={`http://localhost:3000/blog/${post.slug}`}
                >
                  مطالعه پست
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default SearchArticlesDropDown;
