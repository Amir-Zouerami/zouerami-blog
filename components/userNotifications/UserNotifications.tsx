'use client';
import { NOTIFICATIONS } from '@/utility/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Pocketbase from 'pocketbase';
import { useEffect, useState } from 'react';

import loadingSVG from '@/icons/loading.svg';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function UserNotifications() {
  const [notifs, setNotifs] = useState<NOTIFICATIONS[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      pb.collection('notifications')
        .getFullList<NOTIFICATIONS>()
        .then(notifications => {
          setNotifs(notifications);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      pb.authStore.clear();
      router.replace('sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-10">
      <div className="w-full">
        <h2 className="w-full rounded-2xl bg-gray-600 p-5 text-center text-xl font-bold text-white">
          اعلان های سراسری
        </h2>
      </div>

      <div>
        {loading ? (
          <div className="flex items-center justify-center text-center">
            <Image width={50} src={loadingSVG} alt="لطفا منتظر بمانید..." />
            <p className="pr-3 text-lg">لطفا منتظر بمانید</p>
          </div>
        ) : (
          (() => {
            if (notifs.length <= 0) {
              return (
                <div>
                  <p>هیچ اعلانی وجود ندارد.</p>
                </div>
              );
            }

            let globalNotifs = notifs.map(notif => {
              if (notif.receiver === 'GLOBAL') {
                return (
                  <div key={notif.id} className="px-3 py-5">
                    <p className="py-2">
                      {new Date(notif.created).toLocaleDateString('fa')}
                    </p>
                    <p className="px-2 text-justify">{notif.message}</p>
                  </div>
                );
              }
            });

            if (globalNotifs.length > 0) {
              return (
                <div className="max-h-[500px] overflow-y-auto">
                  {globalNotifs}
                </div>
              );
            } else {
              return <p>هیچ اعلانی وجود ندارد.</p>;
            }
          })()
        )}
      </div>

      <div className="w-full">
        <h2 className="mt-10 w-full rounded-2xl bg-gray-600 p-5 text-center text-xl font-bold text-white">
          اعلان های شخصی
        </h2>
      </div>

      <div>
        {loading ? (
          <div className="flex items-center justify-center text-center">
            <Image width={50} src={loadingSVG} alt="لطفا منتظر بمانید..." />
            <p className="pr-3 text-lg">لطفا منتظر بمانید</p>
          </div>
        ) : (
          (() => {
            if (notifs.length <= 0) {
              return <p>هیچ اعلانی وجود ندارد.</p>;
            }

            let globalNotifs = notifs.map(notif => {
              if (notif.receiver === 'USER_SPECIFIC') {
                return (
                  <div key={notif.id} className="px-3 py-5">
                    <p className="py-2">
                      {new Date(notif.created).toLocaleDateString('fa')}
                    </p>
                    <p className="text-justify">{notif.message}</p>
                  </div>
                );
              }
            });

            if (globalNotifs.length > 0) {
              return (
                <div className="max-h-[500px] overflow-y-auto">
                  {globalNotifs}
                </div>
              );
            } else {
              return <p>هیچ اعلانی وجود ندارد.</p>;
            }
          })()
        )}
      </div>
    </div>
  );
}

export default UserNotifications;
