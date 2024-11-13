import React from 'react';

import Search from '@/components/ui/search';
import UserNav from '@/components/headers/user-nav';
import MainNav from '@/components/headers/main-nav';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import ModeToggle from './ModeToggle';

export default function DashboardNav({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <div className="sticky top-0 z-40 border-b backdrop-blur-sm lg:ml-64">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6 hidden " />
        <div className="ml-auto flex items-center space-x-4">
          <Search className="hidden md:block" />
          <ModeToggle />
          <button
            className=" relative block cursor-pointer rounded-full bg-primary/10 p-2 duration-300 hover:bg-primary/20 hover:text-primary dark:bg-primary/40 dark:hover:bg-primary/60 lg:hidden"
            onClick={() => toggleSidebar()}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 dark:text-gray-200" />
          </button>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
