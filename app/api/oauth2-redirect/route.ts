import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse, NextRequest } from 'next/server';
import Pocketbase from 'pocketbase';

export async function GET(NextRequest: NextRequest) {
  

  // return redirect('http://localhost:3000/sign-up');
}

export async function POST(NextRequest: NextRequest) {
  console.log('THIS WAS A POST REQ');

  try {
    const req = await NextRequest.json();
    return NextResponse.json({ ok: 200, data: JSON.stringify(req) });
  } catch (error) {
    return NextResponse.json({ ok: false, data: 'was not json' });
  }
}
