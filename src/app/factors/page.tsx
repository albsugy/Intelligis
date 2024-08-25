'use client';

import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Factors() {
  const factors = [
    { label: 'Growth Rate', formula: '`original * (1 + adjustment / 100)`' },
    {
      label: 'Market Volatility',
      formula: '`original * (1 + sin(time * 6 * π) * (adjustment / 100))`',
    },
    {
      label: 'Long Term Trend',
      formula:
        '`original * (1 + (random number between -0.5 and 0.5) * (adjustment / 50))`',
    },
    {
      label: 'Competition Intensity',
      formula: '`original * (1 - adjustment / 200)`',
    },
    {
      label: 'Innovation Factor',
      formula: '`original * (1 + (adjustment / 100) * time)`',
    },
    {
      label: 'Regulatory Impact',
      formula:
        '`original * (1 + (adjustment / 100) * (random number between -0,5 and 0,5))`',
    },
    {
      label: 'Economic Cycles',
      formula: '`original * (1 + sin(time * 12 * π) * (adjustment / 100))`',
    },
    {
      label: 'Consumer Sentiment',
      formula: '`original * (1 + adjustment / 100)`',
    },
    {
      label: 'Supply Chain Efficiency',
      formula:
        '`original * (1 + (adjustment / 100) * (1 - random number between 0 and 0,2))`',
    },
    {
      label: 'Market Expansion',
      formula: '`original * (1 + (adjustment / 100) * time)`',
    },
    {
      label: 'Product Diversification',
      formula: '`original * (1 + (adjustment / 100) * (1 - e^(-time)))`',
    },
    {
      label: 'Customer Retention',
      formula: '`original * (1 + (adjustment / 100) * (1 - 1 / (time + 1)))`',
    },
    {
      label: 'Brand Reputation',
      formula:
        '`original * (1 + (adjustment / 100) * (1 - random number between 0 and 0,1))`',
    },
    {
      label: 'Operational Efficiency',
      formula: '`original * (1 + (adjustment / 100) * (1 - 1 / (time + 1)))`',
    },
    {
      label: 'Talent Acquisition',
      formula: '`original * (1 + (adjustment / 100) * (1 - e^(-time)))`',
    },
    {
      label: 'Research and Development',
      formula:
        '`original * (1 + (adjustment / 100) * time * (1 + random number between 0 and 0,5))`',
    },
    {
      label: 'Marketing Effectiveness',
      formula: '`original * (1 + (adjustment / 100) * (1 - 1 / (time + 2)))`',
    },
    {
      label: 'Partnership Synergies',
      formula: '`original * (1 + (adjustment / 100) * (1 - e^(-(time + 1))))`',
    },
    {
      label: 'Sustainability Impact',
      formula: '`original * (1 + (adjustment / 100) * (1 - 1 / (time + 3)))`',
    },
    {
      label: 'Technology Adoption',
      formula: '`original * (1 + (adjustment / 100) * (1 - e^(-time * 2)))`',
    },
    {
      label: 'Demographic Shifts',
      formula: '`original * (1 + (adjustment / 100) * sin(time * π))`',
    },
    {
      label: 'Globalization Impact',
      formula: '`original * (1 + (adjustment / 100) * (0,5 - |time - 0,5|))`',
    },
    {
      label: 'Climate Change Effect',
      formula: '`original * (1 - (adjustment / 100) * time^2)`',
    },
    {
      label: 'Geopolitical Stability',
      formula:
        '`original * (1 + (adjustment / 100) * (random number between -0,5 and 0,5) * time)`',
    },
    {
      label: 'Urbanization Trend',
      formula: '`original * (1 + (adjustment / 100) * (1 - 1 / (1 + time)))`',
    },
    {
      label: 'Workforce Automation',
      formula: '`original * (1 + (adjustment / 100) * (1 - e^(-time * 3)))`',
    },
    {
      label: 'Data Privacy Concerns',
      formula: '`original * (1 - (adjustment / 200) * (1 - e^(-time * 2)))`',
    },
    {
      label: 'Healthcare Trends',
      formula: '`original * (1 + (adjustment / 100) * log(1 + time))`',
    },
    {
      label: 'Energy Transition',
      formula:
        '`original * (1 + (adjustment / 100) * (1 - 1 / (1 + time * 2)))`',
    },
    {
      label: 'Artificial Intelligence Impact',
      formula: '`original * (1 + (adjustment / 100) * time^1,5)`',
    },
    {
      label: 'Cybersecurity Threats',
      formula: '`original * (1 - (adjustment / 200) * (1 - e^(-time * 4)))`',
    },
    {
      label: 'Social Media Influence',
      formula:
        ':original * (1 + (adjustment / 100) * (0,5 + 0,5 * sin(time * 2π)))`',
    },
    {
      label: 'Circular Economy Adoption',
      formula: '`original * (1 + (adjustment / 100) * (1 - e^(-time * 1,5)))`',
    },
    {
      label: 'Education Evolution',
      formula: '`original * (1 + (adjustment / 100) * log(1 + time * 2))`',
    },
    {
      label: 'Biotech Breakthroughs',
      formula: '`original * (1 + (adjustment / 100) * time^2)`',
    },
    {
      label: 'Space Industry',
      formula: 'Growth: `original * (1 + (adjustment / 100) * time^2,5)`',
    },
    {
      label: 'Quantum Computing Progress',
      formula: '`original * (1 + (adjustment / 100) * time^3)`',
    },
    {
      label: 'Blockchain Adoption',
      formula:
        '`original * (1 + (adjustment / 100) * (1 - 1 / (1 + time * 3)))`',
    },
    {
      label: 'Mental Health Awareness',
      formula: '`original * (1 + (adjustment / 100) * (1 - e^(-time)))`',
    },
  ];

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold md:text-xl'>
          Adjustment Factors Formulas
        </h1>
      </div>
      <main>
        <ScrollArea className='h-[calc(100vh-150px)]'>
          <section className='bg-white'>
            <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12'>
              <Card className='min-w-[600px]'>
                <CardContent>
                  <div className='grid gap-6 pt-4'>
                    <p>
                      For all formulas:
                      <ul>
                        <li>- `original` is the original data point value</li>
                        <li>
                          - `adjustment` is the adjustment factor value (0-100)
                        </li>
                        <li>
                          - `time` is a value from 0 to 1, representing the
                          position of the data point in the time series
                        </li>
                      </ul>
                    </p>
                    <div className='grid gap-3'>
                      {factors.map((factor) => (
                        <div key={factor.label}>
                          <Label>{factor.label}</Label>
                          <pre className=' rounded-md bg-slate-100 p-4'>
                            <code className='text-black'>{factor.formula}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </ScrollArea>
      </main>
    </>
  );
}
