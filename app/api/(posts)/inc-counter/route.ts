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
      .update(viewId, { 'view+': 1 });

    return NextResponse.json({ ok: true, freshView: data.view });
  } catch (error) {
    console.log('ERROR INCREMENTING POST VIEW ROUTE', error);
    return NextResponse.json({ ok: false, error });
  }
};
