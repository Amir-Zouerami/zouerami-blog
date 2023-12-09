'use client';

export const revalidate = 1800;

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { debounce } from '@/utility/utils';

import search from '@/icons/search.svg';
import { BlogPostAPIData, BlogPostData } from '@/utility/types';

function SearchLinkButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchModal, setSearchModal] = useState(false);
  const [allPosts, setAllPosts] = useState<
    undefined | BlogPostData[] | false
  >();

  const debouncedSearchHandler = debounce(async (userSearchText: string) => {
    if (userSearchText === '') return setAllPosts(false);

    try {
      const apiResponse = await fetch('http://localhost:3000/api/get-posts', {
        method: 'POST',
        body: JSON.stringify({ title: userSearchText }),
      });

      const res: BlogPostAPIData = await apiResponse.json();

      if (res.ok && res.data.items.length > 0) {
        setAllPosts(res.data.items);
      } else {
        setAllPosts(false);
      }
    } catch (error) {
      setAllPosts(false);
    }
  }, 500);

  const callBack = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setSearchModal(false);
  };

  useEffect(() => {
    if (searchModal && inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener('keydown', callBack);
    return () => {
      document.removeEventListener('keydown', callBack);
    };
  }, [searchModal]);

  return (
    <>
      <div
        className={`${
          !searchModal ? 'hidden' : 'block'
        } fixed left-0 right-0 top-0 z-50 flex min-h-[100vh] min-w-[100vw]
        flex-col items-center justify-center bg-[#293036] bg-opacity-[0.7]`}
        id="searchModalBackdrop"
        onClick={e => {
          if ((e.target as HTMLDivElement).id === 'searchModalBackdrop') {
            setSearchModal(false);
          }
        }}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex">
            <input
              onChange={e => {
                debouncedSearchHandler(e.target.value);
              }}
              ref={inputRef}
              className="w-[300px] rounded-xl px-5 py-5 font-bold lg:w-[600px]"
              type="text"
              name="search"
              id="search"
              placeholder="مطلب مورد نظرتان را جست و جو کنید..."
            />
          </div>

          <div
            className={`${
              allPosts === undefined ? 'hidden' : 'block'
            } -mt-2 max-h-[350px] w-[300px] overflow-y-auto overscroll-none
            rounded-bl-2xl rounded-br-2xl bg-white py-5 dark:bg-[#2b2a33] lg:w-[600px]`}
          >
            {typeof allPosts === 'object' && allPosts.length > 0 ? (
              allPosts.map(post => (
                <Link
                  key={post.id}
                  className="my-3 inline-block px-3 py-2 hover:bg-gray-300 dark:hover:bg-slate-700"
                  href={`/blog/${post.slug}`}
                  onClick={() => setSearchModal(false)}
                >
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-justify leading-7">{post.summary}</p>
                </Link>
              ))
            ) : allPosts === false ? (
              <div className="my-3 inline-block px-3 py-2 text-center">
                <p>هیچ مطلبی پیدا نشد ...</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <Link
        href={'#'}
        className="transition-transform hover:scale-150 hover:animate-pulse"
        onClick={() => {
          setSearchModal(!searchModal);
        }}
      >
        <Image
          src={search}
          alt="search button"
          width={25}
          className="dark:invert"
        />
      </Link>
    </>
  );
}

export default SearchLinkButton;
