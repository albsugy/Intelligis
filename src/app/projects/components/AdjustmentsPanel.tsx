'use client';

import { useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

import { Categories, categorizeFactors } from './utils';
import { usePredictiveAnalytics } from '../../../context/PredictiveAnalyticsContext';

import { IProject } from '@/types/projects';

interface Props {
  open: boolean;
  project: IProject;
}

export function AdjustmentPanel({ open, project }: Props) {
  const { adjustments, updateAdjustment } = usePredictiveAnalytics();
  const categorizedAdjustments = categorizeFactors(adjustments);
  const [category, setCategory] = useState<keyof Categories>('Economic');
  if (!open) return null;

  return (
    <div
      className='relative hidden flex-col items-start gap-8 md:flex h-[calc(100vh - 160px)]'
      x-chunk='dashboard-03-chunk-0'
    >
      <form className='grid w-full items-start gap-6 h-full'>
        <fieldset className='flex flex-col gap-4 rounded-lg border p-4 h-full'>
          <legend className='-ml-1 px-1 text-sm font-medium'>
            Adjust Predictive Factors
          </legend>
          <Select
            defaultValue='Economic'
            onValueChange={(value) => setCategory(value as keyof Categories)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Economic'>Economic</SelectItem>
              <SelectItem value='MarketDynamics'>Market Dynamics</SelectItem>
              <SelectItem value='InnovationAndTechnology'>
                Innovation and Technology
              </SelectItem>
              <SelectItem value='RegulatoryAndPolitical'>
                Regulatory and Political
              </SelectItem>
              <SelectItem value='OperationalAndOrganizational'>
                Operational and Organizational
              </SelectItem>
              <SelectItem value='EnvironmentalAndSustainability'>
                Environmental and Sustainability
              </SelectItem>
              <SelectItem value='SocialAndCultural'>
                Social and Cultural
              </SelectItem>
              <SelectItem value='EmergingIndustries'>
                Emerging Industries
              </SelectItem>
            </SelectContent>
          </Select>

          <ScrollArea className='h-full'>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 pb-4'>
              {Object.entries(categorizedAdjustments[category]).map(
                ([key, value]) => (
                  <div key={key} className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700 capitalize'>
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                    </label>
                    <Slider
                      min={-100}
                      max={100}
                      step={1}
                      value={[value]}
                      onValueChange={(newValue) =>
                        updateAdjustment(
                          key as keyof typeof adjustments,
                          newValue[0],
                        )
                      }
                    />
                  </div>
                ),
              )}
            </div>
          </ScrollArea>
        </fieldset>
      </form>
    </div>
  );
}
