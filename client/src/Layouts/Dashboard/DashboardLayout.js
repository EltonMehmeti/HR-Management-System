import React from 'react'
import DashboardView from './DashboardView';
import { Outlet } from 'react-router-dom';
import SideBar from './DashboardSidebar';



export default function DashboardLayout() {
    return (
        <div className='bg-blue-100 relative max-w-screen-2xl flex flex-col min-h-screen'>
       
        
        {/* Content */}
        <div className="flex flex-grow">
          {/* Sidebar */}
          <SideBar />
          
          {/* Main content */}
          <div className="flex-grow">
            <DashboardView/>
            <Outlet />
          </div>
        </div>
    
        
      </div>
    
      )
}
