import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";
import { ApiError, ApiGetResponse } from "../../types/apiType";

interface PaginationOfStore {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

interface StoreTypes {
  restaurantName: string;
  totalOrders: number;
  completeOrders: number;
  cancelOrders: number;
  totalAmount: number;
}
interface StorePerformaceType {
  pagination: PaginationOfStore;
  totalApproveStores: number;
  totalOrders: number;
  totalAmount: number;
  stores: StoreTypes[];
}

const StorePerformanceReport = () => {
  const [fromDate, setFromDate] = useState("2024-10-01");
  const [toDate, setToDate] = useState("2024-10-28");
  // const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery<
    ApiGetResponse<StorePerformaceType>,
    ApiError
  >({
    queryKey: ["restaurantReport", fromDate, toDate, 1],
    queryFn: async () => {
      const response = await apiGetRequest<StorePerformaceType>({
        url: `/report/resturant?startDate=${fromDate}&endDate=${toDate}&page=${1}`,
      });
      return response;
    },

    enabled: !!fromDate && !!toDate,
  });

  console.log("this is data", data);

  const handleSearch = () => {
    refetch();
  };

  const handleExport = () => {
    window.open(
      `/report/resturant/export?startDate=${fromDate}&endDate=${toDate}`,
      "_blank"
    );
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">
          Error loading report. Please try again later.
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">
          No data available. Please try different dates.
        </div>
      </div>
    );
  }

  const stores = data?.data?.stores || [];

  console.log("this stores data", stores);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-6 text-xl font-semibold">Store Performance Report</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">
              {data?.data?.totalApproveStores}
            </span>
            <span className="text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">TOTAL APPROVED STORES</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">
              {data?.data?.totalOrders}
            </span>
            <span className="text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">TOTAL ORDERS</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">
              ₹{data?.data?.totalAmount}
            </span>
            <span className="text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">TOTAL SALES</p>
        </div>
      </div>

      {/* Date Filter */}
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export to XLS
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 16h6"
              />
            </svg>
            Print Report
          </button>
        </div>
      </div>

      {/* Report Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Restaurant Name</th>
            <th className="px-4 py-2 border-b">Total Orders</th>
            <th className="px-4 py-2 border-b">Completed Orders</th>
            <th className="px-4 py-2 border-b">Cancelled Orders</th>
            <th className="px-4 py-2 border-b">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{store.restaurantName}</td>
              <td className="px-4 py-2 border-b">{store.totalOrders}</td>
              <td className="px-4 py-2 border-b">{store.completeOrders}</td>
              <td className="px-4 py-2 border-b">{store.cancelOrders}</td>
              <td className="px-4 py-2 border-b">₹{store.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Store List */}
      <div className="mt-6 overflow-hidden bg-white rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          <li className="grid grid-cols-5 gap-4 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50">
            <div>Store/Restaurant Name</div>
            <div>Total Orders</div>
            <div>Completed Orders</div>
            <div>Cancelled Orders</div>
            <div>Total Amount</div>
          </li>
          {stores.length > 0 ? (
            stores.map((store, index) => (
              <li
                key={index}
                className="grid grid-cols-5 gap-4 px-4 py-3 text-sm"
              >
                <div>{store.restaurantName}</div>
                <div>{store.totalOrders}</div>
                <div>{store.completeOrders}</div>
                <div>{store.cancelOrders}</div>
                <div>₹{store.totalAmount}</div>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-center text-gray-500">
              No stores found for the selected date range
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StorePerformanceReport;
