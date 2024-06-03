import React from 'react';
import DashboardView from './DashboardView';
import { Outlet } from 'react-router-dom';
import Sidebar from './DashboardSidebar';

function DashboardLayout() {
    return (
        <div className='dashboard-layout flex bg-[#d9d9fb] min-h-screen '>
            {/* Sidebar */}

            <Sidebar />
            {/* Main content */}
            <div className="flex-grow flex flex-col bg-[#d9d9fb] h-auto overflow-y-auto">
                <DashboardView/>
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;
