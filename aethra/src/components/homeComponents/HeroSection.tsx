/* src/components/homeComponents/HeroSection.tsx */
'use client';

import { useRef } from 'react';
import { motion, useInView, easeOut } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  /* --- in‑view trigger untuk animasi “Why Choose Us?” --- */
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <>
      {/* 3‑D model credit */}
      <section className="h-[20rem] bg-blue-500 text-white p-4 pt-10 md:p-6 lg:p-10">
        <p className="text-[7px] opacity-80">
          <a href="https://sketchfab.com/phil_xg">Model by Phil_XG</a>
        </p>
      </section>

      {/* ――― Short description ――― */}
      <section className="flex flex-col p-4 pt-10 md:p-6 lg:p-10">
        <div className="flex justify-between mt-10 items-center">
          <h1 className="text-2xl font-semibold">Aethra Studio</h1>
        </div>

        <p className="text-justify">
          Aethra Studio is a small but passionate creative‑service agency that
          offers promotional content, website development, graphic design, and
          photography. We help bring your ideas to life with a personal touch
          and professional quality on a friendly budget.&nbsp;
          <Link
            href="/service"
            className="text-blue-500 hover:underline active:underline"
          >
            more…
          </Link>
        </p>

        {/* ――― Milestones ――― */}
        <div className="mt-5 flex justify-between gap-4">
          {/* Years */}
          <div className="flex flex-col border-2 w-[11.5rem] px-3 py-3 gap-1 border-white text-xs rounded-2xl">
            <h2 className="text-[10px] opacity-70">Years of Experience</h2>
            <div className="flex items-center gap-1 text-[14px]">
              <Image
                src="/images/misc/timeWhite.svg"
                width={24}
                height={24}
                alt="time icon"
              />
              <p>0 year</p>
            </div>
          </div>

          {/* Projects */}
          <div className="flex flex-col border-2 w-[9rem] px-3 py-3 gap-1 border-white text-xs rounded-2xl">
            <h2 className="text-[10px] opacity-70">Project Handled</h2>
            <div className="flex items-center gap-1 text-[14px]">
              <Image
                src="/images/misc/chart.svg"
                width={24}
                height={24}
                alt="chart icon"
              />
              <p>0 project</p>
            </div>
          </div>
        </div>
      </section>

      {/* ――― Why Us section ――― */}
      <div className="relative">
        <motion.div
          ref={ref}
          className="flex flex-col items-center w-full mt-[120px] text-white p-4 pt-10 md:p-6 lg:p-10"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <h1 className="text-3xl font-semibold mb-2">Why Choose Us?</h1>
          <p className="text-center text-[14px]">
            Our field are promotional content, web development, graphic design,
            and photography. We deliver quality and passion in every project.
          </p>
        </motion.div>

        {/* Background strip */}
        <div className="relative">
          <Image
            src="/images/homeAssets/topBg.webp"
            alt="why‑us background"
            priority
            width={1024}
            height={1024}
            className="absolute bottom-[-20px] w-full h-[280px] object-cover z-10"
          />
          <div className="absolute bottom-[-25px] w-full h-5 bg-black/60" />
        </div>
      </div>
    </>
  );
}