import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect } from 'react';
import { Store } from '../../store';

const Projects: NextPage = () => {
  const { user } = useContext(Store);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  return <div>Projects for {user?.name}</div>;
};

export default Projects;
