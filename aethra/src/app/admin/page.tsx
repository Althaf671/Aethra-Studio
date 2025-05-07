'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminSidebar from "../components/adminComponents/sideBar";

export default function Admin() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchTotalUsers() {
            const res = await fetch('/api/admin/total-users');
            const data = await res.json();
            setTotalUsers(data.totalUsers);
        }

        fetchTotalUsers();
    }, []);

    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar */}
            <AdminSidebar open={open} onClose={() => setOpen(false)} />

            {/* Main Content */}
            <div className={`flex-1 p-6 transition-opacity duration-300 ${open ? "opacity-50" : "opacity-100"}`}>
                {/* Header */}
                <div className="flex items-center gap-1 mb-6 border-b-2 pb-3">
                    <Image
                        src="/images/misc/whiteMenu.png"
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                    <h1 className="text-xl">Dashboard</h1>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {/* Total Users */}
                    <div className="flex justify-between items-center border-2 border-white p-4 rounded-2xl">
                        <div>
                            <h1 className="text-[24px]">{totalUsers}</h1>
                            <p className="text-[13px] opacity-90">Total Users</p>
                        </div>
                        <Image src="/images/adminAssets/total-users.svg" alt="users" width={35} height={35} />
                    </div>

                    {/* Active Order */}
                    <div className="flex justify-between items-center border-2 border-white p-4 rounded-2xl">
                        <div>
                            <h1 className="text-[24px]">0</h1>
                            <p className="text-[13px] opacity-90">Active Order</p>
                        </div>
                        <Image src="/images/adminAssets/order.svg" alt="order" width={35} height={35} />
                    </div>

                    {/* Finished */}
                    <div className="flex justify-between items-center border-2 border-white p-4 rounded-2xl">
                        <div>
                            <h1 className="text-[24px]">0</h1>
                            <p className="text-[13px] opacity-90">Finished</p>
                        </div>
                        <Image src="/images/adminAssets/checklist.svg" alt="finished" width={35} height={35} />
                    </div>

                    {/* Revenue */}
                    <div className="flex justify-between items-center border-2 border-white p-4 rounded-2xl">
                        <div>
                            <h1 className="text-[24px]"><span className="text-xs mr-0.5">Rp</span>0</h1>
                            <p className="text-[13px] opacity-90">Revenue</p>
                        </div>
                        <Image src="/images/adminAssets/revenue.svg" alt="revenue" width={35} height={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}