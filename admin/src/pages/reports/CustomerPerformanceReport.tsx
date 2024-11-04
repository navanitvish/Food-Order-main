import { Users, ShoppingCart, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/adminGetApi";
import { ApiError, ApiGetResponse } from "../../types/apiType";

interface OverallStatsTypes {
  _id: null;
  totalUsers: number;
  totalOrders: number;
  totalAmount: number;
}

interface UserStateType {
  totalOrders: number;
  completedOrders: number;
  canceledOrders: number;
  totalAmount: number;
  userName: string;
  _id: string;
}

interface CustomerReportTypes {
  overallStats: OverallStatsTypes;
  userStats: UserStateType[];
}

const CustomerPerformanceReport = () => {
  const {
    data: customersData,
    isLoading,
    error,
  } = useQuery<ApiGetResponse<CustomerReportTypes>, ApiError>({
    queryKey: ["customerReport"],
    queryFn: () =>
      apiGetRequest<CustomerReportTypes>({
        url: "/report/customer?page=1&limit=10",
      }),
  });

  const metrics = [
    {
      value: customersData?.data?.overallStats?.totalUsers || "0",
      label: "TOTAL CUSTOMERS",
      icon: <Users className="w-4 h-4 text-blue-500" />,
    },
    {
      value: customersData?.data?.overallStats?.totalOrders || "0",
      label: "TOTAL ORDERS",
      icon: <ShoppingCart className="w-4 h-4 text-blue-500" />,
    },
    {
      value: customersData?.data?.overallStats.totalAmount || "0",
      label: "TOTAL SALES",
      subtitle: "(LESS DELIVERY CHARGES & TIP)",
      icon: <DollarSign className="w-4 h-4 text-blue-500" />,
    },
  ];

  // const generateXMLData = (data) => {
  //   const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  //   const xmlData = data
  //     ?.map(
  //       (customer: any) => `
  //     <Customer>
  //       <ID>${customer.id}</ID>
  //       <Name>${customer.name}</Name>
  //       <JoinedOn>${customer.joinedOn}</JoinedOn>
  //       <CompletedOrders>${customer.completedOrders}</CompletedOrders>
  //       <CancelledOrders>${customer.cancelledOrders}</CancelledOrders>
  //       <TotalOrders>${customer.totalOrders}</TotalOrders>
  //       <TotalTip>${customer.totalTip}</TotalTip>
  //       <TotalAmount>${customer.totalAmount}</TotalAmount>
  //       <AvgCompletion>${customer.avgCompletion}</AvgCompletion>
  //       <MostOrderedItem>${customer.mostOrderedItem}</MostOrderedItem>
  //       <MostOrderedStore>${customer.mostOrderedStore}</MostOrderedStore>
  //       <SuggestedAction>${customer.suggestedAction}</SuggestedAction>
  //     </Customer>
  //   `
  //     )
  //     .join("");

  //   return `${xmlHeader}<Customers>${xmlData}</Customers>`;
  // };

  // const handleExportXML = () => {
  //   // const xmlContent = generateXMLData(customersData || []);
  //   // const blob = new Blob([xmlContent], { type: "application/xml" });
  //   const link = document.createElement("a");
  //   // link.href = URL.createObjectURL(blob);
  //   link.download = "customer_report.xml";
  //   link.click();
  //   URL.revokeObjectURL(link.href);
  // };

  // const handlePrintReport = () => {
  //   window.print();
  // };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error fetching data</div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <ShoppingCart className="w-5 h-5" />
        Customer Performance Report
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg"
          >
            <div>
              <div className="text-3xl font-bold text-gray-800">
                {metric.value}
              </div>
              <div className="text-sm text-gray-500">{metric.label}</div>
              {metric.subtitle && (
                <div className="text-xs text-gray-400">{metric.subtitle}</div>
              )}
            </div>
            <div className="flex-shrink-0">{metric.icon}</div>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-end gap-2">
        <button
          onClick={handleExportXML}
          className="flex items-center gap-2 px-4 py-2 transition border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export to XML
        </button>
        <button
          onClick={handlePrintReport}
          className="flex items-center gap-2 px-4 py-2 transition border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100"
        >
          <Printer className="w-4 h-4" />
          Print Report
        </button>
      </div> */}

      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <ul className="w-full min-w-full mx-auto">
            <li className="border-b bg-gray-50">
              <ul className="flex justify-around text-sm font-medium text-gray-500 border-b">
                <li className="w-12 px-4 py-3">ID</li>
                <li className="w-32 px-4 py-3">Customer Name</li>
                <li className="w-32 px-4 py-3">Completed Orders</li>
                <li className="w-32 px-4 py-3">Cancelled Orders</li>
                <li className="w-24 px-4 py-3">Total Orders</li>
                <li className="px-4 py-3 w-28">Total Amount</li>
              </ul>
            </li>
            {(Array.isArray(customersData?.data?.userStats)
              ? customersData.data.userStats
              : []
            ).map((customer) => (
              <li
                key={customer._id}
                className="transition duration-200 border-b hover:bg-gray-100"
              >
                <ul className="flex justify-around text-sm text-gray-700">
                  <li className="w-12 px-4 py-3">1</li>
                  <li className="w-32 px-4 py-3">{customer.userName}</li>
                  <li className="w-32 px-4 py-3">{customer.completedOrders}</li>
                  <li className="w-32 px-4 py-3">{customer.canceledOrders}</li>
                  <li className="w-24 px-4 py-3">{customer.totalOrders}</li>
                  <li className="px-4 py-3 w-28">{customer.totalAmount}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerPerformanceReport;
