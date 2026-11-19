'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200/70
     bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300
      supports-[backdrop-filter]:bg-white/50">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo / Brand (static) */}
          <div className="flex select-none items-center gap-2 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
             bg-indigo-600 font-extrabold tracking-wider text-white shadow-md sm:h-10 sm:w-10
              sm:text-xl lg:h-12 lg:w-12 lg:rounded-xl lg:text-2xl">
              CP
            </span>
            <span className="whitespace-nowrap text-xl font-bold tracking-wide text-slate-900 sm:text-2xl lg:text-3xl">
              Campus<span className="text-indigo-600">Place</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden font-sans md:flex md:items-center md:gap-8 lg:gap-10">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-slate-700 transition-colors
               hover:text-indigo-600 lg:text-base"
            >
              HOME
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600 lg:text-base"
            >
              ABOUT
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600 lg:text-base"
            >
              CONTACT
            </button>

          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex md:items-center md:gap-3 lg:gap-4">
          <Link href='/login'>
           <button
              type="button" 
              className="rounded-lg border border-indigo-600 px-3 py-2 text-sm 
              font-semibold text-indigo-600 transition-colors hover:bg-indigo-700 hover:text-white
               focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:px-6 lg:py-1.5 lg:text-base"
            >
              Login
            </button>
          </Link>


          <Link href= '/signup'>
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold
               text-white shadow-sm transition-colors hover:bg-indigo-700 
               focus:outline-none focus:ring-2 focus:ring-indigo-500
                lg:px-6 lg:py-2 lg:text-base"
            >
              Sign Up
            </button>
          </Link>
          
          
          
          </div>

            {/* {HAMBURGER MENU} */}
           <button
  type="button"
  onClick={toggleMenu}
  aria-label="Toggle menu"
  aria-expanded={isOpen}
  className="flex h-10 w-10 items-center justify-center rounded-lg
   text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
>
  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>
        </div>
      </div>
       {isOpen && (
        <div className="flex flex-col gap-1 border-t border-slate-200 bg-white p-4 md:hidden">
          <button
            type="button"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
            className="rounded-lg px-3 py-3 text-left font-medium text-slate-700 hover:bg-slate-300"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}
            className="rounded-lg px-3 py-3 text-left font-medium text-slate-700 hover:bg-slate-300"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}
            className="rounded-lg px-3 py-3 text-left font-medium text-slate-700 hover:bg-slate-300"
          >
            Contact
          </button>
          <div className="mt-2 grid grid-cols-2 gap-3">
           <Link href="/login" onClick={closeMenu}
  className="rounded-lg border border-indigo-600 py-1 text-center font-semibold text-indigo-600">
  Login
</Link>

<Link href="/signup" onClick={closeMenu}
  className="rounded-lg bg-indigo-600 py-1 px-2 text-center font-semibold text-white">
  Sign Up
</Link>
          </div>
        </div>
      )}
    </header>
  );
}