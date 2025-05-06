'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function FooterLayout() {
  return (
    <>
      {/* media partners and logo */}
      <div className="relative mt-20 bg-white/5 p-4 text-white">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <h1 className="mb-1 text-xl tracking-widest">Media Partner</h1>
            <div className="flex gap-2.5">
              <Image src="/images/misc/fake1.svg" alt="" width={32} height={32} />
              <Image src="/images/misc/fake2.svg" alt="" width={32} height={32} />
            </div>
          </div>

          <Image
            src="/images/misc/AethraLogo.jpeg"
            alt="Aethra logo"
            width={84}
            height={82}
            className="rounded-2xl p-1 h-[4.5rem] shadow-[0_1px_50px_rgba(255,255,255,0.1)]"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 flex justify-between border-b border-white px-5 pb-10">
        <div className="flex flex-col gap-1 text-left text-white">
          <h1 className="mb-0.5 text-[14px] tracking-tight">Service</h1>
          <Link href="/service" className="text-[11px]">
            Content Creation
          </Link>
          <Link href="/service" className="text-[11px]">
            Web Fullstack
          </Link>
          <Link href="/service" className="text-[11px]">
            Graphic Design
          </Link>
          <Link href="/service" className="text-[11px]">
            Video Editing
          </Link>
        </div>

        <div className="flex flex-col gap-1 text-left text-white">
          <h1 className="mb-0.5 text-[14px] tracking-tight">About us</h1>
          <Link href="/about" className="text-[11px]">
            Company
          </Link>
          <Link href="/about" className="text-[11px]">
            Career
          </Link>
          <Link href="/about" className="text-[11px]">
            FAQs
          </Link>
        </div>

        <div className="flex flex-col gap-1 text-left text-white">
          <h1 className="mb-0.5 text-[14px] tracking-tight">Social Media</h1>
          <a
            href="https://www.instagram.com/aethrastudio.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px]"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@aethra.studio26"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px]"
          >
            TikTok
          </a>
          <a
            href="https://youtube.com/@aethrastudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px]"
          >
            YouTube
          </a>
        </div>
      </div>

      <p className="pt-2.5 pb-3.5 text-center text-[10px] tracking-wide text-white opacity-70">
        © 2025 Aethra Studio — All rights reserved.
      </p>
    </>
  );
}