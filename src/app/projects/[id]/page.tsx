'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { readStreamableValue } from 'ai/rsc';
import { FileClock, Settings, Sparkles, Upload } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { generate, ITotal, IWidget } from '@/lib/ai/actions';
import { generateInsights } from '@/lib/ai/watsonx-granite';
import { uploadAndExtractPDF } from '@/lib/extract-pdf-text';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

import DynamicChart from '@/app/projects/[id]/components/DynamicChart';
import StatCard from '@/app/projects/[id]/components/StatCard';
import { AdjustmentPanel } from '@/app/projects/components/AdjustmentsPanel';
import { History } from '@/app/projects/components/History';
import { useProjects } from '@/context/ProjectsContext';

import { METHOD_MAPPING } from '../components/utils';

import { IData } from '@/types/projects';

export default function Page({ params }: { params: { id: string } }) {
  const { loading, projects, update, fetchProjects } = useProjects();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [adjustmentsOpen, setAdjustmentsOpen] = useState(false);

  // File form
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // AI
  const [generating, setGenerating] = useState(false);
  const [widgets, setWidgets] = useState<IWidget[]>([]);
  const [totals, setTotals] = useState<ITotal[]>([]);

  const [currentProjection, setCurrentProjection] = useState(0);

  const project = projects.find((proj) => proj.$id === params.id);

  useEffect(() => {
    const dataLength = project?.data?.length;
    dataLength && setCurrentProjection(dataLength - 1);
  }, [project?.data?.length]);

  const formSchema = z.object({
    message: z.string().min(5, {
      message: 'Message must be at least 5 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  if (!params.id || !project) return null;

  // Project projection data
  const stringified_json = project?.data[currentProjection]?.stringified_json;
  const projectData = JSON.parse(stringified_json ?? '{}');
  const projectWidgets: IWidget[] = projectData.widgets;
  const projectTotals: ITotal[] = projectData.totals;

  const showEmptyState = !project?.data.length;

  interface IDataObject {
    widgets: IWidget[];
    totals: ITotal[];
  }

  const handleUpdateProject = async (data: IDataObject) => {
    update(project.$id, {
      data: [
        ...project.data,
        { stringified_json: JSON.stringify(data) },
      ] as IData[],
    });
  };

  const widgetsToDisplay = widgets?.length > 0 ? widgets : projectWidgets;
  const totalsToDisplay = totals?.length > 0 ? totals : projectTotals;

  async function generateReport(context: string, input?: string) {
    setGenerating(true);

    try {
      // Generating insights and widgets
      const widgets = await generateInsights('f');

      if (!project) return;
      // Generating charts data
      const { object } = await generate({
        context,
        method: project.projection_method,
        industry: project.industry,
        widgets,
        businessFocus: project.businessFocus,
        input,
      });

      const result = [];
      for await (const partialObject of readStreamableValue(object)) {
        if (partialObject) {
          setWidgets(partialObject.widgets);
          setTotals(partialObject.totals);
          result.push(partialObject);
        }
      }

      result.forEach((partialObject, index) => {
        if (index === result.length - 1) {
          console.log('This was the last iteration');
          handleUpdateProject({
            widgets: partialObject.widgets,
            totals: partialObject.totals,
          });
        }
      });
    } catch (error) {
      console.error('error', error);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmitFile(formData: FormData) {
    setGenerating(true);
    const result = await uploadAndExtractPDF(formData);

    if (result.success && result.text) {
      generateReport(result.text);

      setExtractedText(result.text);
      setError(null);
    } else {
      setError(result.error || 'An unknown error occurred');
      setExtractedText(null);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!project?.data[currentProjection]) return;

    await generateReport(`${project?.data[currentProjection]}`, values.message);
    await fetchProjects();
    form.reset();
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold md:text-lg'>
            Project: {project?.title}
          </h1>
          <div className='flex gap-2'>
            <p className='text-xs'>
              <b>Method:</b> {METHOD_MAPPING[project.projection_method]}
            </p>
            <p className='text-xs'>
              <b>Industry:</b> {project.industry}
            </p>
            <p className='text-xs'>
              <b>Business Focus:</b> {project.businessFocus}
            </p>
          </div>
        </div>

        {showEmptyState ? (
          <form className='flex gap-2' action={handleSubmitFile}>
            <Input
              className='max-w-80'
              type='file'
              name='pdfFile'
              accept='.pdf'
              required
            />
            <Button type='submit' disabled={generating}>
              {generating ? 'Generating...' : 'Generate Report'}
            </Button>
            {error && <p>{error}</p>}
          </form>
        ) : (
          <div className='flex gap-2'>
            {/* {generating || loading && ( */}
            {(generating || loading) && (
              <div className='flex gap-1 items-center mr-2 animate-pulse'>
                <Image
                  className=''
                  width={32}
                  height={32}
                  src='/images/logo.jpeg'
                  alt='Intelligis logo'
                />
                <h3 className='font-semibold text-sm tracking-tight'>
                  Generating...
                </h3>
              </div>
            )}
            <Popover>
              <PopoverTrigger>
                <Button size='sm' variant='outline'>
                  <Sparkles className='size-4' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='min-w-96'>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs'>Ask anything to change your data.</p>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-4'
                    >
                      <FormField
                        control={form.control}
                        name='message'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit' size='sm' disabled={generating}>
                        {generating ? 'Generating...' : 'Send'}
                      </Button>
                    </form>
                  </Form>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Button size='sm' className='ml-auto gap-1.5' variant='outline'>
                  <Upload className='size-4' />
                  New file
                </Button>
              </PopoverTrigger>
              <PopoverContent className='min-w-80'>
                <div className='flex flex-col gap-2'>
                  <form
                    className='flex flex-col gap-2'
                    action={handleSubmitFile}
                  >
                    <Input type='file' name='pdfFile' accept='.pdf' required />
                    <Button type='submit' size='sm' disabled={generating}>
                      {generating ? 'Generating...' : 'Generate'}
                    </Button>
                  </form>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              size='sm'
              variant='outline'
              className='ml-auto gap-1.5'
              onClick={() => setHistoryOpen(!historyOpen)}
            >
              <FileClock className='size-4' />
              History
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='ml-auto gap-1.5'
              onClick={() => setAdjustmentsOpen(!adjustmentsOpen)}
            >
              <Settings className='size-4' />
              Adjust
            </Button>
          </div>
        )}
      </div>
      <div>
        <main className='grid flex-1 gap-4 overflow-hidden md:grid-cols-1 lg:grid-cols-5'>
          {/* Project view */}
          {historyOpen && (
            <History project={project} setCurrent={setCurrentProjection} />
          )}
          <div
            className={cn(
              'relative flex flex-col rounded-xl bg-muted/50 p-4 lg:col-span-3 h-[calc(100vh-180px)]',
              { ['lg:col-span-4']: !adjustmentsOpen || !historyOpen },
              { ['lg:col-span-5']: !historyOpen && !adjustmentsOpen },
              { ['lg:col-span-3']: historyOpen && adjustmentsOpen },
            )}
          >
            <div className='relative'>
              <ScrollArea className='h-[calc(100vh-210px)]'>
                <div
                  className={cn('grid grid-cols-1 md:grid-cols-4 gap-8 mb-8', {
                    ['md:grid-cols-3']: adjustmentsOpen || historyOpen,
                  })}
                >
                  {totalsToDisplay
                    ?.slice(0, 4)
                    ?.map((item, idx) => (
                      <StatCard
                        key={idx}
                        label={item.title}
                        desc={item.description}
                        value={item.value}
                        insight={item.insight}
                      />
                    ))}
                </div>

                <div
                  className={cn(
                    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
                    { ['lg:grid-cols-2']: adjustmentsOpen || historyOpen },
                    { ['lg:grid-cols-3']: adjustmentsOpen && !historyOpen },
                  )}
                >
                  {widgetsToDisplay?.map((widget, idx) => (
                    <>
                      {widget && widget?.data?.length > 0 && (
                        <DynamicChart
                          key={idx}
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
          </div>
          <AdjustmentPanel open={adjustmentsOpen} project={project} />
        </main>
      </div>
    </>
  );
}
