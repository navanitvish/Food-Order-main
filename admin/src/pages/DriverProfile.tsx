/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */

import { useState } from "react";

import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";

import { RiRestaurantLine } from "react-icons/ri";

import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderResponseData, UserData } from "../types/contentType";
import { ApiError, ApiGetResponse, ApiResponse } from "../types/apiType";
import Pagination from "../components/pagination/Pagination";
import { apiGetRequest } from "../api/adminGetApi";
import { MdCheck, MdClose } from "react-icons/md";

import adharCard from "../assets/driverDetails/adhar card.png";
import pencard from "../assets/driverDetails/pencard.jpg";
import drivingLicense from "../assets/driverDetails/driving linces.jpg";
import { DriverUserSendingData, MutationObjectDriverUserType } from "./Driver";
import { toast } from "react-toastify";
import { apiRequest } from "../api/userApi";
import ImgaeShowModel from "../components/modal/ImgaeShowModel";

const driverDetails = {
  name: "John Doe",
  availability: true,
  mobile: 9876543210,
  payment: {
    paymentType: "bank",
    bankName: "HDFC Bank",
    ifscCode: "HDFC0001234",
    accountNumber: "1234567890",
    upiId: null,
  },
  driverDetails: {
    drivingLIcence: [
      "driving_licence_front_image.jpg",
      "driving_licence_back_image.jpg",
    ],
    diverRc: "vehicle_rc_image.jpg",
    vehiclePlate: "MH12AB1234",
    adharCardNumber: [
      "aadhar_card_front_image.jpg",
      "aadhar_card_back_image.jpg",
    ],
    vehicleDetails:
      "Model: Swift Dzire, Variant: VXI, Color: White, Chassis: ABC1234567, Engine: XYZ9876543, Fuel: Petrol, Class: Sedan",
    pencard: ["pan_card_front_image.jpg", "pan_card_back_image.jpg"],
  },
  location: {
    type: "Point",
    coordinates: [72.877656, 19.075984],
  },
  email: "johndoe@example.com",
  password: "hashed_password_here",

  aadharCardVerified: false,
  panCardVerified: false,
  drivingLicenceVerified: false,
  diverRcVerified: false,
  vehiclePlateVerified: false,
  vehicleDetailsVerified: false,

  isBlocked: false,
  isSelfRegistered: true,
  isVerified: false,
  rejectionReason: null,
};

export interface VerificationPayload {
  verification: {
    [key: string]: boolean;
  };
}


