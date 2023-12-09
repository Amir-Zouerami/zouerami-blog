import Image from 'next/image';

import danger from '@/icons/danger.svg';
import pen from '@/icons/pen.svg';
import { ReactNode } from 'react';

interface AttentionProps {
  children: ReactNode;
  type: 'ALERT' | 'NOTE';
}

function Attention({ children, type }: AttentionProps) {
  return (
    <div
      className={`mx-auto my-10 rounded-2xl bg-gradient-to-r ${
        type === 'ALERT'
          ? 'from-[#EE8C68] to-[#D93965]'
          : 'from-[#A880C0] to-[#4CB8B2]'
      } p-5 leading-10 lg:flex lg:max-w-[80%] xl:gap-3 2xl:leading-[3]`}
    >
      <div className="mb-5 flex items-center justify-center lg:m-0">
        <Image
          src={type === 'ALERT' ? danger : pen}
          width={72}
          alt={type === 'ALERT' ? 'warning' : 'important note'}
          className="lg:w-72"
        />

        <p className="text-4xl font-black text-white lg:hidden lg:text-5xl">
          {type === 'ALERT' ? 'هشـــدار!' : 'نکــــــته!'}
        </p>
      </div>

      <p className="font-bold text-white lg:pl-2">{children}</p>
    </div>
  );
}

export default Attention;
