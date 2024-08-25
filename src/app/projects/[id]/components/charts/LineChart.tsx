'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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

export function LineChartC({ data }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
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
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey='low'
          type='natural'
          stroke='var(--color-low)'
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey='current'
          type='natural'
          stroke='var(--color-current)'
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey='high'
          type='natural'
          stroke='var(--color-high)'
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
