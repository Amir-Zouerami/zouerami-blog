'use client';

import Pocketbase from 'pocketbase';
import { useEffect, useState } from 'react';
import BlogPostCard from '../Blog/BlogPostCard';
import { UserInteractionsAPIData, userInteraction } from '@/utility/types';
import Image from 'next/image';

import loadingSVG from '@/icons/loading.svg';
import { useRouter } from 'next/navigation';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function UserLiked() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(false);
  const [postsArray, setPostsArray] = useState<[] | userInteraction[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      fetch('https://zouerami.dev/api/get-liked', {
        method: 'POST',
        body: JSON.stringify({ page: page, userId: pb.authStore.model.id }),
      })
        .then(async data => {
          const userInteractionData: UserInteractionsAPIData =
            await data.json();

          if (userInteractionData.ok) {
            setPostsArray(userInteractionData.data.items);
          }

          if (page >= userInteractionData.totalPages) setEnd(true);

          setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      pb.authStore.clear();
      router.replace('/sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div>
        {postsArray.length > 0 ? (
          (() => {
            const postCards = postsArray.map(interaction => {
              return (
                <BlogPostCard
                  key={interaction.id}
                  post={{
                    id: interaction.post_id,
                    collectionId: interaction.expand?.post_id?.collectionId!,
                    title: interaction.expand?.post_id?.title!,
                    slug: interaction.expand?.post_id?.slug!,
                    summary: interaction.expand?.post_id?.summary!,
                    cover: interaction.expand?.post_id?.cover!,
                    created: interaction.expand?.post_id?.created!,
                    viewcount: interaction.expand?.post_id?.expand.view.view!,
                  }}
                  priority={true}
                />
              );
            });

            if (!end) {
              postCards.push(
                <div key={1} className="flex items-center justify-center">
                  <button
                    className="reactiveButton my-5 rounded-xl bg-[#4c585b] p-5 font-bold text-white"
                    onClick={() => {
                      setPage(prev => prev + 1);
                    }}
                  >
                    بارگذاری پست های بیشتر
                  </button>
                </div>
              );
            }

            return postCards;
          })()
        ) : loading ? (
          <div className="flex items-center justify-center text-center">
            <Image width={50} src={loadingSVG} alt="لطفا منتظر بمانید..." />
            <p className="pr-3 text-lg">لطفا منتظر بمانید</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-400">
              شما هیچ پستی را لایک نکرده اید ...
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLiked;
