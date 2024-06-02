import React from 'react';
import RoleBasedComponent from '../../../helper/RoleBasedComponent';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <RoleBasedComponent roles={['admin', 'data_manager']}>
        <div>Admin and Data Manager specific content</div>
      </RoleBasedComponent>
      <RoleBasedComponent roles={['employee']}>
        <div>Employee specific content</div>
      </RoleBasedComponent>
      <RoleBasedComponent roles={['recruiter']}>
    
      <div
            class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
        >
            <div class="w-96 rounded-xl bg-white p-8" id="widget">
                <h6 class="text-xs text-gray-400">Total earnings</h6>
                <div class="mt-2 flex text-xl font-semibold">
                    <span>$27,956</span
                    ><span class="ml-2 flex items-center text-xs text-green"
                        >31%
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                            ></path></svg
                    ></span>
                </div>
                <div class="mt-8 flex space-x-2">
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            10
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-10 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Jan</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            12
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-8 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Feb</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            20
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-20 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Mar</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            16
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-16 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Apr</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            8
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-8 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">May</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            12
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-12 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Jun</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            8
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-8 w-12 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Jul</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            16
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-16 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Aug</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            12
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-12 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Sep</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            6
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-6 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Oct</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden rounded-full bg-black px-2 py-1 text-xs text-white group-hover:block"
                        >
                            16
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-16 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Nov</div>
                    </div>
                    <div
                        class="group relative flex flex-col items-center space-y-2"
                    >
                        <div
                            class="absolute top-2 hidden transform rounded-full bg-black px-2 py-1 text-xs text-white duration-200 group-hover:block"
                        >
                            12
                        </div>
                        <div
                            class="flex h-32 w-3 items-end rounded-full bg-slate-200 group-hover:cursor-pointer"
                        >
                            <div class="h-12 w-3 rounded-full bg-blue"></div>
                        </div>
                        <div class="text-xs text-gray-500">Dec</div>
                    </div>
                </div>
            </div>
        </div>
    
      </RoleBasedComponent>

      <RoleBasedComponent roles={['data_manager']}>
        <div>Data specific content</div>
      </RoleBasedComponent>


    </div>
  );
};

export default Dashboard;
