import { Metadata } from 'next';
import Image from 'next/image';
import heart from '@/icons/heart.svg';
import UserLiked from '@/components/userLiked/UserLiked';

export const metadata: Metadata = {
  title: 'مقالات مورد علاقه',
  description: 'در این صفحه می توانید مقالات مورد علاقه خود را مشاهده کنید.',
};

function Page() {
  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="my-10 mb-20 px-3 text-justify leading-9 lg:my-32">
        <h1 className="inline-block text-3xl font-black">مقالات مورد علاقه</h1>
        <p>
          در این صفحه مقالات مورد علاقه خودتان را مشاهده می کنید. در صورتی که از
          مقاله ای لذت بردید، می توانید آن را به لیست مقالات مورد علاقه ی خود
          اضافه کنید. همچنین می‌توانید با کلیک روی آیکون{' '}
          <Image
            src={heart}
            width={20}
            className="svg-current-red inline-block"
            alt="علامت اضافه کردن مقاله به علاقه مندی ها"
          />{' '}
          مقاله مورد نظر را از این لیست حذف کنید.
        </p>
      </div>

      <UserLiked />
    </div>
  );
}

export default Page;
