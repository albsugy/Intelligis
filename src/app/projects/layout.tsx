import React from 'react';

import Header from '@/app/projects/layout/Header';
import SidePanel from '@/app/projects/layout/SidePanel';
import { PredictiveAnalyticsProvider } from '@/context/PredictiveAnalyticsContext';
import { ProjectsProvider } from '@/context/ProjectsContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PredictiveAnalyticsProvider>
      <ProjectsProvider>
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
          <SidePanel />
          <div className='flex flex-col'>
            <Header />
            <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-5'>
              {children}
            </main>
          </div>
        </div>
      </ProjectsProvider>
    </PredictiveAnalyticsProvider>
  );
}
