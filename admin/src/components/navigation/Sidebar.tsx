// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import {
  MdDeliveryDining,
  // MdFastfood,
  MdOutlineCategory,
  // MdOutlineFoodBank,
  MdOutlineReviews,
} from "react-icons/md";

import logo from "../../assets/food_admin_logo.png";

import { LuUsers2 } from "react-icons/lu";
import { BiDish } from "react-icons/bi";
import {
  // RiArrowDropDownLine,
  RiCoupon3Line,
  RiRestaurantLine,
} from "react-icons/ri";

import { FaCartFlatbed } from "react-icons/fa6";
import { PiFlagBannerBold } from "react-icons/pi";

import { SideBarPropsType } from "../../types/contentType";

import { GrRestaurant } from "react-icons/gr";
import { useUserDetails } from "../../api/query";

const SideBar: React.FC<SideBarPropsType> = ({
  isOpen,
  onToggleSidebarLarge,
  onToggleSidebarSmall,
}) => {
  // const [isCategory, setSidebarOpen] = useState(false);

  // const handlingCategory = () => {
  //   setSidebarOpen((prev) => !prev);
  // };

  // const { isPending, isError, data } = useCategories();

  const {
    data: userData,
    // isError: userIsError,
    // isPending: userIsPending,
  } = useUserDetails();

  const userAllData = userData?.data?.data;

  console.log(userAllData, "userData");

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  // const categoryDataByApi = data?.data?.data;

  return (
    <section
      className={` h-screen  ${
        isOpen.small
          ? "fixed inset-0 bg-black/40 flex  z-30 "
          : ` md:inline-block hidden p-4 transition-all duration-500 ${
              isOpen.large ? "w-24" : "w-64"
            }`
      }  transition-all duration-500   `}
    >
      <section
        className={`
    cursor-pointer h-screen bg-white shadow-md  overflow-clip rounded-md  ${
      isOpen.small ? "w-full sm:w-64" : ""
    }`}
      >
        <div
          className={` ${
            isOpen.large ? "text-center" : ""
          }  w-full gap-2 px-3 pt-6 `}
        >
          <button
            onClick={onToggleSidebarLarge}
            className={`${isOpen.small ? "hidden" : ""}`}
          >
            {!isOpen.large ? (
              <RxCross1 className="w-4 h-4 text-gray-400" />
            ) : (
              <RxHamburgerMenu className="w-6 h-6 text-gray-400" />
            )}
          </button>
          {/* <div className={`w-full ml-12 ${isOpen.large ? "hidden" : ""}`}> */}
          <div
            className={`w-full flex justify-center  ${
              isOpen.large ? "hidden" : ""
            }`}
          >
            <img
              src={logo}
              alt="Logo"
              className={`w-32 ${isOpen.large ? "hidden" : ""}`}
            />

            {/* <p className="flex items-center text-2xl font-semibold text-gray-600">
              Adiy<span className="text-orange-300">a</span>{" "}
              <MdFastfood className="text-orange-400" />{" "}
              <span className="text-orange-500">F</span>ood
            </p> */}
          </div>
        </div>

        {userAllData?.role === "admin" ? (
          <div
            className={`w-full h-[calc(100vh-6rem)] mt-2 ${
              isOpen ? "p-2 pt-4" : "p-4 "
            }  overflow-y-auto  [&::-webkit-scrollbar]:hidden`}
          >

<NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <LuUsers2 className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Dashboard
              </span>
            </NavLink>

            <NavLink
              to={"/users"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <LuUsers2 className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Users
              </span>
            </NavLink>

            <NavLink
              to={"/resturant_category"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                      ${
                        isOpen.large
                          ? "m-0 p-1 justify-center"
                          : "m-1 p-2 w-[95%]"
                      } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <MdOutlineCategory className="w-6 h-6" />
              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Rest_Category
              </span>
            </NavLink>
            <NavLink
              to={"/restaurants"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <RiRestaurantLine className="w-6 h-7" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Restaurants
              </span>
            </NavLink>
            {/* <NavLink
              to={"/category"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                      ${
                        isOpen.large
                          ? "m-0 p-1 justify-center"
                          : "m-1 p-2 w-[95%]"
                      } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
              // onClick={handlingCategory}
            >
              <MdOutlineCategory className="w-6 h-6" />
              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Category
              </span>

              
            </NavLink> */}
            <NavLink
              to={"/dishes"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <BiDish className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                {/* Dishes */}
                Items
              </span>
            </NavLink>
            {/* {isCategory && (
                <div
                  className={` relative group rounded-md  font-medium   
                ${isOpen.large ? "m-0 p-1 justify-center" : " pl-4"}   
          `}
                >
                  {isError ? (
                    <p>Check internet</p>
                  ) : isPending ? (
                    <p>Loading Please Wait...</p>
                  ) : (
                    (categoryDataByApi ?? [])?.map((category, index) => (
                      <NavLink
                        key={index}
                        // to={`/category/${category?.name.split(" ").join("")}`}
                        to={`/category/${category._id}`}
                        className={({ isActive }) =>
                          `relative group rounded-md flex font-medium items-center ${
                            isOpen.large ? "m-0 p-1 justify-center" : "m-1 p-2"
                          } h-[2.7rem] ${
                            isActive
                              ? "text-sky-400 font-semibold"
                              : "hover:bg-sky-200 hover:text-black text-gray-400"
                          }`
                        }
                      >
                        <MdOutlineFoodBank className="w-6 h-6" />
                        <span
                          className={`mx-1 p-1 text-[15px] font-montserrat ${
                            isOpen.large ? "hidden" : ""
                          }`}
                        >
                          {category?.name}
                        </span>
                      </NavLink>
                    ))
                  )}
                </div>
              )} */}
            {/* </div> */}

            <NavLink
              to={"/resturants_owner"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <GrRestaurant className="w-6 h-7" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Restaurant Owner
              </span>
            </NavLink>
            <NavLink
              to={"/orders"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <FaCartFlatbed className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                order
              </span>
            </NavLink>

            {/* <NavLink
              to={"/transaction"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <FaCartFlatbed className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Transactions
              </span>
            </NavLink> */}
            <NavLink
              to={"/driver"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <MdDeliveryDining className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Drivers
              </span>
            </NavLink>

            <NavLink
              to={"/settlements"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <RiCoupon3Line className="w-6 h-7" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Settlement
              </span>
            </NavLink>

            <NavLink
              to={"/review"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <MdOutlineReviews className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Review
              </span>
            </NavLink>
            <NavLink
              to={"/banner"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <PiFlagBannerBold className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Banner
              </span>
            </NavLink>

            
            <NavLink
              to={"/coupons"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <RiCoupon3Line className="w-6 h-7" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Coupons
              </span>
            </NavLink>

            
          </div>
        ) : userAllData?.role === "restaurent" ? (
          <div
            className={`w-full h-[calc(100vh-6rem)] mt-2 ${
              isOpen ? "p-2 pt-4" : "p-4 "
            }  overflow-y-auto  [&::-webkit-scrollbar]:hidden`}
          >
            {/* <NavLink
              to={"/dishes"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <BiDish className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Dishes
              </span>
            </NavLink> */}

            <NavLink
              to={"/restaurants_owner"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <RiRestaurantLine className="w-6 h-7" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Restaurants
              </span>
            </NavLink>
            <NavLink
              to={"/orders_owner"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <FaCartFlatbed className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Orders
              </span>
            </NavLink>
            <NavLink
              to={"/coupons_owner"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <RiCoupon3Line className="w-6 h-7" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Coupons
              </span>
            </NavLink>


            <NavLink
              to={"/SattelmentOwnner"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <RiCoupon3Line className="w-6 h-7" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Settlement
              </span>
            </NavLink>

          </div>
        ) : (
          <div
            className={`w-full h-[calc(100vh-6rem)] mt-2 ${
              isOpen ? "p-2 pt-4" : "p-4 "
            }  overflow-y-auto  [&::-webkit-scrollbar]:hidden`}
          >
            <NavLink
              to={"/orders_driver"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <FaCartFlatbed className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Orders
              </span>
            </NavLink>
            <NavLink
              to={"/driver"}
              className={({ isActive }) =>
                ` relative group rounded-md flex font-medium items-center
                    ${
                      isOpen.large
                        ? "m-0 p-1 justify-center"
                        : "m-1 p-2 w-[95%]"
                    } h-[2.7rem]   ${
                  isActive
                    ? "bg-sky-400 text-white font-semibold"
                    : "hover:bg-sky-200 hover:text-black text-gray-400"
                }`
              }
            >
              <MdDeliveryDining className="w-6 h-6" />

              <span
                className={`mx-1 p-1  text-[15px] font-montserrat ${
                  isOpen.large ? "hidden" : ""
                } `}
              >
                Driver
              </span>
            </NavLink>
          </div>
        )}
      </section>
      <button
        onClick={onToggleSidebarSmall}
        className={`absolute top-6 right-4 ${isOpen.small ? "" : "hidden"}`}
      >
        <RxCross1 className="w-6 h-6 " />
      </button>
    </section>
  );
};

export default SideBar;
