import { NextRequest, NextResponse } from 'next/server';
import Pocketbase from 'pocketbase';
import { Comment } from '@/utility/types';
import { adminPB } from '@/utility/pocketbase';

export const POST = async (request: NextRequest) => {
  try {
    const { postId, page } = await request.json();
    const pb = await adminPB();

    const comments = await pb.collection('comments').getList<Comment>(page, 5, {
      filter: pb.filter('post_id.id = {:postId}', { postId }),
      expand: 'user_id',
    });

    if (comments) {
      return NextResponse.json({ ok: true, data: comments });
    } else {
      return NextResponse.json({
        ok: false,
        data: 'No comments for this post',
      });
    }
  } catch (error) {
    console.log('ERROR RETREIVING COMMENTS - ROUTE');
  }
};
