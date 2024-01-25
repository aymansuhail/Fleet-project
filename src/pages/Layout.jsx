import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Banner from '../partials/Banner';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} className="sticky top-0 bg-white z-10" />

        <div className="flex-1 overflow-auto p-4">
          {/* Main content */}
          <main>
            {/* Your main content goes here */}
            <Outlet />
          </main>

          {/* Banner */}
          <Banner />
        </div>
      </div>
    </div>
  );
}

export default Layout;
