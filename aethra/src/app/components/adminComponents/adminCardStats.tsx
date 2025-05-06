'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type Props = {
  title: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
};

export default function PieStatCard({ title, value, color, icon }: Props) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="bg-white rounded-2xl shadow px-4 py-2 flex flex-row md:flex-row items-center justify-between gap-4 w-full max-w-3xl mx-auto">
      <div className="flex-1 text-sm text-gray-500 mb-1">
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 mt-2">
          {/* Menampilkan angka tanpa persentase */}
          <CountUp end={value} duration={1.5} />
        </div>
      </div>

      <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ name: title, value: animatedValue }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="80%"
              isAnimationActive={true}
              animationDuration={1000}
              startAngle={90}
              endAngle={450}
            >
              <Cell fill={color} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}