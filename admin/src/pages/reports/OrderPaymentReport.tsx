import { useState } from "react";
import { Search } from "lucide-react";

interface OrderPayment {
  date: string;
  storeName: string;
  orderId: string;
  paymentMethod: string;
  orderTotal: number;
  byWallet: number;
  byMethod: number;
}

const OrderPaymentReport = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dateRange, setDateRange] = useState({
    from: "10/26/2024",
    to: "10/26/2024",
  });

  // Sample data
  const orders: OrderPayment[] = [
    {
      date: "17-02-2024",
      storeName: "KFC",
      orderId: "OD-02-17-150V-136844",
      paymentMethod: "COD",
      orderTotal: 750,
      byWallet: 0,
      byMethod: 750,
    },
    {
      date: "17-02-2024",
      storeName: "KFC",
      orderId: "OD-02-17-W6CS-411876",
      paymentMethod: "COD",
      orderTotal: 750,
      byWallet: 0,
      byMethod: 750,
    },
    {
      date: "29-01-2024",
      storeName: "Demo Store",
      orderId: "OD-01-29-HJPY-268869",
      paymentMethod: "COD",
      orderTotal: 200.5,
      byWallet: 0,
      byMethod: 200.5,
    },
    {
      date: "27-01-2024",
      storeName: "Demo Store",
      orderId: "OD-01-27-GNAK-762404",
      paymentMethod: "COD",
      orderTotal: 190,
      byWallet: 0,
      byMethod: 190,
    },
    {
      date: "24-01-2024",
      storeName: "KFC",
      orderId: "OD-01-24-GADT-874594",
      paymentMethod: "COD",
      orderTotal: 110,
      byWallet: 0,
      byMethod: 110,
    },
    {
      date: "23-01-2024",
      storeName: "KFC",
      orderId: "OD-01-23-YFPK-362102",
      paymentMethod: "COD",
      orderTotal: 110,
      byWallet: 0,
      byMethod: 110,
    },
    {
      date: "15-01-2024",
      storeName: "Demo Store",
      orderId: "OD-01-15-QKT0-517703",
      paymentMethod: "COD",
      orderTotal: 200.5,
      byWallet: 0,
      byMethod: 200.5,
    },
    {
      date: "13-01-2024",
      storeName: "Pizza Hut",
      orderId: "OD-01-13-SACV-144156",
      paymentMethod: "COD",
      orderTotal: 105,
      byWallet: 0,
      byMethod: 105,
    },
  ];

  // const handlePrint = () => {
  //   console.log("Printing report...");
  // };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Order Payment Report
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 mb-6">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="w-48 p-2 text-gray-600 border rounded-md"
          >
            <option value="">Select Store</option>
            <option value="kfc">KFC</option>
            <option value="demo">Demo Store</option>
            <option value="pizza">Pizza Hut</option>
          </select>

          <input
            type="text"
            placeholder="Payment Method..."
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-48 p-2 border rounded-md"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange({ ...dateRange, from: e.target.value })
              }
              className="p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">To</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange({ ...dateRange, to: e.target.value })
              }
              className="p-2 border rounded-md"
            />
          </div>

          <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md">
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>

          {/* <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 ml-auto text-white bg-blue-500 rounded-md"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Report
          </button> */}
        </div>

        {/* Headers */}
        <ul className="flex p-4 text-sm font-medium text-gray-600 border-t border-b bg-gray-50">
          <li className="w-32">Date</li>
          <li className="w-48">Store Name</li>
          <li className="w-64">Order ID</li>
          <li className="w-48">Payment Method</li>
          <li className="w-32 text-right">Order Total</li>
          <li className="w-32 text-right">By Wallet</li>
          <li className="w-32 text-right">By Method</li>
        </ul>

        {/* Order List */}
        <div className="overflow-hidden">
          {orders.map((order, index) => (
            <ul
              key={order.orderId}
              className={`flex p-4 text-sm text-gray-600 border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <li className="w-32">{order.date}</li>
              <li className="w-48">{order.storeName}</li>
              <li className="w-64 text-blue-500">{order.orderId}</li>
              <li className="w-48">
                <span className="px-2 py-1 text-xs uppercase bg-gray-100 rounded">
                  {order.paymentMethod}
                </span>
              </li>
              <li className="w-32 text-right">{order.orderTotal}</li>
              <li className="w-32 text-right">{order.byWallet}</li>
              <li className="w-32 text-right">{order.byMethod}</li>
            </ul>
          ))}
        </div>

        {/* No Orders Message */}
        {orders.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No payment records found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPaymentReport;
