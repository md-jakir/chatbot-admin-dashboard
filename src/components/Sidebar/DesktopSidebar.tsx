import React from 'react';
import SidebarContent from './SidebarContent';

function DesktopSidebar() {
  return (
    <aside className="z-30 hidden h-screen w-64 flex-shrink-0 overflow-y-auto shadow-sm lg:block">
      <SidebarContent />
    </aside>
  );
}

export default DesktopSidebar;
