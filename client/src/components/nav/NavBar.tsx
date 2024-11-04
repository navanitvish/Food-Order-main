import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Fudy.png";
import { MdClear, MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";

import { IoSearch } from "react-icons/io5";

import { RiShoppingCart2Line } from "react-icons/ri";
import { TbUserPlus, TbUserStar } from "react-icons/tb";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { useSelector } from "react-redux";
import { carItemtHelper } from "../../app-store/cart";
import Modal from "../modal/Modal";

interface NavBarProps {
  toggleSidebar: (value: string) => void;
  // userToken?: string | null;
}
const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const userToken = localStorage.getItem("userInfo");

  const [isSmallNav, setSmallNav] = useState<boolean>(false);
  const [isScroll, setScrollStyle] = useState<boolean>(false);

  const [isShowpanel, setShowPanel] = useState<boolean>(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);

  const items = useSelector(carItemtHelper);

  const navigate = useNavigate();

  const settingScrollStyle = () => {
    if (window.scrollY > 10) {
      setScrollStyle(true);
    } else {
      setScrollStyle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", settingScrollStyle);

    return () => document.removeEventListener("scroll", settingScrollStyle);
  }, []);

  console.log(userToken, "header");

  const showhandler = () => {
    setShowPanel((prev) => !prev);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("userInfo");
  };

  const handleLogout = (): void => {
    clearLocalStorage();
    setShowLogoutModal(false);
    setShowResponseModal(true);
    setTimeout(() => {
      setShowResponseModal(false);
    }, 3000); // Close the response modal after 3 seconds
  };

  return (
    <>
      {showLogoutModal && (
        <Modal>
          <div className="p-6 text-center bg-white rounded shadow-lg">
            <p className="mb-4 text-xl font-medium font-montserrat">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end w-full gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showResponseModal && (
        <Modal>
          <div className="p-6 text-center bg-white rounded shadow-lg">
            <p className="text-xl font-medium font-montserrat ">
              Congratulations! You have successfully logged out.
            </p>
          </div>
        </Modal>
      )}
      <header
        className={`fixed ${
          isScroll ? "bg-gray-50 text-gray-800" : ""
        } left-[50%] translate-x-[-50%] w-full   top-0 z-30 `}
      >
        <nav className="flex justify-center w-full h-10 px-4 mx-auto my-2 md:h-14">
          <div className="flex items-center justify-between w-full gap-4 ">
            <Link to={"/home"} className="flex items-center cursor-pointer ">
              <img
                className="w-10 h-10 md:w-12 md:h-12"
                src={logo}
                alt="company logo"
              />
            </Link>
            <div className="flex items-center justify-between w-fit">
              <ul
                className={`    ${
                  isSmallNav
                    ? `absolute top-14 left-0 inline-block md:flex md:justify-center lg:hidden  ${
                        isScroll ? "bg-gray-50" : " bg-white "
                      }    w-[100%] p-4 md:py-2 md:mt-2 pb-4   shadow-md rounded-br rounded-bl`
                    : "hidden"
                } font-medium text-[#112D32] transition-all ml-auto lg:flex `}
              >
                <li
                  className={`relative flex items-center justify-center rounded-md md:hidden focus-within:ring-1 focus-within:border-blue-500 ${
                    location.pathname === "/search" && "ring-1 border-blue-500"
                  }`}
                  onClick={() => {
                    navigate("/search");
                    setSmallNav(false);
                  }}
                >
                  <div className="absolute left-0 pl-2 text-gray-400 bg-gray-100 group-focus-within:text-black ">
                    <IoSearch className="w-4 h-4 " />
                  </div>
                  <div className="w-full  font-medium px-2 py-1 pl-[2rem] bg-gray-100 rounded-tl-md rounded-bl-md outline-none md:inline-block  rounded-tr-md rounded-br-md text-slate-400">
                    Search for resturant and food
                  </div>
                  {/* <input
                  type="text"
                  name="searchKey"
                  // value={searchKey}
                  // onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Search for resturant and food"
                  className=" w-full px-2 py-1 pl-[2rem] bg-gray-100 rounded-tl-md rounded-bl-md outline-none md:inline-block focus:border-blue-500 rounded-tr-md rounded-br-md placeholder:text-slate-400"
                  disabled
                /> */}
                </li>
                <li
                  className={`md:mr-6  border-b-2 border-transparent transition-all duration-300 md:hover:text-red-400  ${
                    isSmallNav
                      ? "p-2 pl-4 md:pl-0   rounded-lg md:text-black "
                      : ""
                  } `}
                >
                  <NavLink
                    to={"/home"}
                    className={({ isActive }) =>
                      isActive ? "text-[#8D1A6C] " : "border-transparent "
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li
                  className={`md:mr-6 md:hover:text-red-400  ${
                    isSmallNav
                      ? "p-2 pl-4 md:pl-0   rounded-lg md:text-black md:bg-transparent"
                      : ""
                  }`}
                >
                  <NavLink
                    to={"#"}
                    className={({ isActive }) =>
                      isActive ? "" : " border-b-2 border-transparent "
                    }
                  >
                    FAQs
                  </NavLink>
                </li>
              </ul>

              <div className="flex items-center gap-4">
                <div
                  className={`relative items-center justify-center hidden rounded-md md:flex cursor-pointer  ${
                    location.pathname === "/search" && "ring-1 border-blue-500"
                  } `}
                  onClick={() => navigate("/search")}
                >
                  <div className="absolute left-0 pl-2 text-gray-600 group-focus-within:text-black">
                    <IoSearch className="w-4 h-4 " />
                  </div>
                  <div className="w-12 px-2 py-3  bg-gray-200 rounded-tr-md rounded-br-md  pl-[2rem]  rounded-tl-md rounded-bl-md outline-none md:inline-block focus:border-blue-500  placeholder:text-slate-400"></div>
                </div>
                {/* <div className="relative items-center justify-center hidden rounded-md md:flex focus-within:ring-1 focus-within:border-blue-500">
                <div className="absolute left-0 pl-2 text-gray-400 bg-gray-100 group-focus-within:text-black ">
                  <IoSearch className="w-4 h-4 " />
                </div>
                <input
                  type="text"
                  name="searchKey"
                  // value={searchKey}
                  // onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Search user / chat"
                  className=" w-full px-2 py-1 pl-[2rem] bg-gray-100 rounded-tl-md rounded-bl-md outline-none md:inline-block focus:border-blue-500 rounded-tr-md rounded-br-md placeholder:text-slate-400"
                />
              </div> */}

                {/* <div className="grid items-center grid-cols-3 gap-4 font-semibold md:grid-cols-2 "> */}
                <div className="relative flex items-center gap-4 font-semibold">
                  {/* <div
                  className={`md:hover:text-red-400 text-[#112D32] ${
                    isSmallNav ? "p-2 pl-4 md:pl-0   rounded-lg " : ""
                  }`}
                >
                  <NavLink to={"#"}>Sign Up</NavLink>
                </div> */}
                  {/* <div className="flex items-center md:hover:text-red-400 text-[#112D32] justify-end relative">
                  <button
                    onClick={() => toggleSidebar("signUp")}
                    className="font-medium"
                  >
                    Sign Up
                  </button>
                </div>

                <div className="flex items-center md:hover:text-red-400 text-[#112D32] justify-end relative">
                  <button
                    onClick={() => toggleSidebar("login")}
                    className="font-medium"
                  >
                    Login
                  </button>
                </div> */}

                  {/* <div
                  className={`relative items-center justify-center rounded-md  md:hover:text-red-400 cursor-pointer ${
                    location.pathname === "/productcard"
                  } `}
                  onClick={() => navigate("/productcard")}
                >
                  <div className="absolute left-0 text-[#112D32] group-focus-within:text-black">
                    <p>Cart</p>
                  </div>
                  <div className="w-12 px-2 py-3 outline-none md:py-0 rounded-tr-md rounded-br-md rounded-tl-md rounded-bl-md md:inline-block focus:border-blue-500 placeholder:text-slate-400"></div>
                </div> */}
                  <div
                    className={`cursor-pointer relative text-[#112D32] md:hover:text-red-400 ${
                      isSmallNav
                        ? "p-2 pl-4 md:pl-0   rounded-lg md:text-black "
                        : ""
                    }`}
                  >
                    <NavLink
                      // to={{pathname:"/productcard",state:{from:location} }}
                      to={"/productcard"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#8D1A6C]"
                          : " border-b-2 border-transparent "
                      }
                      // onClick={navigateHandler}
                    >
                      <RiShoppingCart2Line className="w-6 h-6" />
                    </NavLink>
                    {items.length > 0 && (
                      <p className="absolute px-2 py-1 text-xs font-bold text-white bg-[#8D1A6C] rounded-full -bottom-4 -right-3">
                        {items.length}
                      </p>
                    )}
                  </div>
                  <div
                    className={`cursor-pointer  ${
                      isShowpanel ? "text-[#8D1A6C]" : "text-[#112D32]"
                    } md:hover:text-red-400  ${
                      isSmallNav
                        ? "p-2 pl-4 md:pl-0   rounded-lg md:text-black "
                        : ""
                    }`}
                    onClick={showhandler}
                  >
                    {/* <NavLink
                    // to={"/productcard"}
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-400"
                        : " border-b-2 border-transparent "
                    }
                  > */}
                    <TbUserStar className="w-6 h-6" />
                    {/* </NavLink> */}
                  </div>
                  {isShowpanel && (
                    <div className="absolute right-0 top-10">
                      <div
                        className={`${
                          userToken ? "w-[200px]" : "w-[200px]"
                        } h-full border rounded-md shadow-lg bg-gray-50 border-gray-50`}
                      >
                        {!(typeof userToken === "string") && (
                          <>
                            <div className="relative flex items-center justify-end px-4 pt-2 pb-2 border-b md:hover:text-red-400">
                              <button
                                onClick={() => toggleSidebar("signUp")}
                                className="flex items-center w-full font-medium text-[#112D32]"
                              >
                                <TbUserPlus className="w-5 h-5 mr-4" />
                                <span>Sign Up</span>
                              </button>
                            </div>

                            <div className="relative flex items-center justify-center px-4 pt-2 pb-2 md:hover:text-red-400">
                              <button
                                onClick={() => toggleSidebar("login")}
                                className="flex items-center w-full font-medium text-[#112D32]"
                              >
                                <BiLogInCircle className="w-5 h-5 mr-4" />
                                <span className="">Login</span>
                              </button>
                            </div>
                          </>
                        )}
                        {typeof userToken === "string" && (
                          <>
                            <div className="relative flex items-center justify-end px-4 pt-2 pb-2 border-b md:hover:text-red-400">
                              <Link
                                to={"update-password"}
                                className="flex items-center w-full font-medium text-[#112D32]"
                              >
                                <RxUpdate className="w-5 h-5 mr-4" />
                                <span className="">Update Password</span>
                              </Link>
                            </div>

                            <div className="relative flex items-center justify-center px-4 pt-2 pb-2 md:hover:text-red-400">
                              <button
                                onClick={() => setShowLogoutModal(true)}
                                // onClick={clearLocalStorage}
                                className="flex items-center w-full font-medium text-[#112D32]"
                              >
                                <BiLogOutCircle className="w-5 h-5 mr-4" />
                                <span className="">Log-out</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center cursor-pointer lg:hidden md:hover:text-sky-400">
                    <MdMenu
                      className={` ${
                        isSmallNav ? "hidden" : "inline-block w-6 h-6"
                      } lg:hidden`}
                      onClick={() => setSmallNav(true)}
                    />
                    <MdClear
                      className={` ${
                        isSmallNav ? "inline-block w-6 h-6" : "hidden"
                      } lg:hidden`}
                      onClick={() => setSmallNav(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
