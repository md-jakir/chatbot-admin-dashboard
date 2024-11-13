import Sidebar from '@/components/Sidebar';
import { toggleSidebar } from '@/redux/features/sidebar/sidebarConfigSlice';
import { RootState } from '@/redux/store';

import React, { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardNav from '@/components/headers/DashboardNav';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const sidebarConfig = useSelector((state: RootState) => state.sidebar);

  const { isSidebarOpen } = sidebarConfig;

  return (
    <div className={` h-full  ${isSidebarOpen && 'overflow-hidden'}`}>
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="flex w-full flex-1 flex-col ">
        <DashboardNav toggleSidebar={() => dispatch(toggleSidebar())} />
        <main className=" min-h-full  lg:ml-64">
          <div className="container mx-auto mt-4 px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
