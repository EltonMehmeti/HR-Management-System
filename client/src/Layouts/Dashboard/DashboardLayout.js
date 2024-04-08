
import React from 'react';
import DashboardView from './DashboardView';
import { Outlet } from 'react-router-dom';
import Sidebar from './DashboardSidebar';

function DashboardLayout() {
    return (
        <div className='bg-blue-100 relative max-w-screen-2xl flex flex-col min-h-screen'>
            {/* Content */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar />
                {/* Main content */}
                <div className="flex flex-col flex-grow">
                    <DashboardView/>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
