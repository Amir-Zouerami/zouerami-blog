export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { Comment } from '@/utility/types';
import Pocketbase from 'pocketbase';

export const POST = async (request: NextRequest) => {
  try {
    const { postId, page } = await request.json();
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    const comments = await pb.collection('comments').getList<Comment>(page, 5, {
      filter: pb.filter('post_id.id = {:postId} && confirmed = true', {
        postId,
      }),
      sort: '-created',
      expand: 'user_id',
      cache: 'no-store',
    });

    if (comments) {
      return NextResponse.json({
        ok: true,
        totalPages: comments.totalPages,
        data: comments,
      });
    } else {
      return NextResponse.json({
        ok: false,
        data: 'No comments for this post.',
      });
    }
  } catch (error) {
    console.log('ERROR RETREIVING COMMENTS - ROUTE');
    return NextResponse.json({
      ok: false,
      data: 'An Error Happened.',
    });
  }
};
