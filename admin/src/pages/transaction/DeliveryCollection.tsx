// import { useState } from "react";
// import { Search, RotateCcw } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { apiGetRequest } from "../../api/adminGetApi";

// const DeliveryCollection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [driverId, setDriverId] = useState(null); // State to hold the selected driverId
//   const navigate = useNavigate();

//   // Fetch delivery data from API only if driverId is defined
//   const {
//     data: deliveryData = [], // Default to an empty array if no data
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["driver/cash-in-hand", driverId],
//     queryFn: () =>
//       driverId
//         ? apiGetRequest({
//             url: `/drivertransaction/${driverId}`, // Fetch transactions for the selected driver
//           })
//         : Promise.resolve([]), // Return empty array if no driverId
//     enabled: !!driverId, // Only fetch if driverId is defined
//   });

//   console.log("deliveryData", deliveryData);

//   // Handle loading state
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // Handle error state
//   if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   // Filter the delivery data based on the search query
//   const filteredData = deliveryData.filter(
//     (person) =>
//       person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       person.phone.includes(searchQuery)
//   );

//   // Calculate total cash in hand
//   const totalCash = deliveryData.reduce(
//     (sum, item) => sum + item.cashInHand,
//     0
//   );

//   // Handle search input change
//   const handleSearch = (event) => setSearchQuery(event.target.value);

//   // Placeholder function for exporting CSV
//   const handleExportCSV = () => console.log("Exporting as CSV...");

//   // Reset search filters
//   const handleResetFilters = () => setSearchQuery("");

//   // Placeholder function for processing delivery person
//   const handleProcess = (id) => console.log("Processing delivery person:", id);

//   // Navigate to logs for a specific driver
//   const handleViewLogs = (id) => {
//     console.log("Navigating to logs for ID:", id);
//     navigate(`/delivery-logs/${id}`); // This will redirect to the logs page with the driver ID
//   };

//   // Change the current page in pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Calculate pagination values
//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
//   const currentEntries = filteredData.slice(
//     indexOfFirstEntry,
//     indexOfLastEntry
//   );
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-sm">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-bold">Delivery Collection</h1>
//         <button
//           onClick={handleResetFilters}
//           className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
//         >
//           <RotateCcw className="w-4 h-4" />
//           Reset All Filters
//         </button>
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <div className="relative w-1/3">
//           <input
//             type="text"
//             placeholder="Search with anything..."
//             className="w-full py-2 pl-4 pr-10 border rounded-md"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 right-3 top-1/2" />
//         </div>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleExportCSV}
//             className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
//           >
//             Export as CSV
//           </button>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
//             className="px-3 py-2 border rounded-md"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={50}>50</option>
//           </select>
//         </div>
//       </div>

//       <ul className="overflow-hidden border rounded-lg">
//         <li className="grid grid-cols-5 gap-4 px-6 py-3 border-b bg-gray-50">
//           <span className="font-medium text-gray-600">Delivery Guy Name</span>
//           <span className="font-medium text-gray-600">Phone</span>
//           <span className="font-medium text-gray-600">Cash in Hand</span>
//           <span className="font-medium text-gray-600"></span>
//           <span className="font-medium text-gray-600"></span>
//         </li>

//         {currentEntries.map((person) => (
//           <li
//             key={person.id}
//             className="grid grid-cols-5 gap-4 px-6 py-4 border-b hover:bg-gray-50"
//           >
//             <span className="text-blue-600">{person.name}</span>
//             <span>{person.phone}</span>
//             <span>₹{person.cashInHand.toFixed(2)}</span>
//             <span>
//               <button
//                 onClick={() => handleProcess(person.id)}
//                 className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//               >
//                 Process
//               </button>
//             </span>
//             <span>
//               <button
//                 onClick={() => handleViewLogs(person.id)}
//                 className="px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
//               >
//                 View Logs
//               </button>
//             </span>
//           </li>
//         ))}

//         <li className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50">
//           <span></span>
//           <span className="font-medium text-right">Total:</span>
//           <span className="font-medium">₹{totalCash.toFixed(2)}</span>
//           <span></span>
//           <span></span>
//         </li>
//       </ul>

//       <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
//         <span>
//           Showing {indexOfFirstEntry + 1} to {indexOfLastEntry} of{" "}
//           {filteredData.length} entries
//         </span>
//         <div className="flex gap-2">
//           <button
//             className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             ←
//           </button>
//           {pageNumbers.map((page) => (
//             <button
//               key={page}
//               className={`px-3 py-1 border rounded-md ${
//                 currentPage === page
//                   ? "bg-blue-500 text-white"
//                   : "hover:bg-gray-50"
//               }`}
//               onClick={() => handlePageChange(page)}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryCollection;
