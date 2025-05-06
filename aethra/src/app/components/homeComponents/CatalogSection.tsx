'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

/* ====== COMPONENT ====== */
export default function CatalogSection() {
    // Parallax Title
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // This is States and refs
    const [isTapped, setIsTapped] = useState(false);
    const [isClient, setIsClient] = useState(false); // Track if it's client-side
    const router = useRouter();

    // To Ensures useRouter runs only on the client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleTap = () => {
        if (isTapped) {
            // Only navigate if on the client-side
            if (isClient) {
                router.push(`/service`);
            }
        } else {
            setIsTapped(true);
            setTimeout(() => {
                setIsTapped(false);
            }, 500);
        }
    };

    return (
        <div className='container p-4 pt-10 px-5'>
            {/* Section title */}
            <motion.div
                className='flex justify-baseline items-center mb-7'
                ref={ref}
                initial={{ x: -120, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}>
                <h1 className='text-[22px] tracking-wide text-white bg-white/5 rounded-2xl py-1.5 px-5'>
                    Our <span className='special-text rounded-xl'>Catalog</span>
                </h1>
            </motion.div>

            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 text-white'>
                {/* Catalog Item Content Creator */}
                <div
                    onClick={handleTap}
                    className={`catalog-card relative flex flex-col border-2 px-4 py-1 border-white rounded-2xl ${isTapped ? 'active' : ''}`}>
                    <Image src='/images/homeAssets/contentCreatorCatalog.png' width={400}
                    height={400} className='min-w-[5rem] p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 ' alt='content-creator' />
                    <div className='flex justify-between -mt-0.5'>
                        <div className='flex flex-col'>
                            <h1 className='text-[13.7px]'>Content Creation</h1>
                            <p className='text-[11.5px] mb-9 opacity-90 mt-[1px]'>Promotional videos that speak your brand.</p>
                        </div>
                        <p className='absolute bottom-2 right-3.5 text-[10px]'>
                            Start from <span className='price-color'>IDR 500K</span>
                        </p>
                    </div>
                </div>

                {/* Catalog Item Web Developer */}
                <div
                    onClick={handleTap}
                    className={`catalog-card relative flex flex-col border-2 px-4 py-1 border-white rounded-2xl ${isTapped ? 'active' : ''}`}>
                    <Image src='/images/homeAssets/webDevCatalog.png' width={400}
                    height={400} className='min-w-[5rem] p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 ' alt='web-developer' />
                    <div className='flex justify-between -mt-0.5'>
                        <div className='flex flex-col'>
                            <h1 className='text-[13.7px]'>Web Fullstack</h1>
                            <p className='text-[11.5px] mb-9 opacity-90 mt-[1px] tracking-tight'>
                                Complete websites frontend to backend, fully functional.
                            </p>
                        </div>
                        <p className='absolute bottom-2 right-3.5 text-[10px]'>
                            Start from <span className='price-color'>IDR 2000K</span>
                        </p>
                    </div>
                </div>

                {/* Catalog Item Graphic Designer */}
                <div
                    onClick={handleTap}
                    className={`catalog-card relative flex flex-col border-2 px-4 py-1 border-white rounded-2xl ${isTapped ? 'active' : ''}`}>
                    <Image src='/images/homeAssets/graphicDesignCatalog.png' width={400}
                    height={400} className='min-w-[5rem] p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 ' alt='graphic-designer' />
                    <div className='flex justify-between -mt-0.5'>
                        <div className='flex flex-col'>
                            <h1 className='text-[13.7px]'>Graphic Design</h1>
                            <p className='text-[11.5px] mb-9 opacity-90 mt-[1px]'>Bold visuals, sharp designs, made to stand out.</p>
                        </div>
                        <p className='absolute bottom-2 right-3.5 text-[10px]'>
                            Start from <span className='price-color'>IDR 250K</span>
                        </p>
                    </div>
                </div>

                {/* Catalog Item Photographer */}
                <div
                    onClick={handleTap}
                    className={`catalog-card relative flex flex-col border-2 px-4 py-1 border-white rounded-2xl ${isTapped ? 'active' : ''}`}>
                    <Image src='/images/homeAssets/photographyCatalog.png' width={400}
                    height={400} className='min-w-[5rem] p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 ' alt='photography' />
                    <div className='flex justify-between -mt-0.5'>
                        <div className='flex flex-col'>
                            <h1 className='text-[13.7px]'>Video Editing</h1>
                            <p className='text-[11.5px] mb-9 opacity-90 mt-[1px]'>Your brand, perfectly captured in every frame.</p>
                        </div>
                        <p className='absolute bottom-2 right-3.5 text-[10px]'>
                            Start from <span className='price-color'>IDR 250K</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}