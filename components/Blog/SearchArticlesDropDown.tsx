'use client';

import { useState } from 'react';

function SearchArticlesDropDown() {
  const [articleSearchModal, setArticleSearchModal] = useState(false);

  return (
    <>
      <div className="relative mt-10 w-[100%] grow text-center lg:mt-0 lg:w-auto">
        <div className="flex items-center justify-center px-4 lg:px-0">
          <form method="GET" className="relative inline-block grow">
            <input
              type="search"
              name="search"
              placeholder="جست و جو در تیتر مقالات"
              className={`${
                articleSearchModal ? 'rounded-tr-2xl' : 'rounded-r-2xl'
              } h-14 w-[100%] rounded-tr-2xl bg-slate-600 px-3 text-white`}
            />
            <input type="hidden" />

            {/* TODO: 1. ADVANCED SEARCH NOT COMPLETED */}
            {/* TODO: 2. EXTRACT TO ANOTHER COMPONENT */}
            <div
              className={`${
                articleSearchModal ? 'block' : 'hidden'
              } absolute z-[1] mx-auto max-h-[400px] w-[100%] overflow-y-scroll
              rounded-b-lg bg-[#475569] p-5 text-center text-white lg:max-h-max`}
            >
              <div className="mb-10 flex flex-col gap-3 lg:block">
                <p className="mb-5">زمان انتشار مقاله:</p>
                <button
                  type="button"
                  className="rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  ۱۴۰۳/۳/۱۳
                </button>
                <span className="mx-10 font-black">تا</span>
                <button
                  type="button"
                  className="rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  ۱۴۰۳/۵/۱۳
                </button>
              </div>

              <div className="mb-10 ">
                <p className="mb-5">دسته بندی مقاله:</p>
                <button
                  type="button"
                  className="rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  انتخاب دسته بندی ها
                </button>
              </div>

              <div className="mb-10">
                <p className="mb-5">نوع مقاله:</p>

                <button
                  type="button"
                  className="mx-3 rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  تک قسمتی
                </button>

                <button
                  type="button"
                  className="mx-3 rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  چند قسمتی
                </button>
              </div>

              <div className="flex flex-col gap-3 lg:block">
                <p className="mb-5">سطح مقاله:</p>
                <button
                  type="button"
                  className="mx-3 rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  مبتدی
                </button>

                <button
                  type="button"
                  className="mx-3 rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  متوسط
                </button>

                <button
                  type="button"
                  className="mx-3 rounded-xl bg-[#252836] px-5 py-3 hover:opacity-[.7]"
                >
                  پیشرفته
                </button>
              </div>
            </div>
          </form>

          <button
            className={`h-14 w-[15%] rounded-bl-2xl rounded-tl-2xl bg-[#2a2c39] font-black text-teal-400 hover:opacity-[.7]`}
            onClick={() => {
              setArticleSearchModal(!articleSearchModal);
            }}
          >
            {articleSearchModal ? 'Ʌ' : 'V'}
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchArticlesDropDown;
