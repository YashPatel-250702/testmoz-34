'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

const Homenavbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full border-b bg-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-primary">Quiztopher</h1>
      <nav className="flex gap-4">
        <Link href="/" passHref>
          <Button variant={isActive('/') ? 'default' : 'outline'}>
            Home
          </Button>
        </Link>
        <Link href="/mentor/auth" passHref>
          <Button variant={isActive('/mentor/auth') ? 'default' : 'outline'}>
            Mentor Login
          </Button>
        </Link>
        {/* <Link href="/student/login" passHref>
          <Button variant={isActive('/student/login') ? 'default' : 'outline'}>
            Student Login
          </Button>
        </Link> */}
      </nav>
    </header>
  );
};

export default Homenavbar;
