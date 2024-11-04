import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";

const RestaurantOrders = () => {
  const { restaurantId } = useParams();
  const [dateRange, setDateRange] = useState({
    startDate: "2024-09-28",
    endDate: "2024-10-28",
  });

  const {
    data: restaurantOrdersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurant/orders", restaurantId, dateRange],
    queryFn: () =>
      apiGetRequest({
        url: `/order/transection/${restaurantId}?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}&page=1`,
      }),
    // enabled: !!restaurantId,
  });

  console.log(restaurantOrdersData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const orders = restaurantOrdersData?.data?.data || [];

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Orders for Restaurant ID: {restaurantId}
      </h2>
      {/* Date Range Inputs */}
      <div className="flex gap-4 mt-4">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={dateRange.startDate}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
          }
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={dateRange.endDate}
          onChange={(e) =>
            setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />
      </div>
      {/* Orders Table */}
      <ul className="mt-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="flex justify-between py-2 border-b border-gray-200"
          >
            <span>{order.id}</span>
            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
            <span>₹{order.amount}</span>
            <span>{order.paymentMethod}</span>
            <span>{order.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantOrders;
