import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { setUserToken } from "../store/auth";
// import { useDispatch } from "react-redux";
// import { ToastContainer } from "react-toastify";

import SideBar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";
import { ToastContainer } from "react-toastify";

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState({
    large: false,
    small: false,
  });

  const navigate = useNavigate();

  // console.log(userRole, "from layout");

  const toggleSidebarLarge = () => {
    setSidebarOpen((prev) => ({
      ...prev,
      large: !prev.large,
    }));
  };
  const toggleSidebarSmall = () => {
    setSidebarOpen((prev) => ({
      ...prev,
      small: !prev.small,
    }));
  };

  useEffect(() => {
    //token getting from localStorage

    if (location.pathname === "/") navigate("/users");
  }, [navigate]);

  return (
    <>
      <main className={`relative flex   min-h-screen bg-gray-200`}>
        <ToastContainer />

        <SideBar
          isOpen={isSidebarOpen}
          onToggleSidebarLarge={toggleSidebarLarge}
          onToggleSidebarSmall={toggleSidebarSmall}
        />
        <div className="relative flex-1 overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          <Header
            onToggleSidebarSmall={toggleSidebarSmall}
            isOpen={isSidebarOpen}
          />
          <div className=" mt-16  h-[calc(100vh-4rem)] ">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
