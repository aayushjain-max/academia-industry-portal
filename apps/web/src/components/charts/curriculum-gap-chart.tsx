'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface CurriculumGapItem {
  skill: string;
  supply: number;
  demand: number;
}

export interface CurriculumGapChartProps {
  data?: CurriculumGapItem[];
  className?: string;
  height?: number;
  accentColor?: string;
}

const defaultData: CurriculumGapItem[] = [
  { skill: 'Python / Async', supply: 88, demand: 96 },
  { skill: 'Docker & K8s', supply: 42, demand: 89 },
  { skill: 'Postgres & Redis', supply: 76, demand: 82 },
  { skill: 'ML & Embeddings', supply: 68, demand: 84 },
  { skill: 'Distributed gRPC', supply: 50, demand: 85 },
  { skill: 'Security / ZeroTrust', supply: 62, demand: 78 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const supply = payload.find((p: any) => p.dataKey === 'supply')?.value || 0;
    const demand = payload.find((p: any) => p.dataKey === 'demand')?.value || 0;
    const gap = supply - demand;

    return (
      <div className="bg-fg-primary text-bg-surface border border-border-strong p-2.5 shadow-[2px_2px_0px_0px_var(--portal-primary,#10B981)] font-mono text-xs">
        <span className="font-bold text-portal-primary block mb-1 uppercase tracking-wider">
          {label}
        </span>
        <div className="flex justify-between gap-6 py-0.5">
          <span className="text-neutral-400">Institutional Supply:</span>
          <span className="font-bold text-white tnum">{supply}%</span>
        </div>
        <div className="flex justify-between gap-6 py-0.5">
          <span className="text-neutral-400">Industry Demand:</span>
          <span className="font-bold text-portal-primary tnum">{demand}%</span>
        </div>
        <div className="flex justify-between gap-6 pt-1 border-t border-neutral-700 mt-1">
          <span className="text-neutral-400">Deficit Delta:</span>
          <span className={gap < -20 ? 'text-status-danger font-bold' : 'text-status-warning font-bold'}>
            {gap}% {gap < -20 ? '[CRITICAL]' : '[GAP]'}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const CurriculumGapChart: React.FC<CurriculumGapChartProps> = ({
  data = defaultData,
  className = '',
  height = 300,
  accentColor = '#10B981',
}) => {
  return (
    <div className={`w-full bg-bg-surface border border-border-strong p-space-md ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-xs border-b border-border-hairline mb-space-sm gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-portal-primary border border-border-strong" />
          <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
            INSTITUTIONAL SUPPLY VS ENTERPRISE DEMAND BENCHMARK
          </span>
        </div>
        <span className="font-label-mono text-[10px] text-fg-muted uppercase">
          AICTE MODEL CURRICULUM v4.2
        </span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid stroke="#E4E4E7" strokeDasharray="2 2" vertical={false} />
            <XAxis
              dataKey="skill"
              tick={{ fill: '#09090B', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
              interval={0}
              angle={-15}
              textAnchor="end"
              axisLine={{ stroke: '#18181B' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#71717A', fontSize: 10, fontFamily: 'monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 8, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
            />
            <Bar
              dataKey="supply"
              name="Institutional Supply %"
              fill="#18181B"
              barSize={18}
            />
            <Bar
              dataKey="demand"
              name="Market Demand %"
              fill={accentColor}
              stroke="#18181B"
              strokeWidth={1}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
