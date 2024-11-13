import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleSidebar } from '@/redux/features/sidebar/sidebarConfigSlice';
import SidebarContent from './SidebarContent';

function MobileSidebar() {
  const dispatch = useDispatch();
  const sidebarConfig = useSelector((state: RootState) => state.sidebar);
  const { isSidebarOpen } = sidebarConfig;

  return (
    <Transition show={isSidebarOpen} as={Fragment}>
      <Dialog
        unmount={false}
        onClose={() => dispatch(toggleSidebar())}
        className="fixed inset-y-0 right-0 z-50 w-screen overflow-y-auto"
      >
        <div className=" flex h-screen w-64  ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 "
            enterTo="opacity-50 "
            leave="ease-in duration-300"
            leaveFrom="opacity-50 "
            leaveTo="opacity-0 "
          >
            <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900 opacity-45" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className="fixed left-0 z-40 flex h-screen w-64 flex-col overflow-hidden 
              bg-background text-left
                    align-middle shadow-xl "
            >
              <SidebarContent />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default MobileSidebar;
