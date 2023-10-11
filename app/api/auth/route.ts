import { NextResponse, NextRequest } from 'next/server';
import { formDataObj } from '@/utility/types';
import { auth, Auth } from '@/utility/lucia';

export async function POST(NextRequest: NextRequest) {
  const req = await NextRequest.formData();

  const formData: formDataObj = {};

  for (const [key, value] of req) {
    formData[key] = value;
  }

  return NextResponse.json(formData);
}
