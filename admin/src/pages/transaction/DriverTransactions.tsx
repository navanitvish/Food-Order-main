import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";
import { ApiError, ApiGetResponse } from "../../types/apiType";

interface DriverDataType {
  amountPaidToAdmin: number;
  cashOnHand: number;
  driverId: string;
  orderId: string;
  transactionDate: string;

  _id: string;
}

interface DriverResponseTyep {
  data: DriverDataType[];
  success: boolean;
}

const DriverTransactions = () => {
  const { driverId } = useParams();

  const {
    data: driverTransactionsData,
    isLoading,
    error,
  } = useQuery<ApiGetResponse<DriverResponseTyep>, ApiError>({
    queryKey: ["driver/transactions", driverId],
    queryFn: () =>
      apiGetRequest<DriverResponseTyep>({
        url: `/drivertransaction/${driverId}`,
      }),
    enabled: !!driverId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const transactions = driverTransactionsData?.data?.data || [];

  return (
    // <div className="p-6">
    //   <h2 className="mb-4 text-2xl font-bold">
    //     Transactions for Driver ID: {driverId}
    //   </h2>
    //   <ul>
    //     {transactions.map((transaction) => (
    //       <li
    //         key={transaction.id}
    //         className="flex justify-between py-2 border-b border-gray-200"
    //       >
    //         <span>{transaction.id}</span>
    //         <span>
    //           {new Date(transaction.transactionDate).toLocaleDateString()}
    //         </span>
    //         <span>₹{transaction.amount}</span>
    //         <span>{transaction.type}</span>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Driver Cash In hand Log
          </h1>
        </div>

        {/* Headers */}
        <ul className="flex justify-between p-4 text-sm font-medium text-center text-gray-600 border-t border-b bg-gray-50">
          <li className="w-32">Transaction Date</li>
          <li className="w-48">Amount Paid to Admin</li>
          <li className="w-64">Cash On Hand</li>
        </ul>

        {/* Order List */}
        <div className="overflow-hidden">
          {transactions.map((driver: DriverDataType, index: number) => (
            <ul
              key={driver._id}
              className={`flex p-4 text-sm justify-between text-center  text-gray-600 border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <li className="w-32">{driver.transactionDate.split("T")[0]}</li>
              <li className="w-48">{driver.amountPaidToAdmin}</li>
              <li className="w-64 text-blue-500">{driver.cashOnHand}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverTransactions;
