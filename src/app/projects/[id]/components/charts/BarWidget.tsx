'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import type { Props } from './types';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

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

export function BarWidget({ data }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='xAxisKey'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey='low' fill='var(--color-low)' radius={4} />
        <Bar dataKey='current' fill='var(--color-current)' radius={4} />
        <Bar dataKey='high' fill='var(--color-high)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
