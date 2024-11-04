// import { FiEye, FiRotateCcw } from "react-icons/fi";

import { useState } from "react";

import { initialUserData } from "../components/content_data/content_data";
import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { UserProfileType, UserResponseData } from "../types/contentType";

import UserProfile from "./UserProfile";
import Pagination from "../components/pagination/Pagination";
import { apiGetRequest } from "../api/adminGetApi";
import UserForm from "../forms/UserForm";

// import { IoIosSend } from "react-icons/io";

import DriverDetials from "../components/modal/DriverDetails";
import { useNavigate } from "react-router";

export interface DriverUserSendingData {
  isVerified: boolean;
  status: string;
  rejectionMessage?: string;
}

export interface MutationObjectDriverUserType {
  path: string;

  data: DriverUserSendingData;
}

const Driver = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [userDetail, setUserDetails] = useState({
    isCreate: false,
    updateId: "",
    updateData: {
      name: "",
      email: "",
      role: "",
    },
  });

  const [isProfile, setprofile] = useState({
    profile: "",
  });

  const [isUserProfile, setUserProfile] = useState<UserProfileType>({
    isOpen: false,
    userProfile: initialUserData,
  });

  const resturantOwnerListHeading = [
    "Name",

    "R.Date",

    "Role",

    "Status",
    "Info",
  ];

  const { isPending, isError, data, error, refetch } = useQuery<
    ApiGetResponse<UserResponseData>,
    ApiError
  >({
    queryKey: [`driver/users/${currentPage}`],
    queryFn: async () => {
      return await apiGetRequest<UserResponseData>({
        url: `/driver/pag?page=${currentPage}&limit=${10}`,
      });
    },
  });
  // const { isPending, isError, data, error, refetch } = useQuery<
  //   ApiGetResponse<UserResponseData>,
  //   ApiError
  // >({
  //   queryKey: ["driver/users"],
  //   queryFn: async () => {
  //     return await apiGetRequest<UserResponseData>({
  //       url: "/driver/all",
  //     });
  //   },
  // });

  console.log(data?.data?.data, error, "dashbaord>>?");

  // const mutation = useMutation<
  //   ApiResponse<UserData>,
  //   ApiError,
  //   MutationObjectDriverUserType
  // >({
  //   mutationFn: async ({ path, data }) => {
  //     toast.loading("Checking Details");
  //     try {
  //       // console.log(path, method);
  //       const response = await apiRequest<DriverUserSendingData, UserData>({
  //         url: path,
  //         method: "patch",
  //         data: data,
  //       });

  //       // return { data: response.data };
  //       return response;
  //     } catch (error) {
  //       console.log(error);
  //       const apiError: ApiError = {
  //         message: (error as ApiError)?.message || "An error occurred",
  //         status: (error as ApiError)?.status || 500,
  //       };
  //       throw apiError;
  //     }
  //   },

  //   onSuccess: (data) => {
  //     console.log(data);
  //     refetch();
  //     toast.dismiss();

  //     toast.success(`Driver get ${data.data?.status} Successfull`);
  //   },
  //   onError: (error: ApiError) => {
  //     console.log(error);
  //     toast.dismiss();
  //     toast.error(`${error.message}`);
  //   },
  // });

  // const approveHandler = (id: string) => {
  //   mutation.mutate({
  //     path: `/driver/${id}`,
  //     data: {
  //       isVerified: true,
  //       status: "approve",
  //     },
  //   });
  // };
  // const blockHandler = (id: string) => {
  //   mutation.mutate({
  //     path: `/driver/${id}`,
  //     data: {
  //       isVerified: true,
  //       status: "blocked",
  //     },
  //   });
  // };
  // const rejecttHandler = (id: string, rejectionReason: string) => {
  //   console.log(id, rejectionReason);
  //   mutation.mutate({
  //     path: `/driver/${id}`,
  //     data: {
  //       isVerified: false,
  //       status: "rejected",
  //       rejectionMessage: rejectionReason,
  //     },
  //   });
  // };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    // rejecttHandler(selectedUserId, rejectionReason);

    console.log(selectedUserId, rejectionReason);
    setIsRejecting(false);
    setRejectionReason("");
    setSelectedUserId("");
  };

  const currentUsers = data?.data?.data;
  const pagination = data?.data?.pagination;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log(userDetail, "related to updateorcreat");

  const navigate = useNavigate();

  const viewProfileHandler = (id: string) => {
    // setprofile((prev) => ({
    //   ...prev,
    //   profile: id,
    // }));
    navigate(`/driver/${id}`);
  };
  const closeProfileHandler = () => {
    setprofile((prev) => ({
      ...prev,
      profile: "",
    }));
  };

  return (
    <>
      {isRejecting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4">
              <h3 className="mb-4 text-xl font-bold">Rejection Reason</h3>
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 text-white rounded-md bg-rose-500 hover:bg-rose-600"
                  onClick={handleReject}
                >
                  Submit
                </button>
                <button
                  className="px-4 py-2 text-gray-700 border rounded-md"
                  onClick={() => setIsRejecting(false)} // Close modal without rejecting
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isProfile.profile && <DriverDetials onClose={closeProfileHandler} />}
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
      <section
        className={`  md:pl-0 p-4 h-full  rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6
          
      
               bg-white text-gray-600 border-gray-200 
            rounded-md  font-philosopher max-w-full w-full h-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl ">Driver</h1>
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
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
          >
            <section className="grid grid-cols-customResOwner pb-2 p-2  gap-4  border-gray-100 min-w-[900px] font-medium md:font-semibold bg-sky-100">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
              {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

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
              ) : isError ? (
                <span>Error: {error.message}</span>
              ) : (
                currentUsers?.map((user, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customResOwner group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span className="flex flex-col ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      <span
                        className="cursor-pointer hover:text-orange-700"
                        onClick={() => viewProfileHandler(user._id)}
                      >
                        {user.name}
                      </span>
                      <span className="text-xs font-semibold text-gray-600 break-words">
                        {user.email.length > 23
                          ? user.email.slice(0, 20) + "..."
                          : user.email}
                      </span>
                    </span>

                    <span className="ml-2 text-sm font-semibold text-center rounded-full ">
                      {user?.createdAt?.split("T")[0]}
                    </span>

                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {user?.role}
                    </span>

                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {user?.status}
                    </span>

                    {/* <div className="grid justify-center gap-2">
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
                            // onClick={() => rejecttHandler(user._id)}
                            onClick={() => {
                              setIsRejecting(true);
                              setSelectedUserId(user._id); // Set selected user ID for rejection
                            }}
                            disabled={!user.isSelfRegistered}
                          >
                            Reject
                          </button>
                          <button
                            className="px-2 py-2 text-sm text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-default"
                            onClick={() => blockHandler(user._id)}
                            disabled={!user.isSelfRegistered}
                          >
                            Block
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
                    </div> */}

                    <span className="flex justify-center text-sm font-semibold text-gray-600">
                      {user?.isSelfRegistered ? "Register" : "Not Registered"}
                    </span>
                  </section>
                ))
              )}
            </div>
          </section>
          <Pagination
            currentPage={currentPage}
            tabletotalPages={pagination?.totalPages ?? 0}
            totalItems={pagination?.totalItems ?? 0}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};

export default Driver;
