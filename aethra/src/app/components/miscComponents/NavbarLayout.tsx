'use client';
import { useState } from 'react';
import { useNavbar } from '@/context/NavbarContext';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

export default function NavbarLayout() {
  const { isVisible } = useNavbar();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession(); // Use session to know if the user is logged in or not

  if (!isVisible) return null;

  /* sidebar smooth animation */
  const variants = {
    hidden: { x: '-100%', opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.05 },
    },
    exit: { x: '-100%', opacity: 0 },
  };

  // Render items based on session status
  const items = [
    status === "authenticated"
      ? { label: 'Profile', href: '/profile' }
      : { label: 'Login', href: '/login' },
    { label: 'Saved', href: '/service' },
    { label: '🇬🇧 | 🇮🇩', href: '/' },
  ];

  return (
    <nav className="fixed top-0 z-[500] w-full select-none">
      {/* blur background */}
      <div className="absolute h-11 w-full backdrop-blur-md bg-black/60" />

      <div className="relative flex h-11 w-full items-center justify-between px-3">
        {/* menu icon */}
        <Image
          src="/images/misc/whiteMenu.png"
          alt="menu"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {/* links */}
        <ul className="poppins flex gap-5 text-[15px]">
          <Link href="/">HOME</Link>
          <Link href="/service">SERVICE</Link>
          <Link href="/about">ABOUT</Link>
        </ul>

        {/* cart */}
        <Link href="/cart">
          <Image
            src="/images/misc/whiteCart.png"
            alt="cart"
            width={24}
            height={24}
          />
        </Link>

        {/* sidebar */}
        <AnimatePresence>
          {open && (
            <motion.aside
              className="fixed left-2 top-0 mt-12 min-w-[100px] text-center rounded-2xl bg-white/5 backdrop-blur-md p-4 z-[1000]"
              variants={variants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.ul className="flex flex-col gap-3 text-[15px]">
                {items.map((it) => (
                  <motion.li key={it.href} variants={variants}>
                    <Link 
                      href={it.href} 
                      onClick={() => setOpen(false)} 
                      className='sidebar-li-border flex justify-center min-w-[90px] text-[11.5px] active:bg-gray-800'>
                      {it.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}