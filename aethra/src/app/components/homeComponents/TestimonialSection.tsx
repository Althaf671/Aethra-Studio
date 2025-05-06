'use client';
import React, { useRef } from 'react'

// Library
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-fade';

import Image from 'next/image';

/* ====== TESTIMONIAL DATA ====== */
const testimonials = [
  {
    name: 'Kashy',
    review: 'The site looks great and works flawlessly. Delivered on time with everything I asked for. Super happy!',
    avatar: '/images/homeAssets/introduction/avatar2.png',
    project: 'Web Fullstack',
    date: '27/02/2025',
    id: '2'
  },
  {
    name: 'Chann',
    review: 'Smooth and clean edits. The video turned out great and really boosted my content. Definitely coming back.',
    avatar: '/images/homeAssets/introduction/avatar3.png',
    project: 'Video Editing',
    date: '01/03/2025',
    id: '3'
  },
  {
    name: 'Enn',
    review: 'Clean, creative, and exactly what I needed. Great communication and fast turnaround. Loved the result!',
    avatar: '/images/homeAssets/introduction/avatar4.png',
    project: 'Graphic Design',
    date: '05/03/2025',
    id: '4'
  },
];

/* ====== COMPONENT ====== */
export default function Testimonial() {

  // Parallax Title
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Swiper ref
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className='container px-5 pt-15'>

      {/* Title */}
      <motion.div
        ref={ref}
        className="mb-7 flex justify-center items-center"
        initial={{ x: 120, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="rounded-2xl bg-white/5 px-5 py-1.5 text-[18px] tracking-wide text-white">
          Our Client Are <span className="special-text italic rounded-xl">Satisfied!</span>
        </h1>
      </motion.div>

      <Swiper
        className='w-[100%]'
        speed={600}
        modules={[Navigation]}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1536: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >

        {/* Testimonial Card */}
        {testimonials.map((testimonials, index) => (
          <SwiperSlide key={index}>
            <div className='relative flex flex-col justify-between card-shadow p-5 bg-white min-h-60 gap-2 border-3 border-gray-950 rounded-3xl'>
              {/* Upper card */}
              <div className='flex flex-wrap justify-between items-center text-left mb-2'>
                <p className='text-[13px] text-black'>Reviewed on {testimonials.date}</p>
                <div className='flex flex-wrap'>
                  {[...Array(5)].map((_, i) => (
                    <Image key={i} src="/images/misc/starBlack.png" width={24} height={24} className='relative min-w-6' alt='rate-star' />
                  ))}
                </div>
              </div>

              {/* Middle card */}
              <p className='text-[18px] text-black italic'>"{testimonials.review}"</p>

              {/* Bottom card */}
              <div className='flex justify-baseline items-center gap-3'>
                <Image src={testimonials.avatar} width={1024} height={1024} className=' w-12 h-12 rounded-full border-1 p-1' alt='customer-avatar' />
                <div className='flex flex-col text-black'>
                  <p className='text-[16px]'>{testimonials.name}</p>
                  <p className='text-[10px] tracking-wide -mt-1'>Project: {testimonials.project}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      {/* Navigation button*/}
      <div className='flex justify-center mt-4 gap-5'>
        <Image src="/images/misc/arrowBack.png" width={1024} height={1024} onClick={() => swiperRef.current?.slidePrev()} className=' w-10 h-10 cursor-pointer active:opacity-75 bg-white rounded-full p-1 shadow-[0_1px_10px_rgba(255,255,255,0.2)]' alt='arrow-back' />
        <Image src="/images/misc/arrowForward.png" width={1024} height={1024} onClick={() => swiperRef.current?.slideNext()} className=' w-10 h-10 cursor-pointer active:opacity-75 bg-white rounded-full p-1 shadow-[0_1px_10px_rgba(255,255,255,0.2)]' alt='arrow-forward' />
      </div>

    </div>
  );
}