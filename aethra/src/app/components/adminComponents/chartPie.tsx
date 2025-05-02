'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type ChartData = {
  percentage: number;
  color: string;
  title: string;
};

type Props = {
  charts: ChartData[];
};

export default function AnimatedPieCard({ charts }: Props) {
  const [animatedData, setAnimatedData] = useState<ChartData[]>(
    charts.map((chart) => ({
      percentage: 0,
      color: chart.color,
      title: chart.title,
    }))
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedData(charts);
    }, 100);
    return () => clearTimeout(timeout);
  }, [charts]);

  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-ful mx-5">
      {charts.map((chart, index) => (
        <div key={index} className="relative w-full aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ name: chart.title, value: animatedData[index].percentage }]}
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
                <Cell fill={chart.color} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
    </>
  );
}