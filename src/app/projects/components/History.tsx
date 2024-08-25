import { FileClock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { IData, IProject } from '@/types/projects';

interface Props {
  project: IProject;
  setCurrent: (idx: number) => void;
}

function sortItemsByDate(items: IData[]) {
  return items.sort((a, b) => {
    const dateA = new Date(a.$createdAt);
    const dateB = new Date(b.$createdAt);

    return dateB.getTime() - dateA.getTime();
  });
}

export function History({ project, setCurrent }: Props) {
  const dataToDisplay = sortItemsByDate(project?.data) ?? [];

  return (
    <div
      className='relative hidden flex-col items-start gap-8 md:flex lg:col-span-1 h-[calc(100vh - 160px)]'
      x-chunk='dashboard-03-chunk-0'
    >
      <div className='w-full items-start gap-6 rounded-lg border h-full'>
        <h3 className='text-sm font-semibold my-2 px-4 flex gap-1.5 items-center'>
          <FileClock className='size-4' />
          Report history
        </h3>
        <ScrollArea className=''>
          {dataToDisplay.map((item, idx) => {
            return (
              <Button
                variant='ghost'
                key={idx}
                className='flex w-full justify-between items-center transition-all hover:bg-gray-50 px-4'
                onClick={() => setCurrent(idx)}
              >
                <div className='text-xs truncate'>
                  {new Date(item.$createdAt).toUTCString()}
                </div>
              </Button>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
}
