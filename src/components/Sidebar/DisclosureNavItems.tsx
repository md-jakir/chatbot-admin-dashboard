import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import NavItem from './NavItem';

export default function DisclosureNavItems({
  name,
  Icon,
  child,
}: {
  name: string;
  Icon: React.ComponentType<{ className: string }>;
  child: Array<{
    name: string;
    icon: React.ElementType;
    path: string;
  }>;
}) {
  return (
    <div className="mx-auto w-full max-w-md bg-inherit ">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg px-2 py-2 text-left text-sm font-medium  focus:outline-none focus-visible:ring ">
              <span
                className={`middle none center flex 
      w-full items-center gap-4 rounded-md font-sans font-bold capitalize ${
        open
          ? ' text-white dark:bg-[#1A1C23] dark:text-white'
          : 'bg-[#0D0E12] text-slate-400 dark:bg-[#1A1C23] dark:text-slate-400'
      } transition-all hover:text-gray-50  active:opacity-[0.85] 
      disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              >
                <Icon
                  className={` h-5 w-5 ${open ? 'text-indigo-400' : ''} `}
                />
                <p
                  className={`my-1 text-base font-semibold leading-3 ${
                    open ? 'text-indigo-400' : 'dark:text-slate-50'
                  } `}
                >
                  {name}
                </p>
              </span>
              <ChevronDownIcon
                className={`${
                  open
                    ? '-rotate-180 transform text-indigo-400'
                    : ' text-slate-400'
                } h-5 w-5 transition-transform duration-500 ease-in-out`}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Transition
            // enter="transition duration-500 ease-out"
            // enterFrom="transform -translate-y-10 opacity-0"
            // enterTo="transform translate-y-0 opacity-100"
            // leave="transition duration-500 ease-out"
            // leaveFrom="transform translate-y-0 opacity-100"
            // leaveTo="transform -translate-y-10 opacity-0"
            >
              <Disclosure.Panel className="px-6 text-sm text-gray-500">
                {child?.map((item, index: number) => (
                  <NavItem
                    key={`${index + 1}`}
                    Inco={item.icon}
                    name={item.name}
                    href={item.path}
                  />
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