export interface DriverType {
  location: {
    type: string;
    coordinates: number[];
  };
  isSelfRegistered: boolean;
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface DriverResponseType {
  data: DriverType;
}

const DriverProfile = () => {
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState({
    dishesPage: 1,
    orderPage: 1,
  });

  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [isVisible, setVisible] = useState(false);
  const [driverImageDetails, setimageDetails] = useState({
    name: "",
    image: "",
  });

  const OrderlisHeading = [
    "User Name",
    "Dish Count",
    "Address",
    "TotalAmount",
    "Rating",
    "Status",
  ];

  //resturant details
  const {
    data: resturantDetails,
    // isError: resturantDetailsIsError,
    // error: resturantDetailsError,
    // isPending: resturantDetailsIsPending,
  } = useQuery<ApiGetResponse<DriverResponseType>, ApiError>({
    queryKey: [`driver/${id}/profile`],

    queryFn: async () => {
      return await apiGetRequest<DriverResponseType>({
        url: `driver/${id}`,
      });
    },
  });
  // document verifyciation
  const verificationMutation = useMutation<
    ApiResponse<UserData>,
    ApiError,
    { id: string; payload: VerificationPayload }
  >({
    mutationFn: async ({ id, payload }) => {
      toast.loading("Verifying document...");
      try {
        const response = await apiRequest<VerificationPayload, UserData>({
          url: `/driver/${id}/verify`,
          method: "put",
          data: payload,
        });
        return response;
      } catch (error) {
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "Verification failed",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Document verification updated successfully");
    },
    onError: (error: ApiError) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });
  //order by resturant
  const {
    data: orderByResturant,
    isError: orderByResturantIsError,
    // error: orderByResturantError,
    isPending: orderByResturantIsPending,
  } = useQuery<ApiGetResponse<OrderResponseData>, ApiError>({
    queryKey: [`order/byresturant/${id}?page=${currentPage.orderPage}`],

    queryFn: async () => {
      return await apiGetRequest<OrderResponseData>({
        url: `order/by-resturant/${id}?page=${currentPage.orderPage}&limit=10`,
      });
    },
  });

  const restaurantDetailsData = resturantDetails?.data?.data;

  const orderByresturantData = orderByResturant?.data?.data;
  const restOrderPagination = orderByResturant?.data?.pagination;

  console.log(restaurantDetailsData, resturantDetails, "Resturant profile");

  console.log(
    id,
    orderByresturantData,
    orderByResturantIsError,
    orderByResturantIsPending,
    "Orders by Resturant Items"
  );

  const currentOrderByresturant = orderByresturantData;

  const handleClick = (pageNumber: number) => {
    setCurrentPage((prev) => ({
      ...prev,
      orderPage: pageNumber,
    }));
  };

  const mutation = useMutation<
    ApiResponse<UserData>,
    ApiError,
    MutationObjectDriverUserType
  >({
    mutationFn: async ({ path, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<DriverUserSendingData, UserData>({
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
      //   refetch();
      toast.dismiss();

      toast.success(`Driver get ${data.data?.status} Successfull`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });


  const handleDocumentVerification = (documentKey: string, isVerified: boolean) => {
    if (!id) return;

    const payload: VerificationPayload = {
      verification: {
        [documentKey]: isVerified,
      },
    };

    verificationMutation.mutate({ id, payload });
  };

  const closehandler = () => {
    setVisible(false);
    setimageDetails({
      name: "",
      image: "",
    });
  };

  const viewImageHandler = (name: string, value: string) => {
    setVisible(true);
    setimageDetails((prev) => ({
      ...prev,
      name: name,
      image: value,
    }));
  };

  const approveHandler = (id: string) => {
    mutation.mutate({
      path: `/driver/${id}`,
      data: {
        isVerified: true,
        status: "approve",
      },
    });
  };
  const blockHandler = (id: string) => {
    mutation.mutate({
      path: `/driver/${id}`,
      data: {
        isVerified: false,
        status: "blocked",
      },
    });
  };

  const unblockHandler = (id: string) => {
    mutation.mutate({
      path: `/driver/${id}`,
      data: {
        isVerified: true,
        status: "active",
      },
    });
  };
  const rejecttHandler = (id: string, rejectionReason: string) => {
    console.log(id, rejectionReason);
    mutation.mutate({
      path: `/driver/${id}`,
      data: {
        isVerified: false,
        status: "rejected",
        rejectionMessage: rejectionReason,
      },
    });
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    rejecttHandler(selectedUserId, rejectionReason);

    console.log(selectedUserId, rejectionReason);
    setIsRejecting(false);
    setRejectionReason("");
    setSelectedUserId("");
  };

  return (
    <>
      {isVisible && (
        <ImgaeShowModel
          closeModal={closehandler}
          imageName={driverImageDetails?.name}
          imageSrc={driverImageDetails?.image}
        />
      )}
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

      <section
        className={` mx-auto px-4 pt-4 md:pl-0 md:pr-4  text-gray-600 border-gray-200   rounded-md `}
      >
        <section
          className={`  bg-white h-fit p-6 text-gray-600 border-gray-200  rounded-md md:p-8`}
        >
          <div className="flex items-center">
            <RiRestaurantLine className=" w-9 h-9" />
            <h1 className="  text-[28px] font-bold  md:text-4xl ml-2">
              Driver Profile
            </h1>
            <Link to={"/driver"}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
            </Link>
          </div>
          <div className="pt-4 border-b border-gray-200"></div>
          <div className="h-[500px] pt-4 mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden md:pl-4 font-montserrat">
            <section className="mb-8 ">
              {/* <div className="relative flex items-center justify-between w-full mb-8">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-orange-500 md:text-2xl">
                      {restaurantDetailsData?.name}
                    </h2>
                    <p className="text-sm font-semibold text-gray-400"></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
                <div className="grid grid-cols-1 col-span-3 gap-6 md:grid-cols-3">
                  <p className="text-sm font-semibold md:text-base ">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Opening Hours:
                    </span>
                    {restaurantDetailsData?.openinghour
                      ? restaurantDetailsData?.openinghour
                      : "9:00 AM - 10:00 PM"}
                  </p>
                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      contact:
                    </span>
                    {restaurantDetailsData?.contact
                      ? restaurantDetailsData?.contact
                      : "----"}
                  </p>
                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Cuisine Type:
                    </span>
                    {restaurantDetailsData?.cuisine
                      ? restaurantDetailsData?.cuisine
                      : "Indian"}
                  </p>

                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Menu Items:
                    </span>
                    {restaurantDetailsData?.menuitem}
                  </p>
                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Address:
                    </span>
                    123 Main St, Cityville
                  </p>
                </div>
              </div> */}

              <div className="">
                {/* Driver Basic Information */}
                <div className="relative flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-orange-500 md:text-2xl">
                      {restaurantDetailsData?.name}
                    </h2>
                    <p className="ml-4 text-sm font-semibold text-gray-400">
                      Mobile: {driverDetails.mobile}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Email: {restaurantDetailsData?.email}
                  </p>
                </div>

                {/* Payment Section */}
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <p className="text-sm font-semibold">
                      <span className="text-gray-400">Payment Type:</span>{" "}
                      {driverDetails.payment.paymentType}
                    </p>
                    {driverDetails.payment.paymentType === "bank" && (
                      <>
                        <p className="text-sm font-semibold">
                          <span className="text-gray-400">Bank Name:</span>{" "}
                          {driverDetails.payment.bankName}
                        </p>
                        <p className="text-sm font-semibold">
                          <span className="text-gray-400">IFSC Code:</span>{" "}
                          {driverDetails.payment.ifscCode}
                        </p>
                        <p className="text-sm font-semibold">
                          <span className="text-gray-400">Account Number:</span>{" "}
                          {driverDetails.payment.accountNumber}
                        </p>
                      </>
                    )}
                    {driverDetails.payment.upiId && (
                      <p className="text-sm font-semibold">
                        <span className="text-gray-400">UPI ID:</span>{" "}
                        {driverDetails.payment.upiId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Driver Details Section */}
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Driver Details
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <div className="flex gap-2">
                        <h4 className="font-semibold text-md">
                          Driving License:
                        </h4>
                        <div className="flex gap-2">
                          <button
                            className="text-green-600"
                            onClick={() => handleDocumentVerification("drivingLicenceVerified", true)}
                          >
                            <MdCheck className="w-5 h-5" />
                          </button>
                          <button
                            className="text-rose-600"
                            onClick={() => handleDocumentVerification("drivingLicenceVerified", false)}
                          >
                            <MdClose className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex mt-4 space-x-4">
                        {driverDetails.driverDetails.drivingLIcence.map(
                          (_, index) => (
                            <img
                              key={index}
                              src={drivingLicense}
                              alt="Driving License"
                              className="w-24 h-24 rounded-md shadow-md"
                              onClick={() =>
                                viewImageHandler(
                                  "driving License",
                                  drivingLicense
                                )
                              }
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2">
                        <h4 className="font-semibold text-md">Vehicle RC:</h4>
                        <div className="flex gap-2">
                          <button
                            className="text-green-600"
                            onClick={() => handleDocumentVerification("diverRcVerified", true)}
                          >
                            <MdCheck className="w-5 h-5" />
                          </button>
                          <button
                            className="text-rose-600"
                            onClick={() => handleDocumentVerification("diverRcVerified", false)}
                          >
                            <MdClose className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <img
                        src={drivingLicense}
                        alt="Vehicle RC"
                        className="w-24 h-24 mt-3 rounded-md shadow-md"
                      />
                    </div>
                    <div>
                      <div className="flex gap-2">
                        <h4 className="font-semibold text-md">Aadhar Card:</h4>
                        <div className="flex gap-2">
                          <button
                            className="text-green-600"
                            onClick={() => handleDocumentVerification("aadharCardVerified", true)}
                          >
                            <MdCheck className="w-5 h-5" />
                          </button>
                          <button
                            className="text-rose-600"
                            onClick={() => handleDocumentVerification("aadharCardVerified", false)}
                          >
                            <MdClose className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex mt-3 space-x-4">
                        {driverDetails.driverDetails.adharCardNumber.map(
                          (_, index) => (
                            <img
                              key={index}
                              src={adharCard}
                              alt="Aadhar Card"
                              className="w-24 h-24 rounded-md shadow-md"
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-2">
                        <h4 className="font-semibold text-md">PAN Card:</h4>
                        <div className="flex gap-2">
                          <button
                            className="text-green-600"
                            onClick={() => handleDocumentVerification("panCardVerified", true)}
                          >
                            <MdCheck className="w-5 h-5" />
                          </button>
                          <button
                            className="text-rose-600"
                            onClick={() => handleDocumentVerification("panCardVerified", false)}
                          >
                            <MdClose className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex mt-3 space-x-4">
                        {driverDetails.driverDetails.pencard.map((_, index) => (
                          <img
                            key={index}
                            src={pencard}
                            alt="PAN Card"
                            className="object-center w-24 h-24 rounded-md shadow-md"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex gap-2">
                        <h4 className="font-semibold text-md">
                          Vehicle Details:
                        </h4>
                        <div className="flex gap-2">
                          <button
                            className="text-green-600"
                            onClick={() => handleDocumentVerification("vehicleDetailsVerified", true)}
                          >
                            <MdCheck className="w-5 h-5" />
                          </button>
                          <button
                            className="text-rose-600"
                            onClick={() => handleDocumentVerification("vehicleDetailsVerified", false)}
                          >
                            <MdClose className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        {driverDetails.driverDetails.vehicleDetails}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <div className="flex gap-2">
                        <h4 className="font-semibold text-md">Vehicle Plate</h4>
                        <div className="flex gap-2">
                          <button
                            className="text-green-600"
                            onClick={() => handleDocumentVerification("vehiclePlateVerified", true)}
                          >
                            <MdCheck className="w-5 h-5" />
                          </button>
                          <button
                            className="text-rose-600"
                            onClick={() => handleDocumentVerification("vehiclePlateVerified", false)}
                          >
                            <MdClose className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-600">
                        {driverDetails.driverDetails.vehiclePlate}
                      </p>
                    </div>

                    <div className="flex justify-end w-full gap-4 md:col-span-2">
                      <button
                        className="px-2 py-2 text-sm text-white bg-green-400 rounded-md cursor-pointer hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-default"
                        onClick={() => approveHandler(id ?? "")}
                        //disabled={true}
                      // disabled={!user.isSelfRegistered}
                      >
                        Approve
                      </button>
                      <button
                        className="px-2 py-2 text-sm text-white rounded-md cursor-pointer bg-rose-400 hover:bg-rose-600 disabled:bg-gray-600 disabled:cursor-default"
                        // onClick={() => rejecttHandler(user._id)}
                        onClick={() => {
                          setIsRejecting(true);
                          setSelectedUserId(id ?? ""); // Set selected user ID for rejection
                        }}
                      // disabled={!user.isSelfRegistered}
                      //disabled={true}
                      >
                        Reject
                      </button>
                      <button
                        className="px-2 py-2 text-sm text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-default"
                        onClick={() => blockHandler(id ?? "")}
                        //disabled={true}
                      //   disabled={!user.isSelfRegistered}
                      >
                        Block
                      </button>
                      <button
                        className="px-2 py-2 text-sm text-white bg-blue-600 rounded-md cursor-pointer hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-default"
                        onClick={() => unblockHandler(id ?? "")}
                        //disabled={true}
                      //   disabled={!user.isSelfRegistered}
                      >
                        UnBlock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <section
                className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
              >
                <section className="grid grid-cols-customeOrderUserProfile pb-2 p-2  gap-4  border-gray-100 min-w-[1200px] font-medium md:font-semibold bg-sky-100">
                  <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
                  {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

                  {OrderlisHeading.map((heading, index) => (
                    <p
                      key={index}
                      className={`  text-gray-600 md:text-lg ${index !== 0 ? "justify-self-center" : "ml-10"
                        }`}
                    >
                      {heading.charAt(0).toUpperCase() + heading.slice(1)}
                    </p>
                  ))}
                </section>

                <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] ">
                  {orderByResturantIsError ? (
                    <p className="flex items-center justify-center w-full h-full text-xl font-semibold text-rose-500">
                      Please Add Order for this Resturant
                    </p>
                  ) : (
                    currentOrderByresturant?.map((menue, i) => (
                      <section
                        key={i}
                        className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeOrderUserProfile group hover:bg-gray-50"
                      >
                        <span>{i + 1}</span>

                        <span className="text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.userId.name}
                        </span>

                        <span className="ml-2 text-sm font-semibold text-center text-gray-600 ">
                          {menue?.items.length}
                        </span>

                        <span className="flex justify-center ml-2 text-sm font-medium text-gray-600 md:text-base">
                          {menue?.address}
                        </span>

                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.totalAmount}
                        </span>
                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.averageRating}
                        </span>
                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.orderStatus}
                        </span>
                      </section>
                    ))
                  )}
                </div>
              </section>

              <Pagination
                currentPage={currentPage.orderPage}
                tabletotalPages={restOrderPagination?.totalPages ?? 0}
                totalItems={restOrderPagination?.totalItems ?? 0}
                handleClick={handleClick}
              />
            </section>
          </div>
        </section>
      </section>
    </>
  );
};

export default DriverProfile;
