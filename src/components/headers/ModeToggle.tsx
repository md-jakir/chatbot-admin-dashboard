import React, { Fragment } from 'react';

import { useTheme } from 'next-themes';

import { Menu, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Menu as="div" className="relative z-30 inline-block text-left">
      <Menu.Button className=" relative block cursor-pointer rounded-full bg-primary/10 p-2 duration-300 hover:bg-primary/20 hover:text-primary dark:bg-primary/40 dark:hover:bg-primary/60">
        <SunIcon
          className="h-5 w-5 rotate-0
        scale-100 fill-yellow-500 text-yellow-500 transition-all dark:hidden dark:-rotate-90"
        />
        <MoonIcon
          className=" hidden h-5 w-5
        
        rotate-90 fill-yellow-500 text-yellow-400 transition-all dark:block dark:rotate-0"
        />
        <span className="sr-only">Toggle theme</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md
         bg-background
        shadow-lg ring-1 ring-black/5 focus:outline-none dark:ring-white/5"
        >
          <div className="px-1 py-1 ">
            <Menu.Item>
              {() => (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTheme('light');
                  }}
                  className="h-8 w-full justify-start pl-2"
                >
                  Light
                </Button>
              )}
            </Menu.Item>

            <Menu.Item>
              {() => (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTheme('dark');
                  }}
                  className="h-8 w-full justify-start pl-2"
                >
                  Dark
                </Button>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTheme('system');
                  }}
                  className="h-8 w-full justify-start pl-2"
                >
                  System
                </Button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ModeToggle;
