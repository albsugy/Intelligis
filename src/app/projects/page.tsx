import { NewProject } from '@/app/projects/components/NewProject';
import ProjectList from '@/app/projects/components/ProjectList';

export default function HomePage() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold md:text-xl'>Projects</h1>
        <NewProject />
      </div>
      <ProjectList />
    </>
  );
}
