'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import type { Props } from './types';

const chartConfig = {
  current: {
    label: 'current',
    color: 'hsl(var(--chart-1))',
  },
  xAxisKey: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function CustomPiceChart({ data }: Props) {
  const dataWithColors = data.map((item, idx) => ({
    ...item,
    fill: `hsl(var(--chart-${idx + 1}))`,
  }));
  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[200px]'
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Pie data={dataWithColors} dataKey='current' nameKey='xAxisKey'>
          <LabelList
            dataKey='xAxisKey'
            className='fill-background'
            stroke='none'
            fontSize={12}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
