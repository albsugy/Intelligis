'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import type { Props } from './types';

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

export function CustomAreaChart({ data }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='xAxisKey'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='dot' />}
        />
        <Area
          dataKey='low'
          type='natural'
          fill='var(--color-low)'
          fillOpacity={0.4}
          stroke='var(--color-low)'
          stackId='a'
        />
        <Area
          dataKey='current'
          type='natural'
          fill='var(--color-current)'
          fillOpacity={0.4}
          stroke='var(--color-current)'
          stackId='a'
        />
        <Area
          dataKey='high'
          type='natural'
          fill='var(--color-high)'
          fillOpacity={0.4}
          stroke='var(--color-high)'
          stackId='a'
        />
      </AreaChart>
    </ChartContainer>
  );
}
