'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import ProjectCompareView from '@/app/compare/components/ProjectCompareView';
import { METHOD_MAPPING } from '@/app/projects/components/utils';
import { useProjects } from '@/context/ProjectsContext';

export default function SearchBar() {
  const { fetching, projects } = useProjects();
  const searchParams = useSearchParams();
  const firstProjectIdParam = searchParams.get('p1');
  const secondProjectIdParam = searchParams.get('p2');

  const [firstProjectId, setFirstProjectId] = useState(firstProjectIdParam);
  const [firstProjectDataIndex, setFirstProjectDataIndex] = useState('0');
  const [secondProjectId, setSecondProjectId] = useState(secondProjectIdParam);
  const [secondProjectDataIndex, setSecondProjectDataIndex] = useState('0');

  if (fetching) {
    return (
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-xl font-bold tracking-tight'>Loading...</h3>
        </div>
      </div>
    );
  }

  if (projects.length === 0 && !fetching) {
    return (
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        x-chunk='dashboard-02-chunk-1'
      >
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight'>
            You have no projects
          </h3>
        </div>
      </div>
    );
  }

  const firstProject = projects.find(
    (project) => project.$id === firstProjectId,
  );
  const secondProject = projects.find(
    (project) => project.$id === secondProjectId,
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
      <Card className='p-4'>
        <div className='flex gap-2'>
          <div className='flex flex-col justify-center w-full'>
            <p className='text-sm mb-2'>Project</p>
            <Select onValueChange={(id) => setFirstProjectId(id)}>
              <SelectTrigger>
                <SelectValue placeholder='Select a project' />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project.$id} value={project.$id}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {firstProject && (
            <div className='flex flex-col justify-center w-full'>
              <p className='text-sm mb-2'>History</p>

              <Select onValueChange={(id) => setFirstProjectDataIndex(id)}>
                <SelectTrigger>
                  <SelectValue placeholder='History' />
                </SelectTrigger>
                <SelectContent>
                  {firstProject?.data?.map((data, idx) => (
                    <SelectItem key={data.$id} value={idx.toString()}>
                      {data.$createdAt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {firstProject && (
          <div>
            <div className='flex flex-col gap-1 my-4'>
              <h3 className='font-semibold'>Project: {firstProject?.title}</h3>
              <div className='flex gap-2'>
                <p className='text-xs'>
                  <b>Method:</b>{' '}
                  {METHOD_MAPPING[firstProject.projection_method]}
                </p>
                <p className='text-xs'>
                  <b>Industry:</b> {firstProject.industry}
                </p>
                <p className='text-xs'>
                  <b>Business Focus:</b> {firstProject.businessFocus}
                </p>
              </div>
            </div>
            <ProjectCompareView
              project={firstProject}
              activeDataIndex={Number(firstProjectDataIndex)}
            />
          </div>
        )}
      </Card>

      <Card className='p-4'>
        <div className='flex gap-2'>
          <div className='flex flex-col justify-center w-full'>
            <p className='text-sm mb-2'>Project</p>
            <Select onValueChange={(id) => setSecondProjectId(id)}>
              <SelectTrigger>
                <SelectValue placeholder='Select a project' />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project.$id} value={project.$id}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {secondProject && (
            <div className='flex flex-col justify-center w-full'>
              <p className='text-sm mb-2'>History</p>
              <Select onValueChange={(id) => setSecondProjectDataIndex(id)}>
                <SelectTrigger>
                  <SelectValue placeholder='History' />
                </SelectTrigger>
                <SelectContent>
                  {secondProject?.data?.map((data, idx) => (
                    <SelectItem key={data.$id} value={idx.toString()}>
                      {data.$createdAt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {secondProject && (
          <div>
            <div className='flex flex-col gap-1 my-4'>
              <h3 className='font-semibold'>Project: {secondProject?.title}</h3>
              <div className='flex gap-2'>
                <p className='text-xs'>
                  <b>Method:</b>{' '}
                  {METHOD_MAPPING[secondProject.projection_method]}
                </p>
                <p className='text-xs'>
                  <b>Industry:</b> {secondProject.industry}
                </p>
                <p className='text-xs'>
                  <b>Business Focus:</b> {secondProject.businessFocus}
                </p>
              </div>
            </div>
            <ProjectCompareView
              project={secondProject}
              activeDataIndex={Number(secondProjectDataIndex)}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
