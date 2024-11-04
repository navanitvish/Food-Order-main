import React, { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/food_admin_logo_header.png";
import { FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router";
import { HeaderProps } from "../../types/contentType";
import { MdOutlineNotifications } from "react-icons/md";

const Header: React.FC<HeaderProps> = ({ onToggleSidebarSmall, isOpen }) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showReports, setShowReports] = useState<boolean>(false);
  const [showDelivery, setShowDelivery] = useState<boolean>(false);

  const navigate = useNavigate();

  const profilePannelHandler = () => {
    setShowProfile((prev) => !prev);
    setShowReports(false);
    setShowDelivery(false);
  };

  const reportsHandler = () => {
    setShowReports((prev) => !prev);
    setShowProfile(false);
    setShowDelivery(false);
  };

  const deliveryHandler = () => {
    setShowDelivery((prev) => !prev);
    setShowProfile(false);
    setShowReports(false);
  };

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const handleUpdatePassword = () => {
    console.log("Update password");
    navigate("/login/update-password");
  };

  return (
    <header
      className={`fixed top-0 flex items-center justify-between w-full ${
        !isOpen.large ? "md:w-[calc(100%-15.4rem)]" : "md:w-[calc(100%-5.4rem)]"
      } h-20 pt-4 text-white bg-gray-200`}
    >
      <div className="grid w-full h-full grid-cols-2 mx-4 text-black bg-white rounded-md md:grid-cols-1 md:mr-6 md:mx-0">
        <div className="flex items-center h-full gap-4 px-2 md:hidden">
          <button onClick={onToggleSidebarSmall}>
            {!isOpen.small ? (
              <RxHamburgerMenu className="w-6 h-6 text-gray-500" />
            ) : (
              <RxCross1 className="w-6 h-6 text-gray-500" />
            )}
          </button>
          <img
            src={logo}
            alt="Logo"
            className={`w-24 ${isOpen.large ? "hidden" : ""}`}
          />
        </div>

        <div className="md:w-[20%] items-center justify-self-end flex gap-6 justify-end mr-4 relative">
          {/* Reports Dropdown */}
          <div className="relative ">
            <button
              className={`font-bold bg-gray-100 px-4 py-2 ${
                showReports
                  ? "text-sky-500 hover:text-sky-600"
                  : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={reportsHandler}
            >
              Reports
            </button>
            {showReports && (
              <div className="absolute z-50 w-full bg-gray-100 rounded-lg shadow-lg -right-4 top-10">
                <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 border-b border-gray-200 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/customerperformance")}
                >
                  Customer Performance
                </button>
                <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 border-b border-gray-200 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/orderpaymentreport")}
                >
                  Order Payment Report
                </button>
                <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/storeperformancereport")}
                >
                  Store Performance Report
                </button>
                <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/storewisereport")}
                >
                  StoreWisereport
                </button>
              </div>
            )}
          </div>

          {/* Delivery Dropdown */}
          <div className="relative">
            <button
              className={`font-bold ${
                showDelivery
                  ? "text-sky-500 hover:text-sky-600"
                  : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={deliveryHandler}
            >
              Transaction
            </button>
            {showDelivery && (
              <div className="absolute z-50 bg-gray-100 rounded-lg shadow-lg -right-4 top-10">
                <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 border-b border-gray-200 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/transaction")}
                >
                  Transaction
                </button>
                {/* <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 border-b border-gray-200 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/DeliveryCollection")}
                >
                  Dilivery Collection
                </button> */}
                <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 border-b border-gray-200 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/MostSoldItems")}
                >
                  Most Sold Items
                </button>
                {/* <button
                  className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 md:px-0 hover:text-gray-600"
                  onClick={() => navigate("/ordermanagement")}
                >
                  Order Management
                </button> */}
              </div>
            )}
          </div>

          <MdOutlineNotifications className="text-gray-500 w-7 h-7" />

          <FaUserCog
            className={`cursor-pointer w-7 h-7 ${
              showProfile
                ? "text-sky-500 hover:text-sky-600"
                : "text-gray-500 hover:text-gray-600"
            }`}
            onClick={profilePannelHandler}
          />
          {showProfile && (
            <div className="absolute z-50 bg-gray-100 rounded-lg shadow-lg -right-4 top-10">
              <button
                className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 border-b border-gray-200 md:px-0 hover:text-gray-600"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="w-full px-6 pt-2 pb-2 text-sm font-bold text-gray-400 md:px-0 hover:text-gray-600"
                onClick={handleUpdatePassword}
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
