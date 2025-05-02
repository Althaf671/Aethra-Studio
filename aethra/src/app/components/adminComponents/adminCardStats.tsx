'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

type Props = {
    title: string;
    icon?: React.ReactNode;
    value: number;
};

export default function adminCardStats({ title, icon, value }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900">
        <CountUp end={value} duration={1.5} />
      </div>
    </div>
    )
}