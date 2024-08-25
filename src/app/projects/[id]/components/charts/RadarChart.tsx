'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import type { Props } from './types';
const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  current: {
    label: 'Current',
    color: 'hsl(var(--chart-4))',
  },
  low: {
    label: 'Low',
    color: 'hsl(var(--chart-1))',
  },
  high: {
    label: 'High',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function CustomRadarChart({ data }: Props) {
  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[250px]'
    >
      <RadarChart data={data}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='line' />}
        />
        <PolarAngleAxis dataKey='xAxisKey' />
        <PolarGrid />
        <Radar dataKey='high' fill='var(--color-high)' fillOpacity={0.6} />
        <Radar
          dataKey='current'
          fill='var(--color-current)'
          fillOpacity={0.6}
        />
        <Radar dataKey='low' fill='var(--color-low)' fillOpacity={0.8} />
      </RadarChart>
    </ChartContainer>
  );
}
