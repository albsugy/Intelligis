import DynamicChart from '@/app/projects/[id]/components/DynamicChart'
import StatCard from '@/app/projects/[id]/components/StatCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ITotal, IWidget } from '@/lib/ai/actions'
import { IProject } from '@/types/projects'
import React from 'react'

interface Props {
  project: IProject,
  activeDataIndex: number
}

export default function ProjectCompareView({ project, activeDataIndex = 0 }: Props) {
  const stringified_json = project?.data[activeDataIndex]?.stringified_json
  const projectData = JSON.parse(stringified_json ?? "{}")
  const projectWidgets: IWidget[] = projectData.widgets;
  const projectTotals: ITotal[] = projectData.totals;

  return (
    <div className='relative'>
      <ScrollArea className='h-[calc(100vh-310px)]'>
        <div
          className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'
        >
          {projectTotals?.slice(0, 4)?.map((item) => (
            <StatCard
              key={item.title}
              label={item.title}
              desc={item.description}
              value={item.value}
              insight={item.insight}
            />
          ))}
        </div>

        <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'
        >
          {projectWidgets?.map((widget) => (
            <>
              {widget && widget?.data?.length > 0 && (
                <DynamicChart
                  key={widget.title}
                  title={widget.title}
                  type={widget.type}
                  desc={widget.description}
                  insight={widget.insight}
                  data={widget.data ?? []}
                  xAxisKey='xAxisKey'
                  yAxisKey='high'
                  secondaryAxisKey='current'
                  thirdAxisKey='low'
                />
              )}
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
