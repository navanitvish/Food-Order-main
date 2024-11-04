// import { FiEye, FiRotateCcw } from "react-icons/fi";

// import { useState } from "react";

// import {
//   initialUserData,
//   listHeading,
// } from "../components/content_data/content_data";
// import { useQuery } from "@tanstack/react-query";
// import { ApiError, ApiGetResponse } from "../types/apiType";
// import {
//   UserData,
//   UserProfileType,
//   UserResponseData,
// } from "../types/contentType";

// import UserProfile from "./UserProfile";
// import Pagination from "../components/pagination/Pagination";
// import { apiGetRequest } from "../api/adminGetApi";
// import UserForm from "../forms/UserForm";

// import { IoIosSend } from "react-icons/io";
// import { FaCaretDown } from "react-icons/fa";

// const DashBoard: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const [isOpen, setOpen] = useState({
//     role: false,
//   });
//   const [role, setRole] = useState<string>("all");

//   const [userDetail, setUserDetails] = useState({
//     isCreate: false,
//     updateId: "",
//     updateData: {
//       name: "",
//       email: "",
//       role: "",
//     },
//   });

//   const [isUserProfile, setUserProfile] = useState<UserProfileType>({
//     isOpen: false,
//     userProfile: initialUserData,
//   });

//   const handleSelectChange = (value: string) => {
//     setRole(value);
//     setOpen((prev) => ({
//       ...prev,
//       role: false,
//     }));
//   };

//   const { isPending, isError, data, error, refetch } = useQuery<
//     ApiGetResponse<UserResponseData>,
//     ApiError
//   >({
//     queryKey: [`users/${role}/${currentPage}`],
//     queryFn: async () => {
//       return await apiGetRequest<UserResponseData>({
//         url: `/user/pag?role=${role}&page=${currentPage}&limit=${10}`,
//       });
//     },
//   });

//   const currentUsers = data?.data?.data;
//   const pagination = data?.data?.pagination;

//   console.log(data?.data?.data, data, error, "dashbaord>>?");

//   if (isError) {
//     return <span>Error: {error.message}</span>;
//   }

//   const handlingNavigate = (userData: UserData) => {
//     setUserProfile((prev) => ({
//       ...prev,
//       isOpen: !prev.isOpen,
//       userProfile: userData,
//     }));
//   };

//   const userDataByApi = data?.data?.data;

//   // const itemsPerPage = 10;
//   // //calculation of page
//   // const indexOfLastItem = currentPage * itemsPerPage;
//   // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   // const currentUsers = userDataByApi?.slice(indexOfFirstItem, indexOfLastItem);

//   const handleClick = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   console.log(userDataByApi);

//   const creathandler = () => {
//     setUserDetails((prev) => ({
//       ...prev,
//       isCreate: true,
//     }));
//   };

//   const updatehandler = (userData: UserData) => {
//     setUserDetails((prev) => ({
//       ...prev,

//       updateId: userData._id,
//       updateData: {
//         name: userData.name,
//         email: userData.email,
//         role: userData.role,
//       },
//     }));
//   };

//   console.log(userDetail, "related to updateorcreat");

//   return (
//     <>
//       {isUserProfile?.isOpen && (
//         <UserProfile
//           setUserProfile={setUserProfile}
//           isUserProfile={isUserProfile}
//         />
//       )}
//       {(userDetail?.isCreate || userDetail?.updateId) && (
//         <UserForm
//           isUserForm={userDetail}
//           refetch={refetch}
//           // closeHandler={closeHandler}
//           setUserDetails={setUserDetails}
//         />
//       )}
//       <section
//         className={`  md:pl-0 p-4 h-full  rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
//       >
//         <section
//           className={` md:p-8 p-6

//            bg-white text-gray-600 border-gray-200
//         rounded-md  font-philosopher max-w-full w-full h-full shadow-md`}
//         >
//           <div className="flex items-center mb-2 md:mb-6">
//             <h1 className=" text-[28px] font-bold md:text-4xl ">Users</h1>
//           </div>
//           <div className="flex justify-between mb-4">
//             <div className={`flex items-center gap-4`}>
//               <input
//                 type="search"
//                 placeholder={` Search
//               `}
//                 className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent
//                bg-slate-50 focus:border-gray-100
//             shadow-inner rounded-[0.26rem] outline-none `}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onFocus={() => setCurrentPage(1)}
//               />
//               <div className="relative">
//                 <div
//                   className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
//                   onClick={() => setOpen({ ...isOpen, role: !isOpen.role })}
//                 >
//                   {role !== "" ? role : "Select Role"}
//                   <FaCaretDown className="m-1" />
//                 </div>
//                 <ul
//                   className={`mt-2 p-2 rounded-md overflow-y-auto w-28 bg-gray-600 shadow-lg absolute z-10 ${
//                     isOpen.role ? "max-h-40" : "hidden"
//                   } custom-scrollbar`}
//                 >
//                   {["all", "user", "admin", "restaurent", "driver"].map(
//                     (userRole, i) => (
//                       <li
//                         key={i}
//                         className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
//                           role === userRole ? "bg-rose-600" : ""
//                         }`}
//                         onClick={() => handleSelectChange(userRole)}
//                       >
//                         <span>{userRole}</span>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//             </div>

