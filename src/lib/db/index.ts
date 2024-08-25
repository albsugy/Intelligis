'use server';

import { Client, Databases, ID, Query } from 'node-appwrite';

import { IProject, ProjectionMethod } from '@/types/projects';

const APPWRITE_API_ENDPOINT = process.env.NEXT_APPWRITE_API_ENDPOINT ?? '';
const APPWRITE_PROJECT_ID = process.env.NEXT_APPWRITE_PROJECT_ID ?? '';
const APPWRITE_DATABASE_ID = process.env.NEXT_APPWRITE_DATABASE_ID ?? '';
const APPWRITE_COLLECTION_ID = process.env.NEXT_APPWRITE_COLLECTION_ID ?? '';

export interface INewProject {
  title: string;
  projection_method: ProjectionMethod;
  data: { stringified_json: string }[];
}

export const addNewProject = async (project: Partial<IProject>) => {
  const client = new Client()
    .setEndpoint(APPWRITE_API_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  const promise = databases.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    ID.unique(),
    project,
  );

  promise.then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    },
  );
};

export const listProjects = async () => {
  const client = new Client()
    .setEndpoint(APPWRITE_API_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  const promise = databases.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    [Query.orderDesc('$createdAt')],
  );

  return promise.then(
    function (response) {
      console.log(response);
      return response;
    },
    function (error) {
      console.log(error);
      return error;
    },
  );
};

export const updateProject = async (
  projectId: string,
  updatedProject: Partial<IProject>,
) => {
  const client = new Client()
    .setEndpoint(APPWRITE_API_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  const promise = await databases.updateDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    projectId,
    updatedProject,
  );

  return promise;
};

export const deleteProject = async (projectId: string) => {
  const client = new Client()
    .setEndpoint(APPWRITE_API_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  const promise = await databases.deleteDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID,
    projectId,
  );

  return promise;
};
