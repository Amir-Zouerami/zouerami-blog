'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { debounce } from '@/utility/utils';

import search from '@/icons/search.svg';

function SearchLink() {
  const [searchModal, setSearchModal] = useState(false);
  const [searchText, setsearchText] = useState('');

  const debouncedSearchHandler = debounce((userSearchText: string) => {
    setsearchText(userSearchText);
  }, 300);

  const callBack = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setSearchModal(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', callBack);

    return () => {
      document.removeEventListener('keydown', callBack);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          !searchModal ? 'hidden' : 'block'
        } fixed left-0 right-0 top-0 z-20 flex min-h-[100vh] min-w-[100vw]
        flex-col items-center justify-center bg-[#293036] bg-opacity-[0.7]`}
        id="searchModalBackdrop"
        onClick={e => {
          if ((e.target as HTMLDivElement).id === 'searchModalBackdrop') {
            setSearchModal(false);
          }
        }}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative flex">
            {/* TODO: DO WE WANT THE FORM TO BE SUBMITTABLE? (DEDICATED SEARCH PAGE?) */}
            {/* <form action="" className="z-10"> */}
            <input
              onChange={e => {
                debouncedSearchHandler(e.target.value);
              }}
              className="w-[300px] rounded-xl px-5 py-5 font-bold lg:w-[600px]"
              type="text"
              name="search"
              id="search"
              placeholder="مطلب مورد نظرتان را جست و جو کنید..."
            />
            {/* <input type="submit" hidden /> */}
            {/* </form> */}

            {/* <button className="absolute left-3 top-3 h-[30px] w-[30px] rounded-full bg-red-500 hover:cursor-pointer">
              x
            </button> */}
          </div>

          <div
            className={`${
              searchText ? 'block' : 'hidden'
            } -mt-2 max-h-[350px] w-[300px] overflow-y-auto overscroll-none
            rounded-bl-2xl rounded-br-2xl bg-[#2b2a33] py-5 lg:w-[600px]`}
          >
            <Link
              className="my-3 inline-block px-3 py-2 hover:bg-slate-700"
              href={'#'}
            >
              <p className="text-lg font-bold">{searchText}</p>
              <p className="text-justify leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </p>
            </Link>
            <Link
              className="my-3 inline-block px-3 py-2 hover:bg-slate-700"
              href={'#'}
            >
              <p className="text-lg font-bold">نتیجه ی دوم</p>
              <p className="text-justify leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </p>
            </Link>

            <Link
              className="my-3 inline-block px-3 py-2 hover:bg-slate-700"
              href={'#'}
            >
              <p className="text-lg font-bold">نتیجه ی دوم</p>
              <p className="text-justify leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </p>
            </Link>
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

export default SearchLink;