//             <div className="relative flex items-center self-end ">
//               <button
//                 className={` px-2 py-1
//                    bg-blue-400  hover:bg-cyan-400 text-white
//               }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
//                 onClick={creathandler}
//               >
//                 <div>
//                   <span className="hidden md:inline-block">Creat User</span>

//                   <IoIosSend className="w-6 h-6 md:hidden" />
//                 </div>
//               </button>
//             </div>
//           </div>
//           <section
//             className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
//           >
//             <section className="grid grid-cols-customDashboard pb-2 p-2  gap-4  border-gray-100 min-w-[1200px] font-medium md:font-semibold bg-sky-100 ">
//               <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
//               {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

//               {listHeading?.map((heading, index) => (
//                 <p
//                   key={index}
//                   className={`  text-gray-600 md:text-lg ${
//                     index !== 0 ? "justify-self-center" : "ml-6"
//                   }`}
//                 >
//                   {heading.charAt(0).toUpperCase() + heading.slice(1)}
//                 </p>
//               ))}
//             </section>
//             <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] ">
//               {isPending ? (
//                 <p>Data fetching... </p>
//               ) : (
//                 currentUsers?.map((user, i) => (
//                   <section
//                     key={i}
//                     className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customDashboard group hover:bg-gray-50 "
//                   >
//                     <span>{i + 1}</span>

//                     <span className="flex flex-col ml-2 text-sm font-semibold text-gray-600 md:text-base">
//                       <span>{user.name}</span>
//                       <span className="text-xs font-semibold text-gray-600 break-words">
//                         {user.email.length > 23
//                           ? user.email.slice(0, 20) + "..."
//                           : user.email}
//                       </span>
//                     </span>
//                     {/* <div className="flex items-center justify-center">
//                     <img
//                       src={user.Profile ? user.Profile : login}
//                       alt="user Image"
//                       className="w-24 h-10 rounded-lg"
//                     />
//                   </div> */}
//                     <span className="ml-2 text-sm font-semibold rounded-full ">
//                       {user?.mobile}
//                     </span>
//                     <span className="ml-2 text-sm font-semibold rounded-full ">
//                       {user?.createdAt?.split("T")[0]}
//                     </span>
//                     <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
//                       {user?.address ? user?.address : "--"}
//                     </span>
//                     {/* <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
//                       {user?.gender ? user?.gender : "--"}
//                     </span> */}
//                     {/* <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
//                       {user?.location?.city ? user?.location?.city : "Mumbai"}
//                     </span>
//                     <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
//                       {user?.location?.state ? user?.location?.state : "--"}
//                     </span> */}
//                     {/* <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
//                       {user?.location?.country
//                         ? user?.location?.country
//                         : "India"}
//                     </span> */}
//                     <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
//                       {user?.role}
//                     </span>

//                     <div className="grid justify-center gap-2">
//                       <button
//                         className="px-2 py-2 text-sm text-white rounded-md bg-sky-400 hover:bg-sky-600"
//                         onClick={() => handlingNavigate(user)}
//                       >
//                         <FiEye className="w-6 h-4" />
//                       </button>
//                     </div>
//                     <div className="grid justify-center gap-2">
//                       <button
//                         className="px-2 py-2 text-sm text-white bg-green-400 rounded-md hover:bg-green-600"
//                         onClick={() => updatehandler(user)}
//                       >
//                         <FiRotateCcw className="w-6 h-4" />
//                       </button>
//                     </div>
//                   </section>
//                 ))
//               )}
//             </div>
//           </section>
//           <Pagination
//             currentPage={currentPage}
//             // apiData={userDataByApi ?? []}
//             // itemsPerPage={itemsPerPage}
//             handleClick={handleClick}
//             tabletotalPages={pagination?.totalPages ?? 0}
//             totalItems={pagination?.totalPages ?? 0}
//           />
//         </section>
//       </section>
//     </>
//   );
// };

// export default DashBoard;

import { FiEye, FiRotateCcw } from "react-icons/fi";

import {
  initialUserData,
  listHeading,
} from "../components/content_data/content_data";
import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse } from "../types/apiType";
import {
  UserData,
  UserProfileType,
  UserResponseData,
} from "../types/contentType";
import UserProfile from "./UserProfile";
import Pagination from "../components/pagination/Pagination";
import { apiGetRequest } from "../api/adminGetApi";
import UserForm from "../forms/UserForm";
import { IoIosSend } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";

