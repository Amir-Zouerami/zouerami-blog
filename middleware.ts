export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { MemoryStore } from '@/utility/MemoryStore';
// import Pocketbase from 'pocketbase';
// import { cookies } from 'next/headers';

const store = new MemoryStore(5000);

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  /**
   * RATE LIMITS THE API REQS - USES IP ADDRESS
   */
  if (pathName.startsWith('/api/')) {
    if (!request.ip) {
      return NextResponse.json(
        { ok: false, error: 'ACCESS_DENIED: NO IP ADDRESS' },
        { status: 403 }
      );
    }

    const maxReq = 5;
    const key = request.ip;
    const hits = store.increment(key);

    if (hits > maxReq) {
      return NextResponse.json(
        { ok: false, error: 'TOO_MANY_REQUESTS' },
        { status: 429, headers: [['Retry-After', '10']] }
      );
    } else {
      return NextResponse.next();
    }
  }
  // JUST AN EXAMPLE FOR LATER USE
  // return NextResponse.json(
  //   { ok: false, error: 'TOO_MANY_REQUESTS' },
  //   { status: 429, headers: [['random-header', 'value']] }
  // );
}
