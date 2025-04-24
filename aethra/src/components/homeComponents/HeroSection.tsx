'use client';
import React, { useRef, useEffect, useState } from 'react';
import { easeOut, motion, useInView } from 'framer-motion'
import Image from 'next/image';
import Link from 'next/link';


export default function Hero() {



  // Parallax Title
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });



return (
    <>
      {/* 3D Model */}
      <section className="hero text-white h-[20rem] p-4 pt-10 md:p-6 lg:p-10">
        <p className="text-[7px] opacity-80">
          <a href="https://sketchfab.com/phil_xg">Model by Phil_XG</a>
        </p>
      </section>

      {/* Short Description */}
      <section className='flex flex-col p-4 pt-10 md:p-6 lg:p-10'>
          <div className='flex justify-between mt-10 items-center'>
              <h1 className="text-2xl">Aethra Studio</h1>
          </div>
          <p className='text-justify'>Aethra Studio is a small but passionate creative service agency that offers promotional content, website development, graphic design, and photography.
                 We help bring your ideas to life with a personal touch and professional quality and arts with friendly-budget <Link href="/service" className='text-blue-500 hover:underline active:underline'>more...</Link>
          </p>
          {/* Small Milestone */}
          <div className='flex justify-between mt-5'>
                <div className='flex flex-col border-2 w-[11.5rem] px-3 py-3 gap-[3px] border-white text-xs justify-center rounded-2xl'>
                   <h2 className='text-[10px] opacity-70'>Years of Experience</h2>
                   <div className='flex gap-1 items-center text-14px'>
                        <Image src="/images/misc/timeWhite.svg" width={24} height={24} alt="time-image" />
                        <p>0 year</p>
                   </div>
                </div>
                <div className='flex flex-col border-2 w-[9rem] px-3 py-3 gap-[3px] border-white text-xs justify-center rounded-2xl'>
                   <h2 className='text-[10px] opacity-70'>Project Handled</h2>
                   <div className='flex gap-1 items-center text-14px'>
                        <Image src="/images/misc/chart.svg" width={24} height={24} alt="chart-image" />
                        <p>0 project</p>
                   </div>
                </div>
            </div>
      </section>

       {/* Why us Section */}
       <div className='relative'>
            <motion.div 
                className='flex flex-col w-full justify-center items-center mt-30 text-white p-4 pt-10 md:p-6 lg:p-10'
                ref={ref}
                initial={{ y: 30, opacity: 0}}
                animate={ isInView ? { y: 0, opacity: 1} : {}}
                transition={{ duration: 1, ease: easeOut}}
                
                >
                    <h1 className='text-3xl z-100 font-semibold mb-2'>Why Choose Us?</h1>
                    <p className='text-[14px] text-center z-100'>Our field are promotional content, web development, graphic design, and photography. We deliver quality and passion in every project.
                    </p>
            </motion.div>
            <div className='relative'>
            <Image src="/images/homeAssets/topBg.webp" width={1024} height={1024} priority className='absolute w-full h-[280px] object-cover -bottom-20 z-10 p-0' alt='why-us-image' />
            <div className='absolute -bottom-25 w-full bg-black/60 h-5'></div>
        </div>
        </div>
    </>
  );
}