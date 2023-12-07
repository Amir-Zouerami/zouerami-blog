'use client';

import { PostCategory } from '@/utility/types';
import Pocketbase from 'pocketbase';
import { useEffect, useState } from 'react';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function AdvancedArticleSearch({ modalState }: { modalState: boolean }) {
  const [categories, setCategories] = useState<PostCategory[]>([]);

  useEffect(() => {
    pb.collection('categories')
      .getFullList<PostCategory>()
      .then(categoryArray => {
        setCategories(() => categoryArray);
      })
      .catch(() => {});
  }, []);

  return (
    <div
      className={`${
        modalState ? 'block' : 'hidden'
      } absolute z-[1] mx-auto max-h-[400px] w-[100%] overflow-y-auto rounded-b-lg
      bg-gradient-to-r from-[#2c343e] to-[#4a5561] p-5 text-center text-white lg:max-h-max`}
    >
      <div className="mb-10">
        <p className="mb-5">دسته بندی مقاله:</p>
        <select
          className={`${
            categories.length <= 0 ? 'hover:cursor-not-allowed' : ''
          } rounded-xl bg-[#252836] px-5 py-3 font-bold text-white`}
          name="article_category"
          id="article_category"
          defaultValue={''}
          disabled={categories.length <= 0 ? true : false}
        >
          <option value={''}>دسته بندی مقاله را انتخاب کنید</option>
          {categories.length > 0 ? (
            categories.map(category => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))
          ) : (
            <option value={''}>دسته‌بندی‌ها غیرفعال هستند.</option>
          )}
        </select>
      </div>

      <div className="flex flex-col items-center gap-3 pb-5 lg:block">
        <p className="mb-5">سطح مقاله:</p>

        <select
          className="rounded-xl bg-[#252836] px-5 py-3 font-bold text-white"
          name="article_difficulty"
          id="article_difficulty"
          defaultValue={''}
        >
          <option value={''}>سطح مقاله را انتخاب کنید</option>
          <option value={'NOVICE'}>مبتدی</option>
          <option value={'INTERMEDIATE'}>متوسط</option>
          <option value={'ADVANCED'}>پیشرفته</option>
        </select>
      </div>
    </div>
  );
}

export default AdvancedArticleSearch;
