import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useContext, useEffect } from 'react';

import { withApollo } from '../../lib/apollo';
import { Store } from '../../store';
import { Project } from '../../@generated/graphql';
import { ProjectCard } from '../../components/Projects/ProjectCard';
import { ProjectLayout } from '../../components/Projects/ProjectLayout';
import { authClient } from '../../lib/apolloClient';

const PROJECTS_QUERY = gql`
  query allProjects {
    projects {
      id
      name
      language
      createdBy
    }
  }
`;

const Projects: NextPage = () => {
  const { user } = useContext(Store);
  const router = useRouter();

  const { data, error, loading } = useQuery<{ projects: Project[] }>(
    PROJECTS_QUERY,
    {
      client: authClient,
    }
  );

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  return (
    <ProjectLayout title="All Projects">
      <Fragment>
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-2xl">Projects for {user?.name}</h1>
          <Link href="/projects/new">
            <a className="flex flex-row items-center border-black border rounded-md px-4 py-2 hover:bg-gray-100">
              <i className="material-icons text-lg mr-2">add</i> Create Project
            </a>
          </Link>
        </div>
        <div className="flex flex-row pt-4">
          {data
            ? data.projects.map((project) => {
                return (
                  <ProjectCard
                    key={`project-card-${project.id}`}
                    skeleton={false}
                    project={project}
                  />
                );
              })
            : [0, 1, 2, 3].map((key) => {
                return (
                  <ProjectCard
                    key={`project-card-skeleton-${key}`}
                    skeleton={true}
                  />
                );
              })}
        </div>
      </Fragment>
    </ProjectLayout>
  );
};

export default withApollo(Projects);
