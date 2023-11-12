'use client';

import { useState } from 'react';

function SearchArticlesDropDown() {
  const [articleSearchModal, setArticleSearchModal] = useState(false);

  return (
    <>
      <div className="w-full text-center lg:text-left">
        <form method="GET" className="inline">
          <input
            type="search"
            name="search"
            placeholder="جست و جو در تیتر مقالات"
            className={`${
              articleSearchModal ? 'rounded-tr-2xl' : 'rounded-r-2xl'
            } h-14 w-[75%] rounded-tr-2xl bg-slate-600 px-3 text-white`}
          />
          <input type="hidden" />
        </form>

        <button
          className={`${
            articleSearchModal ? 'rounded-tl-2xl' : 'rounded-l-2xl'
          } h-14 w-[15%] bg-[#2a2c39] font-black text-teal-400`}
          onClick={() => {
            setArticleSearchModal(!articleSearchModal);
          }}
        >
          {articleSearchModal ? 'Ʌ' : 'V'}
        </button>

        <div
          className={`${
            articleSearchModal ? 'block' : 'hidden'
          } mx-auto w-[90%] rounded-b-lg bg-[#475569] p-5 text-center text-white lg:float-left`}
        >
          <div className="mb-10">
            <p className="mb-5">زمان انتشار مقاله:</p>
            <button className="rounded-xl bg-[#252836] px-5 py-3">
              ۱۴۰۳/۳/۱۳
            </button>
            <span className="mx-10 font-black">تا</span>
            <button className="rounded-xl bg-[#252836] px-5 py-3">
              ۱۴۰۳/۵/۱۳
            </button>
          </div>

          <div className="mb-10">
            <p className="mb-5">دسته بندی مقاله:</p>
            <button className="rounded-xl bg-[#252836] px-5 py-3">
              انتخاب دسته بندی ها
            </button>
          </div>

          <div className="mb-10">
            <p className="mb-5">نوع مقاله:</p>

            <button className="mx-3 rounded-xl bg-[#252836] px-5 py-3">
              تک قسمتی
            </button>

            <button className="mx-3 rounded-xl bg-[#252836] px-5 py-3">
              چند قسمتی
            </button>
          </div>

          <div className="">
            <p className="mb-5">سطح مقاله:</p>
            <button className="mx-3 rounded-xl bg-[#252836] px-5 py-3">
              مبتدی
            </button>

            <button className="mx-3 rounded-xl bg-[#252836] px-5 py-3">
              متوسط
            </button>

            <button className="mx-3 rounded-xl bg-[#252836] px-5 py-3">
              پیشرفته
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchArticlesDropDown;
