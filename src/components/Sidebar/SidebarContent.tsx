import sidebar from '@/utils/sidebar';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { useRouter } from 'next/router';

// import { Disclosure } from '@headlessui/react';
// import { ChevronUpIcon } from '@heroicons/react/20/solid';

import { toggleSidebar } from '@/redux/features/sidebar/sidebarConfigSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import NavItem from './NavItem';

export default function SidebarContent() {
  const router = useRouter();
  const redirectCB = (path: string) => router.push(path);

  const dispatch = useDispatch();

  return (
    <div className="z-50 h-full rounded-none border shadow-md lg:left-0">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex flex-col">
          <div className=" flex h-16 w-full items-center justify-between p-5">
            <Link
              href="/"
              className="w-full font-bold text-slate-800/80 dark:text-slate-200/80"
            >
              Chatbot
            </Link>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="hidden cursor-pointer rounded-full bg-primary/50 duration-300 max-lg:block"
            >
              <XMarkIcon color="white" className="h-6 w-6 " />
            </button>
          </div>

          <div className="flex w-full flex-col gap-1 p-3">
            {sidebar.map((item, index: number) => (
              // if (item.child && item.child.length > 0) {
              //   return (
              //     <DisclosureNavItems
              //       key={`${index + 1}`}
              //       name={item.name}
              //       child={item.child}
              //       Icon={item.icon}
              //     />
              //   );
              // }
              <NavItem
                key={`${index + 1}`}
                href={item.path}
                Inco={item.icon}
                name={item.name}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={() => {
            signOut({
              redirect: false,
            });
            redirectCB('/sign-in');
          }}
          color="light"
          className="m-5 text-sm"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
