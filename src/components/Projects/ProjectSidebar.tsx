import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useContext } from 'react';
import { ProjectStore } from '../../store/projects';

interface LinkConfig {
  href: string;
  icon: string;
  text: string;
  exact: boolean;
}

const links: LinkConfig[] = [
  {
    href: '/projects',
    icon: 'list',
    text: 'All Projects',
    exact: true,
  },
  {
    href: '/projects/new',
    icon: 'add',
    text: 'New Project',
    exact: false,
  },
  {
    href: '/projects/issues',
    icon: 'error_outline',
    text: 'Issues',
    exact: false,
  },
  {
    href: '/projects/keys',
    icon: 'vpn_key',
    text: 'Keys',
    exact: false,
  },
];

export const ProjectSidebar: React.FC = () => {
  const router = useRouter();
  return (
    <aside id="sidebar" className="bg-blue-500 w-60 h-full flex-shrink-0 p-4">
      <div id="links" className="w-full flex flex-col">
        {links.map((link) => {
          let isCurrentRoute = false;

          if (link.exact) {
            isCurrentRoute = router.pathname === link.href;
          } else {
            isCurrentRoute = router.pathname.includes(link.href);
          }

          return (
            <Link key={`projects-sidebar-${link.href}`} href={link.href}>
              <a className="w-full h-10 mb-2 pr-4 bg-white hover:bg-gray-100 overflow-hidden flex flex-row items-center rounded-md">
                {/* Selection indicator */}

                {/* Only need to split out like this because of tailwind's purge feature. The color was breaking in prod */}
                {isCurrentRoute ? (
                  <div className="w-3 h-full rounded-md relative mr-2 -left-1 bg-green-300"></div>
                ) : (
                  <div className="w-3 h-full rounded-md relative mr-2 -left-1 bg-gray-300"></div>
                )}
                <i className="material-icons">{link.icon}</i>
                <span className="mx-auto">{link.text}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
