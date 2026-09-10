'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export interface PlacementDataPoint {
  month: string;
  applicants: number;
  interviews: number;
  offers: number;
}

export interface PlacementVelocityChartProps {
  data?: PlacementDataPoint[];
  className?: string;
  height?: number;
}

const defaultData: PlacementDataPoint[] = [
  { month: 'MAY', applicants: 120, interviews: 45, offers: 18 },
  { month: 'JUN', applicants: 210, interviews: 80, offers: 32 },
  { month: 'JUL', applicants: 380, interviews: 140, offers: 64 },
  { month: 'AUG', applicants: 540, interviews: 220, offers: 98 },
  { month: 'SEP', applicants: 850, interviews: 310, offers: 145 },
  { month: 'OCT', applicants: 1200, interviews: 490, offers: 185 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-fg-primary text-bg-surface border border-border-strong p-2.5 shadow-[2px_2px_0px_0px_#18181B] font-mono text-xs">
        <span className="font-bold text-portal-primary block mb-1.5 uppercase">
          TIMEFRAME // {label} 2024
        </span>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex justify-between gap-6 py-0.5">
            <span className="text-neutral-400 capitalize">{entry.name}:</span>
            <span className="font-bold text-white tnum">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const PlacementVelocityChart: React.FC<PlacementVelocityChartProps> = ({
  data = defaultData,
  className = '',
  height = 280,
}) => {
  return (
    <div className={`w-full bg-bg-surface border border-border-strong p-space-md ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-xs border-b border-border-hairline mb-space-sm gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-status-success inline-block" />
          <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
            RECRUITMENT VELOCITY &amp; PLACEMENT YIELD (2024)
          </span>
        </div>
        <span className="font-label-mono text-[10px] text-fg-muted uppercase">
          MEDIAN TIME-TO-OFFER: 6.2 DAYS
        </span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#18181B" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#18181B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EAB308" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E4E4E7" strokeDasharray="2 2" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#71717A', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={{ stroke: '#18181B' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#71717A', fontSize: 10, fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 10, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
            />
            <Area
              type="monotone"
              dataKey="applicants"
              name="Applicants"
              stroke="#18181B"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorApplicants)"
            />
            <Area
              type="monotone"
              dataKey="interviews"
              name="Interviews"
              stroke="#EAB308"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInterviews)"
            />
            <Area
              type="monotone"
              dataKey="offers"
              name="Offers Minted"
              stroke="#16A34A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOffers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
