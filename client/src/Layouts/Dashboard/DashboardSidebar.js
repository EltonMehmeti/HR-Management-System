import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import logo from "../../Image/logo (1).png"

export default function SideBar() {
  return (
   
    <Sidebar aria-label="Sidebar with multi-level dropdown example" className="bg-sky-800">
     
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Sidebar.Item>
        <img src={logo} alt="Logo" className="w-10 h-15 mx-auto my-4" /> {/* Adjust the class to fit your styling */}
      </Sidebar.Item>
          <Sidebar.Item href="#" className="text-white" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} className="text-white" label="EMployees">
            <Sidebar.Item href="dashboard/employee" className="mr-auto font-normal text-white">Employees</Sidebar.Item>
            <Sidebar.Item href="#" className="text-white">Sales</Sidebar.Item>
            <Sidebar.Item href="#" className="text-white">Refunds</Sidebar.Item>
            <Sidebar.Item href="#" className="text-white">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiInbox} className="text-white">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser} className="text-white">
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag} className="text-white">
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight} className="text-white">
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable} className="text-white">
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  );
}

