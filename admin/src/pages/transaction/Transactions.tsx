import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";
import { useNavigate } from "react-router-dom";
import { ApiError, ApiGetResponse } from "../../types/apiType";

interface Resturanttransection {
  location: {
    type: string;
    coordinates: number[];
  };
  type: string;
  minimumOrder: number;
  allocatedBalance: number;
  _id: string;
  name: string;
  address: string;
  rating: number;
  openinghour: number;
  contact: number;
  menuitem: number;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  favorites: string[];
  closingTime: string;
  openingTime: string;
  recomended: boolean;
  resturantCategory: string;
  image: string[];
  distanceFromUser: number;
  selfPickup: boolean;
  deliveryTimeInMinutes: number;
  formattedClosingTime: string;
  formattedOpeningTime: string;
  isOpen: boolean;
  deliveryTime: string;
  orderCount: number;
}

interface DriverTransection {
  _id: string;
  totalCashOnHand: number;
  totalPaidToAdmin: number;
  driverId: string;
  driverName: string;
}

interface ResturantResponseType {
  data: Resturanttransection[];
  success: boolean;
}
interface DriverResponseType {
  data: DriverTransection[];
  success: boolean;
}

const TransactionInterface = () => {
  const navigate = useNavigate();

  // Fetch restaurant and driver data
  const {
    data: restaurantsData,
    isLoading: restaurantsLoading,
    error: restaurantsError,
  } = useQuery<ApiGetResponse<ResturantResponseType>, ApiError>({
    queryKey: ["restaurant/orders"],
    queryFn: () =>
      apiGetRequest<ResturantResponseType>({ url: "/restaurant/order" }),
  });

  const {
    data: driversData,
    isLoading: driversLoading,
    error: driversError,
  } = useQuery<ApiGetResponse<DriverResponseType>, ApiError>({
    queryKey: ["driver/transactions"],
    queryFn: () =>
      apiGetRequest<DriverResponseType>({ url: "/drivertransaction/summary" }),
  });

  if (restaurantsLoading || driversLoading) {
    return <div>Loading...</div>;
  }

  if (restaurantsError || driversError) {
    console.error("Error loading data:", restaurantsError || driversError);
    return <div>Error loading data. Please try again later.</div>;
  }

  // Ensure data is in the expected structure
  const restaurants = restaurantsData?.data?.data || [];
  const drivers = driversData?.data?.data || [];

  console.log("hello", drivers);

  return (
    <div className="flex flex-wrap justify-between w-full gap-6 p-6">
      {/* Restaurants Section */}
      <div className="w-full p-6 bg-white rounded-lg shadow-lg lg:w-1/2">
        <h2 className="mb-4 text-2xl font-bold">Restaurants</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 text-left border-b">SNO</th>
              <th className="py-2 text-left border-b">Restaurant Name</th>
              <th className="py-2 text-left border-b">Order Count</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={restaurant._id} className="hover:bg-gray-50">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">
                  <button
                    onClick={() =>
                      navigate(`/restaurant-orders/${restaurant._id}`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {restaurant.name}
                  </button>
                </td>
                <td className="py-2">{restaurant.orderCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drivers Section */}
      <div className="w-full p-6 bg-white rounded-lg shadow-lg lg:w-1/2">
        <h2 className="mb-4 text-2xl font-bold">Drivers</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 text-left border-b">SNO</th>
              <th className="py-2 text-left border-b">Driver Name</th>
              <th className="py-2 text-left border-b">Cash On Hand</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={driver._id} className="hover:bg-gray-50">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">
                  <button
                    onClick={() =>
                      navigate(`/driver-transactions/${driver._id}`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {driver.driverName}
                  </button>
                </td>
                <td className="py-2">₹{driver.totalCashOnHand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionInterface;
