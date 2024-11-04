import { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";

const MostSoldItems = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Week");
  const [startDate, setStartDate] = useState("2024-09-28"); // Default start date
  const [endDate, setEndDate] = useState("2024-10-28"); // Default end date

  // Fetching sales data using React Query
  const {
    data: salesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topSoldItems", selectedStore, startDate, endDate],
    queryFn: () =>
      apiGetRequest({
        url: `/report/topsold?startDate=${startDate}&endDate=${endDate}&restaurantId=${selectedStore}`,
      }),
    // enabled: !!selectedStore, // Only run the query if a store is selected
  });

  const finalData = Array.isArray(salesData?.data) ? salesData?.data : [];

  // Log the API response
  console.log("API Response:", salesData, finalData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div className="p-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-gray-100 rounded-full">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm12 0v10H5V5h10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Most Sold Items</h2>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Select Store"
              className="py-2 pl-3 pr-10 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
          <input
            type="date"
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Table Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb- 4">
            Top 10 Most Sold Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 font-medium text-left text-gray-600">
                    Item Name
                  </th>
                  <th className="px-4 py-3 font-medium text-left text-gray-600">
                    Sales Count
                  </th>
                  <th className="px-4 py-3 font-medium text-left text-gray-600">
                    Net. Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {finalData?.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-blue-600">{item.dishName}</td>
                    <td className="px-4 py-3">{item.totalSold}</td>
                    <td className="px-4 py-3">₹ {item.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">
            Overview Of Most Sold Items
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Of all orders till {endDate}
          </p>
          <div className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={finalData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                dataKey="totalSold" // This should match the key you want to visualize
                nameKey="dishName" // Display name for each item in the legend and tooltip
              >
                {finalData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="top" />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostSoldItems;
