'use client';

import { useState } from 'react';

function Notify() {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  return (
    <>
    {/* TODO: THIS IS A PLACEHOLDER FOR NOW -- NOT IMPLEMENTED YET!
     */}
      {isNotifyOpen ? (
        <div className="mb-5 flex items-center justify-between rounded-b-3xl bg-gradient-to-r from-[#5AA68C] to-[#C0B35F] px-5 text-white">
          <p className="py-3 text-justify">
            اطلاعیه! کلیه مقالات پولی سایت از امروز با 25 درصد تخفیف ارائه می
            شوند. در هنگام خرید از کد تخفیف Takhfif استفاده کنید.
          </p>
          <span
            className="mr-3 cursor-pointer p-2 text-xl font-black text-white"
            onClick={() => {
              setIsNotifyOpen(false);
            }}
          >
            X
          </span>
        </div>
      ) : null}
    </>
  );
}

export default Notify;
