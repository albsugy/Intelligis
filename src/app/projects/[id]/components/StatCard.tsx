'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  label: string;
  desc: string;
  value: string;
  insight: string;
}

export default function StatCard({ label, desc, value, insight }: Props) {
  return (
    <Card className='max-w-xs'>
      <CardHeader className='p-4 pb-0'>
        <CardTitle className='text-lg'>{label}</CardTitle>
        <CardDescription className='text-xs'>{desc}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-row items-baseline gap-4 p-4 pt-0 mt-3'>
        <div className='flex items-baseline gap-1 text-md font-bold tabular-nums leading-none'>
          {value}
        </div>
      </CardContent>
      <p className='px-4 pb-3 text-xs text-gray-500'>{insight}</p>
    </Card>
  );
}
