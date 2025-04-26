'use client';
import React, { useRef } from 'react'
import Image from 'next/image';
import { easeOut, motion, useInView } from 'framer-motion'
import SocialMediaLogo from '../miscComponents/SocialMedia';

export default function ProfileSection() {

    // Parallax Title
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

  return (
    <div className='container flex flex-col p-4 pb-28 pt-25 md:p-6 lg:p-10 select-none'>

        <motion.div 
            className='flex flex-col w-full justify-center items-center mb-7 '
            ref={ref}
            initial={{ y: 30, opacity: 0}}
            animate={ isInView ? { y: 0, opacity: 1} : {}}
            transition={{ duration: 0.5, ease: easeOut}}
            >
            <h1 className='gradient-text'>Aethra Studio</h1>
        </motion.div>
        
        <div className='flex justify-between text-justify items-center text-[15px] text-white gap-5'>

            {/* Left Profile */}
            <p className='w-[55%] h-[170px] indent-3 '> Aethra Studio began as a late-night passion project between friends creatives and developers who believed 
                great ideas deserve to shine, even on a small budget.
            </p>

            {/* Right Profile */}
            <div className='w-[45%] h-[170px] flex flex-col gap-1.5 items-center'>
                <Image src={'/images/misc/AethraLogo.jpeg'} width={1024}
                height={1024} className='w-[100%] h-[105px] object-cover p-0.5 rounded-2xl shadow-[0_1px_50px_rgba(255,255,255,0.1)]' alt='logo' />
                <p className='text-[10px] italic opacity-70 -mt-0.5 -mb-1'>Visit Our Social Media</p>
                <SocialMediaLogo />
            </div>
        </div>

         {/* Company Milestone */}
         <div className='relative flex items-center z-40 text-white mt-8 mb-8'>

            {/* Tooltip while hovering */}
            <span className="relative group text-[11px] cursor-pointer select-none">
            <div className='flex justify-center items-center'>
            <hr className='bg-white h-[4px] min-w-5' />
            <p className='text-2xl flex flex-col relative'>&#9679;<span className='absolute w-12 -bottom-2.5 -left-4 text-center opacity-70 text-[10px]'>7 March</span></p>
            </div>
                <div className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                    Berdiri pada Tanggal 7 Maret
                </div>
            </span>

            {/* Tooltip while hovering */}
            <span className="relative group text-[11px] cursor-pointer select-none ">
            <div className='flex justify-center items-center'>
            <hr className='bg-white h-[4px] w-12' />
            <p className='text-2xl flex flex-col relative'>&#9679;<span className='absolute w-12 -top-2.5 -left-4 text-center opacity-70 text-[10px]'>14 March</span></p>
            </div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                    Rapat pertama
                </div>
            </span>

            {/* Tooltip while hovering */}
            <span className="relative group text-[11px] cursor-pointer select-none">
            <div className='flex justify-center items-center'>
            <hr className='bg-white h-[4px] min-w-12' />
            <p className='text-2xl flex flex-col relative'>&#9679;<span className='absolute w-12 -bottom-2.5 -left-4 text-center opacity-70 text-[10px]'>26 March</span></p>
            </div>
                <div className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                    Penyusunan RAB
                </div>
            </span>

            {/* Tooltip while hovering */}
            <span className="relative group text-[11px] cursor-pointer select-none">
            <div className='flex justify-center items-center'>
            <hr className='bg-white h-[4px] min-w-12' />
            <p className='text-2xl flex flex-col relative'>&#9679;<span className='absolute w-12 -top-2.5 -left-4 text-center opacity-70 text-[10px]'>1 April</span></p>
            </div>
                <div className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                    Pembuatan Web 
                </div>
            </span>

            {/* Tooltip while hovering */}
            <span className="relative group text-[11px] cursor-pointer">
            <div className='flex justify-center items-center'>
            <hr className='bg-white h-[4px] min-w-12' />
            <p className='text-2xl flex flex-col relative'>&#9679;<span className='absolute w-12 -bottom-2.5 -left-4 text-center opacity-70 text-[10px]'>9 April</span></p>
            </div>
                <div className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-10">
                    Web mengudara
                </div>
            </span>

             {/* Tooltip while hovering */}
            <span className="relative group text-[11px] cursor-pointer">
            <div className='flex justify-center items-center'>
            <hr className='bg-white h-[4px] min-w-12' />
            <p className='text-2xl flex flex-col relative'>&#9679;<span className='absolute w-12 -bottom-2.5 -left-4 text-center opacity-70 text-[10px]'>Now</span></p>
            </div>
                <div className="absolute bottom-full -mb-[4px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-10">
                    Konsul <span className='text-blue-500 underline'> <a href='https://blog.whatsapp.com' target='-blank' rel="noopener noreferrer">Sekarang</a></span>
                </div>
            </span>

        </div>

    </div>
  )
}
