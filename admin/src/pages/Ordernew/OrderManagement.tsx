import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RotateCcw, Clock, Download, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";
import { ApiError, ApiGetResponse } from "../../types/apiType";

interface OrderResponseData {
  orders: {
    id: string;
    status: string;
    statusColor: string;
    orderBy: string;
    deliveryBy: string | null;
    storeName: string;
    address: string;
    mode: string;
    total: string;
    orderPlacedAt: string;
    timeElapsed?: string;
    cancelledIn?: string;
  }[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderResponseData["orders"][0] | null;
  onAssign: () => void;
}

const Modal = ({ isOpen, onClose, order, onAssign }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Assign Delivery Guy</h2>
        {order && (
          <div className="space-y-2">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Ordered By:</strong> {order.orderBy}
            </p>
            <p>
              <strong>Delivery By:</strong> {order.deliveryBy || "Not Assigned"}
            </p>
            <p>
              <strong>Store Name:</strong> {order.storeName}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Mode:</strong> {order.mode}
            </p>
            <p>
              <strong>Total:</strong> {order.total}
            </p>
            <p>
              <strong>Order Placed At:</strong> {order.orderPlacedAt}
            </p>
            <p>
              <strong>Live Timer:</strong>{" "}
              {order.timeElapsed || order.cancelledIn}
            </p>
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 transition-colors bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
            onClick={onAssign}
          >
            Assign Delivery Guy
          </button>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
  </div>
);

const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: ApiError;
  onRetry: () => void;
}) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
      <p>Error loading orders: {error.message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 mt-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  </div>
);

const OrderManagement = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<
    OrderResponseData["orders"][0] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 5;

  const { isPending, isError, data, error } = useQuery<
    ApiGetResponse<OrderResponseData>,
    ApiError
  >({
    queryKey: ["orders", currentPage, searchTerm],
    queryFn: async () => {
      return await apiGetRequest<OrderResponseData>({
        url: `/order/pag?page=${currentPage}&limit=${limit}${
          searchTerm ? `&search=${searchTerm}` : ""
        }`,
      });
    },
  });

