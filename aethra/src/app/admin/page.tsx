'use client';

import { useEffect, useState } from "react";
import AnimatedPieCard from "../components/adminComponents/chartPie";
import StatsCard from "../components/adminComponents/adminCardStats";

export default function Admin() {
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        async function fetchTotalUsers() {
            const res = await fetch('/api/admin/total-users');
            const data = await res.json();
            setTotalUsers(data.totalUsers);
        }

        fetchTotalUsers();
    }, []);

    return (
        <div className="flex flex-col mt-20 mx-2 gap-6">
            <p className="text-[15px] text-blue-500">Hello ADMIN</p>
            <StatsCard title="Total Registered Accounts" value={totalUsers} />
            <AnimatedPieCard
                charts={[
                    { percentage: 20, color: '#34D399', title: 'Active Order' },
                    { percentage: 58, color: '#60A5FA', title: 'Completed Transaction' },
                ]}
            />
        </div>
    );
}