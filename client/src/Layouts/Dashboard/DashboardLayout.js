import React from 'react';
import DashboardView from './DashboardView';
import { Outlet } from 'react-router-dom';
import Sidebar from './DashboardSidebar';

function DashboardLayout() {
    return (
        <div className='bg-[#e9e9eb] relative min-h-screen flex flex-col md:flex-row'>
            {/* Sidebar */}
            <Sidebar />
            {/* Main content */}
            <div className="flex-grow flex flex-col">
                <DashboardView/>
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;