  const handleViewClick = (order: OrderResponseData["orders"][0]) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleAssignClick = (order: OrderResponseData["orders"][0]) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleAssign = () => {
    if (selectedOrder) {
      // Add your assign delivery guy logic here
      console.log(`Assigning delivery guy for order: ${selectedOrder.id}`);
      setIsModalOpen(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (isPending) return <LoadingSpinner />;
  if (isError)
    return <ErrorDisplay error={error} onRetry={() => navigate(0)} />;

  const orders = data?.data?.data || [];
  console.log("this is orders", orders);
  const pagination = data?.data?.pagination;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 transition-colors bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={handleResetFilters}
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </button>
        </div>

        {/* Search and Export Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search with anything..."
              className="w-full px-4 py-2 pl-10 border rounded-md"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 transition-colors bg-gray-200 rounded-md hover:bg-gray-300">
              <Download className="w-4 h-4" />
              Export as CSV
            </button>
            <div className="flex items-center gap-2">
              <span>{pagination?.total || 0} Orders</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Order ID
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Store Name
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Address
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Mode
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Total
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Order Placed At
                </th>
                <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">
                  Live Timer
                </th>
                <th className="px-6 py-3 text-sm font-medium text-right text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${order.statusColor}`}
                        ></div>
                        {order.orderId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-black text-sm px-3 py-1 rounded-md inline-flex bg-green-500 ${order.statusColor}`}
                        >
                          {order.orderStatus}
                        </span>
                        <span className="text-sm text-gray-500">
                          Order By: {order.orderBy}
                        </span>
                        {order.deliveryBy && (
                          <span className="text-sm text-gray-500">
                            Delivery By: {order.deliveryBy}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{order.restaurant.name}</td>
                    <td className="px-6 py-4">{order.address}</td>
                    <td className="px-6 py-4">{order.mode}</td>
                    <td className="px-6 py-4">{order.totalAmount}</td>
                    <td className="px-6 py-4">
                      {order.restaurant.deliveryTime}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{order.timeElapsed || order.cancelledIn}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewClick(order)}
                          className="px-3 py-1 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleAssignClick(order)}
                          className="px-3 py-1 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                        >
                          {order.status === "Delivery Guy Assigned"
                            ? "Reassign"
                            : "Assign"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && orders.length > 0 && (
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 transition-colors bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= (pagination?.totalPages || 1)}
              className="px-4 py-2 transition-colors bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          onAssign={handleAssign}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, RotateCcw, Clock, Download, ChevronDown } from 'lucide-react';
// import { useQuery } from "@tanstack/react-query";
// import { apiGetRequest } from "../../api/adminGetApi";
// import { ApiError, ApiGetResponse } from "../../types/apiType";

// interface OrderResponseData {
//   orders: {
//     id: string;
//     status: string;
//     statusColor: string;
//     orderBy: string;
//     deliveryBy: string | null;
//     storeName: string;
//     address: string;
//     mode: string;
//     total: string;
//     orderPlacedAt: string;
//     timeElapsed?: string;
//     cancelledIn?: string;
//   }[];
//   pagination: {
//     total: number;
//     totalPages: number;
//     currentPage: number;
//     limit: number;
//   };
// }

// interface DriverData {
//   id: string;
//   name: string;
//   distance: string;
//   rating: number;
//   status: string;
//   currentLocation: string;
// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   order: OrderResponseData['orders'][0] | null;
//   onAssign: () => void;
//   nearbyDrivers: DriverData[];
//   isLoadingDrivers: boolean;
// }

// const Modal = ({ isOpen, onClose, order, onAssign, nearbyDrivers, isLoadingDrivers }: ModalProps) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//           {/* Order Details Section */}
//           <div className="p-6 rounded-lg bg-gray-50">
//             <h3 className="mb-4 text-lg font-semibold text-gray-700">Order Information</h3>
//             {order && (
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 gap-2">
//                   <p className="text-gray-600">Order ID:</p>
//                   <p className="font-medium">{order.id}</p>

//                   <p className="text-gray-600">Status:</p>
//                   <p className="font-medium">{order.status}</p>

//                   <p className="text-gray-600">Ordered By:</p>
//                   <p className="font-medium">{order.orderBy}</p>

//                   <p className="text-gray-600">Store Name:</p>
//                   <p className="font-medium">{order.storeName}</p>

//                   <p className="text-gray-600">Address:</p>
//                   <p className="font-medium">{order.address}</p>

//                   <p className="text-gray-600">Mode:</p>
//                   <p className="font-medium">{order.mode}</p>

//                   <p className="text-gray-600">Total:</p>
//                   <p className="font-medium">{order.total}</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Nearby Drivers Section */}
//           <div className="p-6 rounded-lg bg-gray-50">
//             <h3 className="mb-4 text-lg font-semibold text-gray-700">Available Drivers Nearby</h3>
//             {isLoadingDrivers ? (
//               <div className="flex items-center justify-center h-40">
//                 <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
//               </div>
//             ) : nearbyDrivers.length > 0 ? (
//               <div className="space-y-4">
//                 {nearbyDrivers.map((driver) => (
//                   <div key={driver.id} className="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h4 className="font-medium text-gray-800">{driver.name}</h4>
//                         <p className="text-sm text-gray-600">Distance: {driver.distance}</p>
//                         <p className="text-sm text-gray-600">Rating: {driver.rating}⭐</p>
//                       </div>
//                       <button
//                         onClick={() => onAssign()}
//                         className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
//                       >
//                         Assign Driver
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="py-8 text-center text-gray-500">No drivers available nearby</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OrderManagement = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<OrderResponseData['orders'][0] | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const limit = 5;

//   // Main orders query
//   const { isPending, isError, data, error, refetch } = useQuery<
//     ApiGetResponse<OrderResponseData>,
//     ApiError
//   >({
//     queryKey: ['orders', currentPage, searchTerm],
//     queryFn: async () => {
//       return await apiGetRequest<OrderResponseData>({
//         url: `/order/pag?page=${currentPage}&limit=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`,
//       });
//     },
//   });

//   // Nearby drivers query
//   const { data: driversData, isLoading: isLoadingDrivers } = useQuery<
//     ApiGetResponse<DriverData[]>,
//     ApiError
//   >({
//     queryKey: ['nearbyDrivers', selectedOrder?.id],
//     queryFn: async () => {
//       if (!selectedOrder?.id) throw new Error('No order selected');
//       return await apiGetRequest<DriverData[]>({
//         url: `/driver/order/${selectedOrder.id}`,
//       });
//     },
//     enabled: !!selectedOrder?.id && isModalOpen,
//   });

//   const handleViewClick = (order: OrderResponseData['orders'][0]) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleAssignClick = (order: OrderResponseData['orders'][0]) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleAssign = () => {
//     if (selectedOrder) {
//       console.log(`Assigning delivery guy for order: ${selectedOrder.id}`);
//       setIsModalOpen(false);
//     }
//   };

//   // Rest of the component remains the same...

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       {/* Previous JSX remains the same... */}

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         order={selectedOrder}
//         onAssign={handleAssign}
//         nearbyDrivers={driversData?.data || []}
//         isLoadingDrivers={isLoadingDrivers}
//       />
//     </div>
//   );
// };

// export default OrderManagement;
