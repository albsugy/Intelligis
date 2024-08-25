'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

import { useProjects } from '@/context/ProjectsContext';

import { ProjectionMethod } from '@/types/projects';

const formSchema = z.object({
  title: z.string().min(4).max(50),
  projection_method: z.string().min(1, { message: 'Method is required' }),
  industry: z.string().min(1, { message: 'Industry is required' }),
  businessFocus: z.string().min(1, { message: 'Business Focus is required' }),
});

export function NewProject() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>New Project</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Create a new project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProjectForm closeModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

const methods = [
  { value: 'time_series_analysis', label: 'Time Series Analysis' },
  { value: 'machine_learning', label: 'Machine Learning' },
  { value: 'statistical', label: 'Statistical' },
  { value: 'deep_learning', label: 'Deep Learning' },
  { value: 'regression_analysis', label: 'Regression Analysis' },
  { value: 'econometric', label: 'Econometric' },
  { value: 'scenario_planning', label: 'Scenario Planning' },
  { value: 'judgmental', label: 'Judgmental' },
  { value: 'extrapolation', label: 'Extrapolation' },
  { value: 'decomposition', label: 'Decomposition' },
  { value: 'growth_curve', label: 'Growth Curve' },
  { value: 'bayesian_forecasting', label: 'Bayesian Forecasting' },
  { value: 'demand_forecasting', label: 'Demand Forecasting' },
  { value: 'qualitative', label: 'Qualitative' },
  { value: 'hybrid', label: 'Hybrid' },
];

interface IProjectForm extends React.ComponentProps<'form'> {
  closeModal: () => void;
}

function ProjectForm({ className, closeModal }: IProjectForm) {
  const { addNew } = useProjects();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      projection_method: '',
      industry: '',
      businessFocus: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addNew({
      title: values.title,
      projection_method: values.projection_method as ProjectionMethod,
      industry: values.industry,
      businessFocus: values.businessFocus,
      data: [],
    });
    closeModal();
    toast({
      title: 'Project created successfully.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='projection_method'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projection Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a method' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='industry'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='businessFocus'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Focus</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Create</Button>
      </form>
    </Form>
  );
}
