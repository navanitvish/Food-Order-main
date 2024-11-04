import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RegisterUser from "../pages/RegisterUser";

import ResetPassword from "../pages/ResetPassword";
// import Home from "../pages/Home";
import Login from "../pages/Login";

import ForgetPassword from "../pages/ForgetPassword";

import Authentication from "../pages/Authentication";
import EmailVerification from "../pages/EmailVerification.tsx";
import DashBoard from "../pages/Dashboard.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Dishes from "../pages/Dishes.tsx";
import Category from "../pages/Category.tsx";
import Restaurants from "../pages/Restaurants.tsx";
import Orders from "../pages/Orders.tsx";
import Table from "../pages/Table.tsx";

import ForgetPasswordByEmailLink from "../pages/ForgetPasswordByEmailLink.tsx";
import ResturantProfile from "../pages/ResturantProfile.tsx";
import RestaurantForm from "../forms/RestaurantForm.tsx";
import DishForm from "../forms/DishForm.tsx";

import Review from "../pages/review.tsx";
import Banner from "../pages/banner.tsx";
import BannerForm from "../forms/bannerForm.tsx";
import OrderProfile from "../pages/OrderProfile.tsx";
import Coupon from "../pages/Coupon.tsx";
import CouponForm from "../forms/CouponForm.tsx";
import ResturantOwner from "../pages/ResturantOwner.tsx";
import Driver from "../pages/Driver.tsx";
import { ApiError, ApiGetResponse } from "../types/apiType.ts";
import { useQuery } from "@tanstack/react-query";
import { UserProfileResponseData } from "../types/contentType.ts";
import { apiGetRequest } from "../api/adminGetApi.ts";

import UserRestaurants from "../pages/resturant/UserResturants.tsx";

import UserRestaurantForm from "../pages/resturant/UserResturantsForm.tsx";
import UserResturantProfile from "../pages/resturant/UserResturantProfile.tsx";
import UserDishForm from "../pages/resturant/UserDishForm.tsx";

import UserOrders from "../pages/resturant/UserOrders.tsx";
import DriverProfile from "../pages/DriverProfile.tsx";
import ResturantCategory from "../pages/ResturantCategory.tsx";
import RestByCategory from "../pages/RestByCategory.tsx";
import UserCoupon from "../pages/resturant/UserCoupon.tsx";
import UserCouponForm from "../pages/resturant/UserCouponForm.tsx";
import TransactionInterface from "../pages/transaction/Transactions.tsx";
import SettlementsComponent from "./../pages/SettlementsComponent";
// import RestaurantDetails from './../pages/RestaurantDetails';
import SattelmentOwnner from "../pages/SattelmentOwnner.tsx";
// import DeliveryCollectionLog from "../pages/transaction/DeliveryCollectionLog.tsx";
// import DeliveryCollection from "../pages/transaction/DeliveryCollection.tsx";
import OrderDetails from "../pages/Ordernew/OrderDetails.tsx";
import AssignDelivery from "../pages/Ordernew/AssignDelivery.tsx";
import OrderManagement from "../pages/Ordernew/OrderManagement.tsx";
import AdminDashboard from "../pages/AdminDashboard.tsx";
import CustomerPerformanceReport from "../pages/reports/CustomerPerformanceReport.tsx";
import OrderPaymentReport from "../pages/reports/OrderPaymentReport.tsx";
import StorePerformanceReport from "../pages/reports/StorePerformanceReport.tsx";
import StoreWiseReport from "../pages/reports/StoreWiseorder.tsx";
import MostSoldItems from "../pages/transaction/MostSoldItems.tsx";
import RestaurantOrders from "./../pages/transaction/RestaurantOrders";
import DriverTransactions from "./../pages/transaction/DriverTransactions";

