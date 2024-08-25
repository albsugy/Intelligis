'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  addNewProject,
  deleteProject,
  listProjects,
  updateProject,
} from '@/lib/db';

import { IProject } from '@/types/projects';

interface ProjectsContext {
  loading: boolean;
  fetching: boolean;
  projects: IProject[];
  fetchProjects: () => Promise<void>;
  addNew: (p: Partial<IProject>) => Promise<void>;
  update: (id: string, p: Partial<IProject>) => Promise<void>;
  deleteProjectById: (id: string) => Promise<void>;
}

export const ProjectsContext = createContext<ProjectsContext>({
  loading: false,
  fetching: false,
  projects: [],
  fetchProjects: () => Promise.resolve(),
  addNew: () => Promise.resolve(),
  update: () => Promise.resolve(),
  deleteProjectById: () => Promise.resolve(),
});

export const ProjectsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);

  async function fetchProjects() {
    setFetching(true);
    try {
      const response = await listProjects();
      setProjects(response.documents);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const addNew = useCallback(async (project: Partial<IProject>) => {
    setLoading(true);
    try {
      await addNewProject(project);
      setTimeout(async () => {
        await fetchProjects();
      }, 600);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, project: Partial<IProject>) => {
    setLoading(true);
    try {
      await updateProject(id, project);
      await fetchProjects();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProjectById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await deleteProject(id);
      await fetchProjects();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: ProjectsContext = useMemo(() => {
    return {
      loading: loading || fetching,
      fetching,
      projects,
      fetchProjects,
      addNew,
      update,
      deleteProjectById,
    };
  }, [loading, fetching, projects, addNew, update]);

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContext => {
  const context = useContext(ProjectsContext);

  if (context === null) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }

  return context;
};
