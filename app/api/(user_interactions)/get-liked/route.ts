export const dynamic = 'force-dynamic';

import { userInteraction } from '@/utility/types';
import { NextRequest, NextResponse } from 'next/server';
import Pocketbase from 'pocketbase';

export const POST = async (request: NextRequest) => {
  try {
    const { userId, page } = await request.json();
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    const interactions = await pb
      .collection('user_interaction')
      .getList<userInteraction>(page, 10, {
        filter: pb.filter('user_id = {:userId} && liked = true', {
          userId,
        }),
        expand: 'post_id, post_id.view',
      });

    if (interactions.items.length > 0) {
      return NextResponse.json({
        ok: true,
        totalPages: interactions.totalPages,
        data: interactions,
      });
    } else {
      return NextResponse.json({
        ok: false,
        data: 'No liked posts found.',
      });
    }
  } catch (error) {
    () => console.log('error in get get-liked', error);
  }
};
