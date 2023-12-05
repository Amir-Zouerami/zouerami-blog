export const revalidate = 1800;

import { NextRequest, NextResponse } from 'next/server';
import { BlogPostData } from '@/utility/types';
import Pocketbase from 'pocketbase';

export const POST = async (request: NextRequest) => {
  try {
    const { title } = await request.json();
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    const posts = await pb.collection('posts').getList<BlogPostData>(1, 5, {
      filter: pb.filter('title ~ {:title} && published = true', {
        title,
      }),
      fields: 'id, slug, title, summary',
    });

    if (posts.items.length > 0) {
      return NextResponse.json({
        ok: true,
        data: posts,
      });
    } else {
      return NextResponse.json({
        ok: false,
        data: 'No such posts.',
      });
    }
  } catch (error) {
    console.log('ERROR RETREIVING POSTS - ROUTE');
    return NextResponse.json({
      ok: false,
      data: 'An Error Happened.',
    });
  }
};
