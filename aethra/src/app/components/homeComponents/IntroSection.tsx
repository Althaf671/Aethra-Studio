'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

/* ====== TEAM DATA ====== */
const profileTeam = [
  {
    id: '1',
    name: 'Sirhan',
    position: 'Content Creator',
    avatar: '/images/homeAssets/introduction/avatar4.png',
    description: 'Lorem ipsum dolor sit amet...',
    link: '/images/homeAssets/introduction/sirhanIntro.webp',
    videoId: 'CN_MZpHkkgc',
  },
  {
    id: '2',
    name: 'Althaf',
    position: 'Fullstack Developer',
    avatar: '/images/homeAssets/introduction/avatar1.png',
    description: 'Lorem ipsum dolor sit amet...',
    link: '/images/homeAssets/introduction/althafIntro.webp',
    videoId: 'CN_MZpHkkgc',
  },
  {
    id: '3',
    name: 'Asti',
    position: 'Graphic Designer',
    avatar: '/images/homeAssets/introduction/avatar2.png',
    description: 'Lorem ipsum dolor sit amet...',
    link: '/images/homeAssets/introduction/astiIntro.webp',
    videoId: 'CN_MZpHkkgc',
  },
  {
    id: '4',
    name: 'Kaysi',
    position: 'Photographer',
    avatar: '/images/homeAssets/introduction/avatar3.png',
    description: 'Lorem ipsum dolor sit amet...',
    link: '/images/homeAssets/introduction/kaisyiIntro.webp',
    videoId: 'CN_MZpHkkgc',
  },
];

/* ====== COMPONENT ====== */
export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');

  return (
    <div className="container p-4 pt-10 px-5">
      {/* Title */}
      <motion.div
        ref={ref}
        className="mb-7 flex items-center"
        initial={{ x: -120, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="rounded-2xl bg-white/5 px-5 py-1.5 text-[22px] tracking-wide text-white">
          Meet our <span className="special-text rounded-xl">team</span>
        </h1>
      </motion.div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView="auto"
        spaceBetween={20}
        loop
        speed={1500}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, el: '.custom-pagination' }}
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
      >
        {profileTeam.map((m) => (
          <SwiperSlide key={m.id} className="w-full">
            <div className="flex h-[200px] w-full rounded-2xl border-2 border-white">
              {/* Gambar + tombol */}
              <div className="relative h-full w-[67%]">
                <Image
                  src={m.link}
                  alt="intro"
                  layout="fill" // Menggunakan layout="fill" untuk membuat gambar responsif
                  className="rounded-tl-2xl rounded-bl-2xl object-cover"
                />
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setCurrentVideo(m.videoId);
                  }}
                  className="absolute bottom-2 left-2 rounded-full bg-white px-2 py-1 text-[12px] text-black"
                >
                  Watch Video
                </button>
              </div>

              {/* Profil */}
              <div className="flex w-[33%] flex-col items-center justify-center p-1.5">
                <Image
                  src={m.avatar}
                  alt={m.name}
                  width={40}
                  height={40}
                  className="mb-2 w-9 rounded-full object-cover"
                />
                <div className="text-center text-white">
                  <h3 className="text-sm font-bold">{m.name}</h3>
                  <p className="text-[10px]">{m.position}</p>
                  <p className="text-[8px]">{m.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots */}
      <div className="custom-pagination mt-4 flex justify-center gap-2" />

      {/* Modal video */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative mx-2 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-2 top-2 text-2xl text-white"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}