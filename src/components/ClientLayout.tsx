'use client';

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from './Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!isHomePage && <Navbar />}
      {children}
    </Suspense>
  );
}
