// import { FiEye, FiRotateCcw } from "react-icons/fi";

import { useState } from "react";
import { initialUserData } from "../components/content_data/content_data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse, ApiResponse } from "../types/apiType";
import {
  UserData,
  UserProfileType,
  UserResponseData,
} from "../types/contentType";

import UserProfile from "./UserProfile";
import Pagination from "../components/pagination/Pagination";
import { apiGetRequest } from "../api/adminGetApi";
import UserForm from "../forms/UserForm";

// import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";
import { apiRequest } from "../api/userApi";

export interface RestaurantOwnerUserSendingData {
  isVerified: boolean;
  status: string;
}

export interface MutationObjectRestaurantOwnerUserType {
  path: string;

  data: RestaurantOwnerUserSendingData;
}

const ResturantOwner = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const resturantOwnerListHeading = [
    "Name",
    // "Email",
    // "MobileNo.",
    "R.Date",
    // "Address",
    // "City",
    // "State",
    // "Country",
    "Role",
    // "Exp",
    // "View",
    "Status",
    "Info",
  ];

  // const { isPending, isError, data, error, refetch } = useQuery<
  //   ApiGetResponse<UserResponseData>,
  //   ApiError
  // >({
  //   queryKey: ["resraurant/users"],
  //   queryFn: async () => {
  //     return await apiGetRequest<UserResponseData>({
  //       url: "/restaurantowner/res/all",
  //     });
  //   },
  // });
  const { isPending, isError, data, error, refetch } = useQuery<
    ApiGetResponse<UserResponseData>,
    ApiError
  >({
    queryKey: ["resraurant/users"],
    queryFn: async () => {
      return await apiGetRequest<UserResponseData>({
        url: `/restaurantowner/res/pag?page=${currentPage}&limit=${10}`,
      });
    },
  });

  console.log(data?.data?.data, error, "dashbaord>>?");

  const mutation = useMutation<
    ApiResponse<UserData>,
    ApiError,
    MutationObjectRestaurantOwnerUserType
  >({
    mutationFn: async ({ path, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          RestaurantOwnerUserSendingData,
          UserData
        >({
          url: path,
          method: "patch",
          data: data,
        });

        // return { data: response.data };
        return response;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },

    onSuccess: (data) => {
      console.log(data);
      refetch();
      toast.dismiss();

      toast.success(`Owner get ${data?.message} Successfull`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  const approveHandler = (id: string) => {
    mutation.mutate({
      path: `/restaurantowner/res/${id}`,
      data: {
        isVerified: true,
        status: "approved",
      },
    });
  };
  const rejecttHandler = (id: string) => {
    mutation.mutate({
      path: `/restaurantowner/res/${id}`,
      data: {
        isVerified: false,
        status: "rejected",
      },
    });
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  //   const handlingNavigate = (userData: UserData) => {
  //     setUserProfile((prev) => ({
  //       ...prev,
  //       isOpen: !prev.isOpen,
  //       userProfile: userData,
  //     }));
  //   };

  const currentUsers = data?.data?.data;
  const pagination = data?.data?.pagination;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log(userDetail, "related to updateorcreat");

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
          // closeHandler={closeHandler}
          setUserDetails={setUserDetails}
        />
      )}
      <section
        className={`  md:pl-0 p-4 h-screen  rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6 
          
      
               bg-white text-gray-600 border-gray-200 
            rounded-md  font-philosopher max-w-full w-full h-screen shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl ">
              Restaurant Owners
            </h1>
          </div>
          <div className="flex justify-between mb-4">
            <div className={`flex items-center   `}>
              <input
                type="search"
                placeholder={` Search
                  `}
                className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent 
                   bg-slate-50 focus:border-gray-100
                shadow-inner rounded-[0.26rem] outline-none `}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setCurrentPage(1)}
              />
            </div>
            {/* <div className="relative flex items-center self-end ">
              <button
                className={` px-2 py-1 
                       bg-blue-400  hover:bg-cyan-400 text-white
                  }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
                onClick={creathandler}
              >
                <div>
                  <span className="hidden md:inline-block">Creat User</span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </div>
              </button>
            </div> */}
          </div>
          <section
            className={`w-full overflow-auto    border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
          >
            <section className="grid grid-cols-customResOwner pb-2 p-2  gap-4  border-gray-100 min-w-[900px] font-medium md:font-semibold bg-sky-100">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>

              {resturantOwnerListHeading?.map((heading, index) => (
                <p
                  key={index}
                  className={`  text-gray-600 md:text-lg ${
                    index !== 0 ? "justify-self-center" : "ml-6"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>
            <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[900px] ">
              {isPending ? (
                <p>Data fetching... </p>
              ) : (
                currentUsers?.map((user, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customResOwner group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span className="flex flex-col ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      <span>{user.name}</span>
                      <span className="text-xs font-semibold text-gray-600 break-words">
                        {user.email.length > 23
                          ? user.email.slice(0, 20) + "..."
                          : user.email}
                      </span>
                    </span>
                    {/* <div className="flex items-center justify-center">
                        <img
                          src={user.Profile ? user.Profile : login}
                          alt="user Image"
                          className="w-24 h-10 rounded-lg"
                        />
                      </div> */}
                    {/* <span className="ml-2 text-sm font-semibold rounded-full ">
                      {user?.mobile || "----"}
                    </span> */}
                    <span className="ml-2 text-sm font-semibold rounded-full ">
                      {user?.createdAt?.split("T")[0]}
                    </span>
                    {/* <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {user?.location?.address ? user?.location?.address : "--"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {user?.location?.city ? user?.location?.city : "Mumbai"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {user?.location?.state ? user?.location?.state : "--"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {user?.location?.country
                        ? user?.location?.country
                        : "India"}
                    </span> */}
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {user?.role}
                    </span>

                    {/* <div className="grid justify-center gap-2">
                      <button
                        className="px-2 py-2 text-sm text-white rounded-md bg-sky-400 hover:bg-sky-600"
                        onClick={() => handlingNavigate(user)}
                      >
                        <FiEye className="w-6 h-4" />
                      </button>
                    </div> */}
                    <div className="grid justify-center gap-2">
                      {user.status === "pending" ? (
                        <>
                          <button
                            className="px-2 py-2 text-sm text-white bg-green-400 rounded-md cursor-pointer hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-default"
                            onClick={() => approveHandler(user._id)}
                            disabled={!user.isSelfRegistered}
                          >
                            Approve
                          </button>
                          <button
                            className="px-2 py-2 text-sm text-white rounded-md cursor-pointer bg-rose-400 hover:bg-rose-600 disabled:bg-gray-600 disabled:cursor-default"
                            onClick={() => rejecttHandler(user._id)}
                            disabled={!user.isSelfRegistered}
                          >
                            Reject
                          </button>
                        </>
                      ) : user.status === "approved" ? (
                        <span className="px-2 py-2 text-sm font-semibold text-green-600">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 py-2 text-sm font-semibold text-rose-600">
                          Rejected
                        </span>
                      )}
                    </div>
                    <span className="flex justify-center text-sm font-semibold text-gray-600 ">
                      {user?.isSelfRegistered ? "Register" : "Not Registered"}
                    </span>
                  </section>
                ))
              )}
            </div>
          </section>
          <Pagination
            currentPage={currentPage}
            handleClick={handleClick}
            tabletotalPages={pagination?.totalPages ?? 0}
            totalItems={pagination?.totalItems ?? 0}
          />
        </section>
      </section>
    </>
  );
};

export default ResturantOwner;
