'use client';

import { useRef } from 'react';
import { motion, useInView, easeOut } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaLogo from '../miscComponents/SocialMedia';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="overflow-hidden w-full">
      {/* Hero Section */}
      <section className="w-full h-[23rem] overflow-hidden">
        <Image
          src="/images/homeAssets/hero-2.webp"
          width={1920}
          height={1080}
          alt="hero icon"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Description */}
      <section className="flex flex-col w-full h-fit px-4 max-w-screen-xl mx-auto">
        <div className="flex justify-between w-full mt-10 mb-3 items-center">
          <h1 className="text-[25px] font-semibold sm:text-xl md:text-2xl lg:text-3xl">Aethra Studio</h1>
          <div className="shrink-0">
            <SocialMediaLogo />
          </div>
        </div>

        <p className="text-justify sm:text-sm md:text-base lg:text-lg">
          Aethra Studio is a small but passionate creative‑service agency that
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

        {/* Milestones */}
        <div className="mt-4 flex flex-wrap justify-between gap-4">
            {/* Years */}
            <div className="flex-[2] flex flex-col border-2 px-3 py-3 gap-1 border-white text-xs rounded-2xl min-w-[10rem]">
              <h2 className="text-[10px] opacity-70 sm:text-xs">Years of Experience</h2>
              <div className="flex items-center gap-1 text-[14px] sm:text-sm md:text-base lg:text-lg">
                <Image
                  src="/images/misc/timeWhite.svg"
                  width={24}
                  height={24}
                  alt="time icon"
                />
                <p>0 year</p>
              </div>
            </div>

            {/* Projects */}
            <div className="flex-[1] flex flex-col border-2 px-3 py-3 gap-1 border-white text-xs rounded-2xl min-w-[10rem]">
              <h2 className="text-[10px] opacity-70 sm:text-xs">Projects Handled</h2>
              <div className="flex items-center gap-1 text-[14px] sm:text-sm md:text-base lg:text-lg">
                <Image
                  src="/images/misc/chart.svg"
                  width={24}
                  height={24}
                  alt="chart icon"
                />
                <p>0 project</p>
              </div>
            </div>
          </div>
      </section>

      {/* Why Us Section */}
      <section className="relative flex mt-[80px] w-full min-h-[300px] items-center overflow-hidden bg-black text-white">
        <motion.div
          ref={ref}
          className="relative z-50 flex flex-col items-center w-full px-4 py-16 max-w-screen-xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <h1 className="text-3xl font-semibold mb-2 sm:text-2xl md:text-3xl lg:text-4xl">
            Why Choose Us?
          </h1>
          <p className="text-center text-[14px] sm:text-sm md:text-base lg:text-lg">
            Our fields are promotional content, web development, graphic design,
            and photography. We deliver quality and passion in every project.
          </p>
        </motion.div>

        {/* Background Image */}
        <div className="absolute inset-0 h-[500px] z-10">
            <Image
              src="/images/homeAssets/topBg.webp"
              width={1920}
              height={500}
              alt="why-us background"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </section>
    </div>
  );
}