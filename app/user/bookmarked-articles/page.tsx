import UserMarkdown from '@/components/userBookmarked/UserBookmarked';
import { Metadata } from 'next';
import Image from 'next/image';
import bookmark from '@/icons/bookmark.svg';

export const metadata: Metadata = {
  title: 'مقالات نشان شده',
  description:
    'در این صفحه می توانید مقالات نشان شده برای مطالعه را مشاهده کنید.',
};

function page() {
  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="my-10 mb-20 px-3 text-justify leading-9 lg:my-32">
        <h1 className="inline-block text-3xl font-black">مقالات نشان شده</h1>
        <p>
          در این صفحه مقالات نشان شده توسط خودتان را مشاهده می کنید. در صورتی که
          وقت مطالعه برای برخی مقالات را ندارید می توانید آن ها را نشان کرده و
          بعدا از همین صفحه مطالعه نمایید. همچنین با کلیک روی آیکون{' '}
          <Image
            src={bookmark}
            width={20}
            className="svg-current-yellow inline-block"
            alt="علامت نشان کردن مقاله"
          />{' '}
          می توانید مقاله مورد نظر را از این لیست حذف کنید.
        </p>
      </div>

      <UserMarkdown />
    </div>
  );
}

export default page;