const Router = () => {
  const {
    data: userData,
    // isError: userIsError,
    // isPending: userIsPending,
  } = useQuery<ApiGetResponse<UserProfileResponseData>, ApiError>({
    queryKey: ["user/details"],
    queryFn: async () => {
      return await apiGetRequest<UserProfileResponseData>({
        url: "/user/admin-details-info",
      });
    },
  });

  const userAllData = userData?.data?.data;

  console.log(userAllData, "userData");
  const route = createBrowserRouter([
    {
      path: "/login",
      element: <Authentication />,
      children: [
        {
          path: "register",
          element: <RegisterUser />,
        },
        {
          path: "verify-email",
          element: <EmailVerification />,
        },

        {
          path: "reset-password",
          element: <ForgetPassword />,
        },
        // {path:"/restaurant/:id",
        //  element: <RestaurantDetails/>,
        //  },
        {
          path: "update-password",
          element: <ResetPassword />,
        },
        {
          path: "",
          element: <Login />,
        },
      ],
    },

    {
      path: "forgot-password",
      element: <ForgetPasswordByEmailLink />,
    },

    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        { path: "/dashboard", element: <AdminDashboard /> },
        { path: "/users", element: <DashBoard /> },

        { path: "/dishes", element: <Dishes /> },
        { path: "/dishes/form", element: <DishForm /> },

        {
          path: "/category",
          element: <Category />,
        },
        { path: "/category/:id", element: <Table /> },

        {
          path: "/resturant_category",
          element: <ResturantCategory />,
        },
        { path: "/resturant_category/:id", element: <RestByCategory /> },

        { path: "/restaurants", element: <Restaurants /> },
        { path: "/restaurants/:id", element: <ResturantProfile /> },
        {
          path: "/restaurants/restaurantForm",
          element: <RestaurantForm />,
        },
        {
          path: "/restaurants/update/:id",
          element: <RestaurantForm />,
        },

        { path: "/orders", element: <Orders /> },
        //transactions
        { path: "/transaction", element: <TransactionInterface /> },

        // { path: "/DeliveryCollection", element: <DeliveryCollection /> },

        { path: "/MostSoldItems", element: <MostSoldItems /> },

        { path: "/orders/:id", element: <OrderProfile /> },

        // { path: "/delivery-collection", element: <DeliveryCollection /> },
        // { path: "/delivery-logs/:id", element: <DeliveryCollectionLog /> },
        {
          path: "/restaurant-orders/:restaurantId",
          element: <RestaurantOrders />,
        },
        {
          path: "/driver-transactions/:driverId",
          element: <DriverTransactions />,
        },

        { path: "/driver", element: <Driver /> },
        { path: "/driver/:id", element: <DriverProfile /> },

        { path: "/review", element: <Review /> },

        //banner
        { path: "/banner", element: <Banner /> },
        { path: "/banner/form", element: <BannerForm /> },

        //coupon
        { path: "/coupons", element: <Coupon /> },
        { path: "/coupons/form", element: <CouponForm /> },
        { path: "/coupons/form/:id", element: <CouponForm /> },

        //resturant
        { path: "/resturants_owner", element: <ResturantOwner /> },
        { path: "/SattelmentOwnner", element: <SattelmentOwnner /> },
        // order mannagement
        { path: "/ordermanagement", element: <OrderManagement /> },
        { path: "/order/:orderId", element: <OrderDetails /> },
        { path: "/assign/:orderId", element: <AssignDelivery /> },

        //report

        {
          path: "/customerperformance",
          element: <CustomerPerformanceReport />,
        },
        { path: "/orderpaymentreport", element: <OrderPaymentReport /> },
        {
          path: "/storeperformancereport",
          element: <StorePerformanceReport />,
        },
        { path: "/storewisereport", element: <StoreWiseReport /> },

        //resturan-owner routes
        { path: "/restaurants_owner", element: <UserRestaurants /> },

        {
          path: "/restaurants_owner/restaurantForm_owner",
          element: <UserRestaurantForm />,
        },
        {
          path: "/restaurants_owner/restaurantForm_owner/:id",
          element: <UserRestaurantForm />,
        },
        //profile
        { path: "/restaurants_owner/:id", element: <UserResturantProfile /> },

        {
          path: "/restaurants_owner/:id/menu_form",
          element: <UserDishForm />,
        },
        {
          path: "/restaurants_owner/:id/menu_form/:menuid",
          element: <UserDishForm />,
        },
        //settlements

        { path: "/settlements", element: <SettlementsComponent /> },
        //Coupon route for resturant owner

        { path: "/coupons_owner", element: <UserCoupon /> },
        { path: "/coupons_owner/coupon_form", element: <UserCouponForm /> },
        { path: "/coupons_owner/coupon_form/:id", element: <UserCouponForm /> },

        { path: "/orders_owner", element: <UserOrders /> },

        //driver routes
        // { path: "/orders_driver", element: <UserDriverOrders /> },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
};

export default Router;
