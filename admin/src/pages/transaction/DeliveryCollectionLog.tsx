// import{ useState, useEffect } from 'react';
// import { Search, ChevronDown, ChevronUp } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';

// const DeliveryCollectionLogs = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDelivery, setSelectedDelivery] = useState(null);
//   const [deliveryPerson, setDeliveryPerson] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Mock delivery persons data - in a real app, this would come from an API
//   const mockDeliveryPersons = [
//     { id: "1", name: "Suresh", phone: "+919841233822" },
//     { id: "2", name: "Ramesh", phone: "+919841232225" },
//     { id: "3", name: "Rupak Delivery", phone: "+91984123*******" },
//     { id: "4", name: "Delivery Guy 2", phone: "+919352264221" },
//     { id: "5", name: "Partner", phone: "+919841*******" }
//   ];

//   useEffect(() => {
//     const fetchDeliveryPerson = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         // Validate ID
//         if (!id) {
//           throw new Error('No delivery person ID provided');
//         }

//         console.log('Debug: Current delivery person ID:', id);

//         // Simulate API call with mock data
//         const person = mockDeliveryPersons.find(p => p.id === id);

//         if (!person) {
//           throw new Error(`No delivery person found with ID: ${id}`);
//         }

//         setDeliveryPerson(person);

//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 500));
//       } catch (err) {
//         console.error('Error fetching delivery person:', err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDeliveryPerson();
//   }, [id]);

//   const deliveryLogs = deliveryPerson ? [
//     {
//       id: 1,
//       name: deliveryPerson.name,
//       phone: deliveryPerson.phone,
//       amount: 3000.00,
//       message: '',
//       date: '2024-09-08 - 04:41 PM',
//       collectedBy: 'Admin'
//     },
//     {
//       id: 2,
//       name: deliveryPerson.name,
//       phone: deliveryPerson.phone,
//       amount: 20.00,
//       message: '',
//       date: '2024-09-07 - 07:34 PM',
//       collectedBy: 'Admin'
//     }
//   ] : [];

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const SortIndicator = ({ column }) => {
//     if (sortConfig.key !== column) {
//       return <ChevronDown className="w-4 h-4" />;
//     }
//     return sortConfig.direction === 'asc' ?
//       <ChevronUp className="w-4 h-4" /> :
//       <ChevronDown className="w-4 h-4" />;
//   };

//   const DeliveryDetailsModal = ({ delivery, onClose }) => {
//     if (!delivery) return null;

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="w-full max-w-md p-6 bg-white rounded-lg">
//           <h2 className="mb-4 text-xl font-semibold">Delivery Details</h2>
//           <div className="space-y-3">
//             <p><span className="font-medium">Name:</span> {delivery.name}</p>
//             <p><span className="font-medium">Phone:</span> {delivery.phone}</p>
//             <p><span className="font-medium">Amount:</span> ₹{delivery.amount.toFixed(2)}</p>
//             <p><span className="font-medium">Message:</span> {delivery.message || 'N/A'}</p>
//             <p><span className="font-medium">Date:</span> {delivery.date}</p>
//             <p><span className="font-medium">Collected By:</span> {delivery.collectedBy}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full p-6 mx-auto bg-white rounded-lg shadow">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-gray-600">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full p-6 mx-auto bg-white rounded-lg shadow">
//         <div className="flex flex-col items-center justify-center h-64">
//           <div className="mb-4 text-red-600">{error}</div>
//           <button
//             onClick={() => navigate('/delivery-collection')}
//             className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//           >
//             Back to List
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-6 mx-auto bg-white rounded-lg shadow">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-semibold">
//           Delivery Collection Logs - {deliveryPerson?.name}
//         </h1>
//         <div className="flex gap-4">
//           <button
//             onClick={() => navigate('/delivery-collection')}
//             className="px-4 py-2 border rounded-md hover:bg-gray-50"
//           >
//             Back to List
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <div className="relative flex-1 max-w-md">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search with anything..."
//             className="w-full px-4 py-2 pr-10 border rounded-md"
//           />
//           <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 right-3 top-1/2" />
//         </div>
//       </div>

//       <ul className="border-t border-b">
//         <li className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50">
//           <span className="flex-1">Delivery Guy Name</span>
//           <span className="flex-1">Phone</span>
//           <span
//             className="flex items-center flex-1 gap-1 cursor-pointer"
//             onClick={() => handleSort('amount')}
//           >
//             Amount
//             <SortIndicator column="amount" />
//           </span>
//           <span className="flex-1">Message</span>
//           <span
//             className="flex items-center flex-1 gap-1 cursor-pointer"
//             onClick={() => handleSort('date')}
//           >
//             Date
//             <SortIndicator column="date" />
//           </span>
//           <span className="flex-1">Collected By</span>
//           <span className="w-24"></span>
//         </li>
//       </ul>

//       <ul className="divide-y">
//         {deliveryLogs.map((delivery) => (
//           <li key={delivery.id} className="flex items-center px-4 py-3 hover:bg-gray-50">
//             <span className="flex-1 text-blue-500">{delivery.name}</span>
//             <span className="flex-1">{delivery.phone}</span>
//             <span className="flex-1">₹{delivery.amount.toFixed(2)}</span>
//             <span className="flex-1">{delivery.message || '-'}</span>
//             <span className="flex-1">{delivery.date}</span>
//             <span className="flex-1">{delivery.collectedBy}</span>
//             <span className="w-24">
//               <button
//                 onClick={() => {
//                   setSelectedDelivery(delivery);
//                   setIsModalOpen(true);
//                 }}
//                 className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//               >
//                 View Details
//               </button>
//             </span>
//           </li>
//         ))}
//       </ul>

//       {isModalOpen && (
//         <DeliveryDetailsModal
//           delivery={selectedDelivery}
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedDelivery(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default DeliveryCollectionLogs;
