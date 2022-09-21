import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

type sidebarItemProps = {
    icon: IconDefinition
    title: string
    to: string
}

const SidebarItem = ({ icon, title, to }: sidebarItemProps) => {
  const [currentRoute, setCurrentRoute] = useState<string>('');

  useEffect(() => {
    const { pathname } = Router;
    setCurrentRoute(pathname);
  }, []);

  return (
    <Link href={to}>
      <div className={`nav-link sidebar-item cursor-pointer ${currentRoute === to ? 'active' : ''}`}>
        <span className=''>
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className='ms-2'>{title}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
