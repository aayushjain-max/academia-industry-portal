'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export interface SkillRadarItem {
  subject: string;
  candidate: number;
  benchmark: number;
  fullMark?: number;
}

export interface SkillRadarChartProps {
  data?: SkillRadarItem[];
  className?: string;
  height?: number;
}

const defaultData: SkillRadarItem[] = [
  { subject: 'Async Python', candidate: 90, benchmark: 80, fullMark: 100 },
  { subject: 'PostgreSQL Opt', candidate: 84, benchmark: 75, fullMark: 100 },
  { subject: 'Docker / K8s', candidate: 40, benchmark: 70, fullMark: 100 },
  { subject: 'Microservices', candidate: 65, benchmark: 80, fullMark: 100 },
  { subject: 'Algorithms / DSP', candidate: 88, benchmark: 75, fullMark: 100 },
  { subject: 'Security / Crypt', candidate: 72, benchmark: 65, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-fg-primary text-bg-surface border border-border-strong p-2 shadow-[2px_2px_0px_0px_#FACC15] font-mono text-[11px]">
        <span className="font-bold text-accent-signal block mb-1 uppercase tracking-wider">{data.subject}</span>
        <div className="flex justify-between gap-4">
          <span className="text-neutral-400">Candidate:</span>
          <span className="font-bold text-accent-signal">{data.candidate}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-neutral-400">Industry Target:</span>
          <span className="font-bold text-white">{data.benchmark}%</span>
        </div>
        <div className="flex justify-between gap-4 pt-1 border-t border-neutral-700 mt-1">
          <span className="text-neutral-400">Delta:</span>
          <span className={data.candidate >= data.benchmark ? 'text-status-success font-bold' : 'text-status-danger font-bold'}>
            {data.candidate >= data.benchmark ? `+${data.candidate - data.benchmark}%` : `${data.candidate - data.benchmark}%`}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({
  data = defaultData,
  className = '',
  height = 320,
}) => {
  return (
    <div className={`w-full bg-bg-surface border border-border-strong p-space-md ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-xs border-b border-border-hairline mb-space-sm gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent-signal border border-border-strong" />
          <span className="font-label-mono text-label-mono uppercase font-bold text-fg-primary">
            RADAR PROFILE // 6-AXIS COMPETENCY MATRIX
          </span>
        </div>
        <div className="flex items-center gap-3 font-label-mono text-[10px] text-fg-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-accent-signal border border-border-strong inline-block" />
            CANDIDATE
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-neutral-900 border border-neutral-500 inline-block" />
            INDUSTRY TARGET
          </span>
        </div>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#E4E4E7" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#09090B', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              stroke="#71717A"
              tick={{ fontSize: 9, fontFamily: 'monospace' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Industry Benchmark"
              dataKey="benchmark"
              stroke="#18181B"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="#18181B"
              fillOpacity={0.08}
            />
            <Radar
              name="Candidate Score"
              dataKey="candidate"
              stroke="#EAB308"
              strokeWidth={2}
              fill="#FACC15"
              fillOpacity={0.45}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
