import { useState } from "react";
import { Search, Download, Printer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";
import { format } from "date-fns";
import { ApiStoreWiseReportPaginationValues } from "../../types/contentType";
import { ApiError, ApiGetResponse } from "../../types/apiType";
import { useRestaurants } from "../../api/query";

// interface OrderData {
//   date: string;
//   storeName: string;
//   orderId: string;
//   orderType: string;
//   distance: string;
//   completedIn: string;
//   paymentMode: string;
//   paidWithWallet: string;
//   netAmount: string;
//   commissionRate: string;
//   earnings: string;
//   subtotal: string;
//   couponCode: string;
//   coupon: string;
// }

interface StoreWiseOrderData {
  date: string;
  restaurantName: string;
  orderId: string;
  distance: number;
  paymentMode: string;
  totalAmount: number;
  couponCode: string;
  couponPercentage: number;
}

export interface StoreWiseOrderResponseData {
  data: StoreWiseOrderData[];
  pagination: ApiStoreWiseReportPaginationValues;
}

const StoreOrderReport = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponName, setCouponName] = useState("");
  const [dateRange, setDateRange] = useState({
    from: format(new Date("2024-09-01"), "yyyy-MM-dd"),
    to: format(new Date("2024-10-30"), "yyyy-MM-dd"),
  });

  const constructQueryUrl = (
    baseUrl: string,
    params: Record<string, string>
  ) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    return `${baseUrl}?${queryParams.toString()}`;
  };

  // const { data: restaurantsData } = useQuery({
  //   queryKey: ["restaurants"],
  //   queryFn: () => apiGetRequest({ url: "/restaurant/admin" }),
  // });

  const { data: restaurantsData } = useRestaurants();

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ApiGetResponse<StoreWiseOrderResponseData>, ApiError>({
    queryKey: [
      "orderReport",
      dateRange.from,
      dateRange.to,
      selectedStore,
      paymentMethod,
      couponName,
    ],
    queryFn: () => {
      const url = constructQueryUrl("/report/order", {
        startDate: dateRange.from,
        endDate: dateRange.to,
        restaurantName: selectedStore,
        paymentMethod: paymentMethod,
        couponCode: couponName,
      });
      return apiGetRequest<StoreWiseOrderResponseData>({ url });
    },
    // enabled: !!dateRange.from && !!dateRange.to,
  });

  console.log(ordersData, restaurantsData);

  const handleSearch = () => {
    refetch();
  };

  const handleExport = () => {
    const exportUrl = constructQueryUrl("/report/order/export", {
      startDate: dateRange.from,
      endDate: dateRange.to,
      restaurantName: selectedStore,
      paymentMethod: paymentMethod,
      couponCode: couponName,
    });
    window.open(exportUrl, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  const orders = ordersData?.data?.data || [];
  const restaurants = restaurantsData?.data?.data || [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800"> Order Report</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-5">
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="p-2 text-gray-600 border rounded-md"
        >
          <option value="">Select Store</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant.name}>
              {restaurant.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Payment Method..."
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 border rounded-md"
        />

        <input
          type="text"
          placeholder="Coupon Name"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
          className="p-2 border rounded-md"
        />

        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange({ ...dateRange, from: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          />
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </button>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Export to XLS
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Report
        </button>
      </div>

      {isError && (
        <div className="py-8 text-center text-red-500">
          Error: {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="py-8 text-center">Loading...</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className=" border border-gray-200  min-w-[1200px]">
            <thead>
              <tr className="text-left text-gray-600 bg-gray-50">
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Store Name</th>
                <th className="p-3 border-b">Order ID</th>
                {/* <th className="p-3 border-b">Completed In</th> */}
                <th className="p-3 border-b">Distance</th>
                <th className="p-3 border-b">Payment Mode</th>
                <th className="p-3 border-b">Total Amount</th>
                {/* <th className="p-3 border-b">Commission Rate</th> */}
                {/* <th className="p-3 border-b">Earnings</th> */}
                {/* <th className="p-3 border-b">Subtotal</th> */}
                <th className="p-3 border-b">Coupon Code</th>
                <th className="p-3 border-b">Coupon</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.orderId} className="text-gray-700">
                    <td className="p-3 border-b">
                      {format(new Date(order.date), "dd-MM-yyyy")}
                    </td>
                    <td className="p-3 border-b">{order.restaurantName}</td>
                    <td className="p-3 text-blue-500 border-b">
                      {order.orderId}
                    </td>
                    <td className="p-3 text-blue-500 border-b">
                      {(order.distance / 1000).toFixed(2)} Km
                    </td>
                    {/* <td className="p-3 border-b">{order.completedIn}</td> */}
                    <td className="p-3 border-b">{order.paymentMode}</td>
                    <td className="p-3 border-b">{order.totalAmount}</td>
                    {/* <td className="p-3 border-b">{order.commissionRate}</td> */}
                    {/* <td className="p-3 border-b">{order.earnings}</td> */}

                    <td className="p-3 border-b">{order.couponCode}</td>
                    <td className="p-3 border-b">{order.couponPercentage}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="p-4 text-center text-gray-500">
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoreOrderReport;
