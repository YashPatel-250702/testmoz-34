// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import { Menu, X, UserCircle, LayoutDashboard, ListChecks, ClipboardCheck } from 'lucide-react';

// const navItems = [
//   { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
//   { name: 'Tests', path: '/tests', icon: <ListChecks className="w-5 h-5" /> },
//   { name: 'Results', path: '/results', icon: <ClipboardCheck className="w-5 h-5" /> },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const isActive = (path: string) => pathname.startsWith(path);

//   return (
//     <nav className="bg-white shadow-md border-b">
//       <div className="max-w-7xl mx-auto px-4 py-3 h-20 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
//          Quiztopher
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center space-x-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.path}
//               className={`flex items-center space-x-2 text-sm font-medium hover:text-blue-600 ${
//                 isActive(item.path) ? 'text-blue-600' : 'text-gray-700'
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           ))}

//           {/* Profile Icon */}
//           <Link href="/profile" className="ml-4 text-gray-600 hover:text-blue-600">
//             <UserCircle className="w-7 h-7" />
//           </Link>
//         </div>

//         {/* Mobile toggle */}
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="md:hidden text-gray-600 hover:text-blue-600"
//         >
//           {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-2">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.path}
//               onClick={() => setMobileOpen(false)}
//               className={`block py-2 flex items-center space-x-2 text-sm font-medium ${
//                 isActive(item.path) ? 'text-blue-600' : 'text-gray-700'
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </Link>
//           ))}
//           <Link
//             href="/profile"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600"
//           >
//             <UserCircle className="w-6 h-6" />
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }



'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  X,
  UserCircle,
  LayoutDashboard,
  ListChecks,
  ClipboardCheck,
  ArrowLeft,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Tests', path: '/tests', icon: <ListChecks className="w-5 h-5" /> },
  { name: 'Results', path: '/results', icon: <ClipboardCheck className="w-5 h-5" /> },
];

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-blue-600 md:hidden"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-blue-600 md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight ml-2">
            Quiztopher
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center space-x-2 text-sm font-medium hover:text-blue-600 ${
                isActive(item.path) ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Profile Icon */}
          <Link href="/profile" className="ml-4 text-gray-600 hover:text-blue-600">
            <UserCircle className="w-7 h-7" />
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-600 hover:text-blue-600"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 flex items-center space-x-2 text-sm font-medium ${
                isActive(item.path) ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          <Link
            href="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600"
          >
            <UserCircle className="w-6 h-6" />
          </Link>
        </div>
      )}
    </nav>
  );
}
