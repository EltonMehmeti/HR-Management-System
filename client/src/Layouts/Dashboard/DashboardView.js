import React from 'react';
import { useUser } from '../../helper/UserContext';
//import { useStateContext } from '../../../contexts/ContextProvider';

export default function DashboardView() {
const {user} = useUser();
  return (
    <div className="flex items-center justify-end bg-[#F9F5F6] h-[70px] shadow-lg px-[25px]">
      <div className="flex items-center gap-[15px] relative">
        <div className="flex items-center gap-[25px] border-r-[3px] pr-[25px]"></div>
        <div className="flex items-center gap-[10px] relative">
          <div className="rounded-full bg-green-500 h-3 w-3 animate-pulse"></div>
          <p>{user?.name}</p>
        </div>
      </div>
    </div>
    
  );
}