const DashBoard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setOpen] = useState({
    role: false,
  });
  const [role, setRole] = useState<string>("all");
  const [userDetail, setUserDetails] = useState({
    isCreate: false,
    updateId: "",
    updateData: {
      name: "",
      email: "",
      role: "",
    },
  });
  const [isUserProfile, setUserProfile] = useState<UserProfileType>({
    isOpen: false,
    userProfile: initialUserData,
  });

  const handleSelectChange = (value: string) => {
    setRole(value);
    setOpen((prev) => ({
      ...prev,
      role: false,
    }));
  };

  const { isPending, isError, data, error, refetch } = useQuery<
    ApiGetResponse<UserResponseData>,
    ApiError
  >({
    queryKey: [`users/${role}/${currentPage}`],
    queryFn: async () => {
      return await apiGetRequest<UserResponseData>({
        url: `/user/pag?role=${role}&page=${currentPage}&limit=${10}`,
      });
    },
  });

  const currentUsers = data?.data?.data;
  const pagination = data?.data?.pagination;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handlingNavigate = (userData: UserData) => {
    setUserProfile((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      userProfile: userData,
    }));
  };

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const creathandler = () => {
    setUserDetails((prev) => ({
      ...prev,
      isCreate: true,
    }));
  };

  const updatehandler = (userData: UserData) => {
    setUserDetails((prev) => ({
      ...prev,
      updateId: userData._id,
      updateData: {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    }));
  };

  return (
    <>
      {isUserProfile?.isOpen && (
        <UserProfile
          setUserProfile={setUserProfile}
          isUserProfile={isUserProfile}
        />
      )}
      {(userDetail?.isCreate || userDetail?.updateId) && (
        <UserForm
          isUserForm={userDetail}
          refetch={refetch}
          setUserDetails={setUserDetails}
        />
      )}
      <div className="min-h-screen p-4 bg-gray-50">
        <div className="mx-auto bg-white rounded-lg shadow-lg max-w-7xl">
          {/* Header Section */}
          <div className="p-6 border-b">
            <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          </div>

          {/* Controls Section */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="search"
                  placeholder="Search users..."
                  className="p-3 border rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Role Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 p-3 bg-white border rounded-lg hover:bg-gray-50"
                    onClick={() => setOpen({ ...isOpen, role: !isOpen.role })}
                  >
                    <span className="min-w-[100px]">
                      {role !== "" ? role : "Select Role"}
                    </span>
                    <FaCaretDown
                      className={`transition-transform ${
                        isOpen.role ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen.role && (
                    <ul className="absolute z-50 w-full mt-2 bg-white border rounded-lg shadow-lg">
                      {["all", "user", "admin", "restaurent", "driver"].map(
                        (userRole) => (
                          <li
                            key={userRole}
                            className="px-2 py-2 capitalize cursor-pointer hover:bg-gray-50"
                            onClick={() => handleSelectChange(userRole)}
                          >
                            {userRole}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>

              <button
                onClick={creathandler}
                className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <span className="hidden md:inline">Create User</span>
                <IoIosSend className="w-5 h-5 md:hidden" />
              </button>
            </div>
          </div>

          {/* List Header */}
          <div className="p-4 shadow-xl ">
            <div className="grid gap-4 font-semibold text-gray-600 grid-cols-customDashboard">
              <div className="pl-2">SR.No</div>
              {listHeading?.map((heading, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? "text-center" : "pl-6"
                  } capitalize`}
                >
                  {heading}
                </div>
              ))}
            </div>
          </div>

          {/* List Content */}
          <div className="divide-y">
            {isPending ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : (
              currentUsers?.map((user, i) => (
                <div
                  key={user._id}
                  className={`grid grid-cols-customDashboard gap-4 p-4 items-center hover:bg-gray-50 transition-colors ${
                    i % 2 === 0 ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  {/* Number */}
                  <div
                    className={`pl-2 font-semibold ${
                      i % 2 === 0 ? "text-blue-600" : "text-red-600"
                    }`}
                  >
                    {i + 1}
                  </div>

                  {/* User Info */}
                  <div className="pl-6 space-y-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      {user.email.length > 23
                        ? user.email.slice(0, 20) + "..."
                        : user.email}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="text-center">{user?.mobile || "--"}</div>

                  {/* Date */}
                  <div className="text-center">
                    {user?.createdAt?.split("T")[0] || "--"}
                  </div>

                  {/* Address */}
                  <div className="text-center">{user?.address || "--"}</div>

                  {/* Role */}
                  <div className="text-center">
                    <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                      {user?.role}
                    </span>
                  </div>

                  {/* View Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handlingNavigate(user)}
                      className="p-2 px-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-400"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Edit Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => updatehandler(user)}
                      className="p-2 px-3 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-400"
                    >
                      <FiRotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="p-4 border-t">
            <Pagination
              currentPage={currentPage}
              handleClick={handleClick}
              tabletotalPages={pagination?.totalPages ?? 0}
              totalItems={pagination?.totalPages ?? 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
