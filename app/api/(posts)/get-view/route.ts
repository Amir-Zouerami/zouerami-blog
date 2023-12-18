import { NextRequest, NextResponse } from 'next/server';
import Pocketbase from 'pocketbase';

export const POST = async (request: NextRequest) => {
  try {
    const { viewId } = await request.json();
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    const data = await pb
      .collection('post_views')
      .getOne(viewId, { cache: 'no-store' });

    return NextResponse.json({ ok: true, view: data.view });
  } catch (error) {
    console.log('ERROR INCREMENTING POST VIEW ROUTE');
    return NextResponse.json({ ok: false });
  }
};
