import React from 'react';

function AdvancedArticleSearch({ modalState }: { modalState: boolean }) {
  {
    /* TODO: 1. ADVANCED SEARCH NOT COMPLETED */
  }

  return (
    <div
      className={`${
        modalState ? 'block' : 'hidden'
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
  );
}

export default AdvancedArticleSearch;
