'use client';

import { ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';

export function JotaiProviders({ children }: { children: ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
