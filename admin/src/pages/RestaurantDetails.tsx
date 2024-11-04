import { useLocation } from "react-router-dom";

const RestaurantDetails = () => {
  // const { id } = useParams();
  const location = useLocation();
  const restaurant = location.state?.restaurant;

  // Sample restaurant details
  const restaurantDetails = [
    { id: 1, orderDate: "2024-10-26", amount: 150, status: "Delivered" },
    { id: 2, orderDate: "2024-10-26", amount: 200, status: "Pending" },
    { id: 3, orderDate: "2024-10-26", amount: 180, status: "Delivered" },
  ];

  if (!restaurant) {
    return <div className="p-6">Restaurant not found</div>;
  }

  return (
    <div className="p-6">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          Orders for {restaurant.name}
        </h2>
        <div className="mb-4">
          <p className="text-gray-600">
            Total Orders: {restaurant.totalOrders}
          </p>
        </div>
        <ul className="w-full">
          <li className="grid grid-cols-4 gap-4 px-4 py-2 font-semibold rounded-t-lg bg-gray-50">
            <span>Order ID</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
          </li>
          {restaurantDetails.map((order) => (
            <li
              key={order.id}
              className="grid grid-cols-4 gap-4 px-4 py-2 border-b border-gray-200 hover:bg-gray-50"
            >
              <span>{order.id}</span>
              <span>{order.orderDate}</span>
              <span>${order.amount}</span>
              <span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantDetails;
