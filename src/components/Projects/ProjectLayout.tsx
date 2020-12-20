import Head from 'next/head';
import { ProjectSidebar } from './ProjectSidebar';

interface ProjectLayoutProps {
  title: string;
}

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <section className="h-full flex flex-row">
      <Head>
        <title>{title}</title>
      </Head>
      <ProjectSidebar />
      <div className="flex-grow px-10 py-5">{children}</div>
    </section>
  );
};
