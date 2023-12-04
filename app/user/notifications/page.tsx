import UserNotification from '@/components/userNotifications/UserNotifications';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'اعلانات و هشدار ها',
  description:
    'در این صفحه می توانید تمام اعلانات از سوی مدیریت سایت را مشاهده کنید.',
};

function page() {
  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="my-10 mb-20 px-3 text-justify leading-9 lg:mt-32">
        <h1 className="inline-block text-3xl font-black">اعلانات و هشدار ها</h1>
        <p>
          در این صفحه تمام اعلانات صادر شده از سمت مدیریت سایت را مشاهده می
          کنید.
        </p>
      </div>

      <UserNotification />
    </div>
  );
}

export default page;
