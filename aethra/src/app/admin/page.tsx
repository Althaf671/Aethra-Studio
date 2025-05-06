'use client';

import { useEffect, useState } from "react";
import PieStatCard from "../components/adminComponents/adminCardStats";
import Image from "next/image";
import Link from "next/link";



export default function Admin() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [open, setOpen] = useState(false);

    // Fetch data for total users
    useEffect(() => {
        async function fetchTotalUsers() {
            const res = await fetch('/api/admin/total-users');
            const data = await res.json();
            setTotalUsers(data.totalUsers);
        }

        fetchTotalUsers();
    }, []);

    return (
        <div className="relative flex flex-col mt-6 mx-2 px-4 gap-6">

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-black text-white z-50 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Sidebar Content */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-bold tracking-wide text-xl">Admin Menu</p>
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="text-3xl cursor-pointer"
                        >
                            ×
                        </button>
                    </div>
                    <ul className="flex flex-col gap-2 text-[16px]">
                        <Link href='/admin' className="hover:underline cursor-pointer">Dashboard</Link>
                        <Link href='/admin/create' className="hover:underline cursor-pointer">Services</Link>
                        <li className="hover:underline cursor-pointer">Testimonials</li>
                        <li className="hover:underline cursor-pointer">Swiper</li>
                        <li className="hover:underline cursor-pointer">Company</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex flex-col gap-6 ${open ? "opacity-50" : "opacity-100"} transition-opacity duration-300 ease-in-out`}>
                {/* Header with Menu Button */}
                <div className="flex gap-2 items-center">
                    <Image
                        src="/images/misc/whiteMenu.png"
                        alt="menu"
                        width={32}
                        height={32}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)} 
                    />
                    <p className="text-2xl font-semibold text-white">Dashboard</p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">

                    {/* Card 1 */}
                    <div className="relative flex justify-between items-center border-2 border-white py-3 px-4 rounded-2xl">
                        {/* Left Card */}
                        <div className="flex text-left flex-col">
                            <h1 className="text-[26px]">{totalUsers}</h1>
                            <p className="text-[13px] opacity-90 ">Total Users</p>
                        </div>
                        {/* Right Card */}
                        <Image 
                            src="/images/adminAssets/total-users.svg"
                            alt="menu"
                            width={45}
                            height={45}
                            className="cursor-pointer p-1"
                        />
                    </div>

                    {/* Card 2 */}
                    <div className="flex justify-between items-center border-2 border-white py-3 px-4 rounded-2xl ">
                        {/* Left Card */}
                        <div className="flex flex-col">
                            <h1 className="text-[26px]">0</h1>
                            <p className="text-[13px] opacity-90 ">Active Order</p>
                        </div>
                        {/* Right Card */}
                        <Image 
                            src="/images/adminAssets/order.svg"
                            alt="menu"
                            width={45}
                            height={45}
                            className="cursor-pointer p-1"
                        />
                    </div>

                    {/* Card 3 */}
                    <div className="flex justify-between items-center border-2 border-white py-3 px-4 rounded-2xl ">
                        {/* Left Card */}
                        <div className="flex flex-col">
                            <h1 className="text-[26px]">0</h1>
                            <p className="text-[13px] opacity-90 ">Finished</p>
                        </div>
                        {/* Right Card */}
                        <Image 
                            src="/images/adminAssets/checklist.svg"
                            alt="menu"
                            width={45}
                            height={45}
                            className="cursor-pointer p-1"
                        />
                    </div>

                    {/* Card 2 */}
                    <div className="flex justify-between items-center border-2 border-white py-3 px-4 rounded-2xl ">
                        {/* Left Card */}
                        <div className="flex flex-col">
                            <h1 className="text-[26px]"><span className="text-xs mr-0.5">Rp</span>0</h1>
                            <p className="text-[13px] opacity-90 ">Revenue</p>
                        </div>
                        {/* Right Card */}
                        <Image 
                            src="/images/adminAssets/revenue.svg"
                            alt="menu"
                            width={45}
                            height={45}
                            className="cursor-pointer p-1"
                        />
                    </div>


                </div>

            </div>
        </div>
    );
}