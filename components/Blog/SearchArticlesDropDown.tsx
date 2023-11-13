'use client';

import { useState } from 'react';
import AdvancedArticleSearch from './AdvancedArticleSearch';

function SearchArticlesDropDown() {
  const [articleSearchModal, setArticleSearchModal] = useState(false);

  const HandleArticleModal = () => {
    return setArticleSearchModal(!articleSearchModal);
  };

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

            <AdvancedArticleSearch modalState={articleSearchModal} />
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
