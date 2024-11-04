import { useState } from 'react';
import { format } from 'date-fns';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetRequest } from '../api/adminGetApi';
import axios from 'axios';
import useRestaurants from "../hooks/useRestaurants";

const SettlementsComponent = () => {
  const queryClient = useQueryClient();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [formData, setFormData] = useState({
    restaurantId: '',
    allocationAmount: 3000,
    status: 'Pending',
    transactionMode: 'Cash',
    remarks: '',
    paidAmount: '',
    settlementDate: format(new Date(), 'dd/MM/yyyy'),
  });

  // Fetch restaurant data
  const { 
    isError: restaurantIsError,
    data: restaurantsResponse, 
    error: restaurantError
  } = useRestaurants();
  const restaurants = restaurantsResponse?.data?.data || [];

  // Fetch settlements data
  const { 
    data: settlementsData, 
    isLoading: settlementsLoading, 
    isError: settlementsIsError,
    error: settlementsErrorData,
    refetch
  } = useQuery({
    queryKey: ['settlements', selectedRestaurantId],
    queryFn: async () => {
      if (!selectedRestaurantId) return { data: { data: [] } };
      const response = await apiGetRequest({
        url: `/settle/admin/tickets?restaurantId=${selectedRestaurantId}`,
      });
      return response;
    },
    enabled: !!selectedRestaurantId,
    retry: 2,
    retryDelay: 1000,
  });

  // Allocate Amount Mutation
  const allocateAmountMutation = useMutation({
    mutationFn: async () => {
      const allocationData = {
        restaurantId: selectedRestaurantId,
        allocationAmount: formData.allocationAmount,
      };
      const response = await axios.put('/admin/allocate', allocationData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['settlements', selectedRestaurantId]);
      setIsAllocationModalOpen(false);
      alert('Amount allocated successfully!');
    },
    onError: (error) => {
      console.error('Error allocating amount:', error);
      alert('Failed to allocate amount. Please try again.');
    }
  });

  // Update Settlement Mutation
  const updateSettlementMutation = useMutation({
    mutationFn: async () => {
      const updatedData = {
        restaurantId: formData.restaurantId,
        ticketId: selectedSettlement.ticketId,
        status: formData.status,
        transactionMode: formData.transactionMode,
        settlementDate: formData.settlementDate,
        remarks: formData.remarks,
        paidAmount: formData.paidAmount,
      };
      const response = await axios.put('/admin/update', updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['settlements', selectedRestaurantId]);
      setIsEditModalOpen(false);
      setSelectedSettlement(null);
      alert('Settlement updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating settlement:', error);
      alert('Failed to update settlement. Please try again.');
    }
  });

  // Handle allocation form submission
  const handleAllocationSubmit = (e) => {
    e.preventDefault();
    allocateAmountMutation.mutate();
  };

  // Modal form component
  const FormModal = ({ isOpen, onClose, onSubmit, title }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {title === 'Allocate Amount' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allocation Amount</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={formData.allocationAmount} 
                    required 
                    onChange={(e) => setFormData({ ...formData, allocationAmount: parseFloat(e.target.value) })} 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            )}
            {title === 'Edit Settlement' && (
              <>
                <input type="number" step="0.01" value={formData.paidAmount} placeholder="Paid Amount" onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })} className="w-full p-2 border rounded-md" />
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full p-2 border rounded-md">
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Complete">Complete</option>
                </select>
                <input type="text" value={formData.transactionMode} placeholder="Transaction Mode" onChange={(e) => setFormData({ ...formData, transactionMode: e.target.value })} className="w-full p-2 border rounded-md" />
                <input type="text" value={formData.settlementDate} placeholder="Settlement Date (dd/MM/yyyy)" onChange={(e) => setFormData({ ...formData, settlementDate: e.target.value })} className="w-full p-2 border rounded-md" />
                <textarea value={formData.remarks} placeholder="Remarks" onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full p-2 border rounded-md" />
              </>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
              {title === 'Allocate Amount' ? 'Allocate' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Main component return
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settlement Management</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Restaurant</label>
        <select value={selectedRestaurantId} onChange={(e) => { setSelectedRestaurantId(e.target.value); setFormData({...formData, restaurantId: e.target.value }); }} className="w-full p-2 border rounded-md">
          <option value="">-- Select Restaurant --</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>
          ))}
        </select>
      </div>

      {selectedRestaurantId && (
        <div className="mb-4">
          <button 
            onClick={() => setIsAllocationModalOpen(true)} 
            className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Allocate Amount
          </button>
        </div>
      )}

      {settlementsLoading ? (
        <div className="text-center py-4">Loading settlements...</div>
      ) : settlementsIsError ? (
        <div className="text-red-600 py-4">Error fetching settlements: {settlementsErrorData?.message || 'Unknown error'}</div>
      ) : settlementsData?.data?.data?.length === 0 ? (
        <div className="text-center py-4">No settlements found for this restaurant</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b">Paid Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b">Remarks</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {settlementsData?.data?.data.map((settlement) => (
                <tr key={settlement.ticketId}>
                  <td className="px-6 py-4 border-b">{settlement.amount}</td>
                  <td className="px-6 py-4 border-b">{settlement.paidAmount}</td>
                  <td className="px-6 py-4 border-b">{settlement.status}</td>
                  <td className="px-6 py-4 border-b">{settlement.settlementDate}</td>
                  <td className="px-6 py-4 border-b">{settlement.remarks}</td>
                  <td className="px-6 py-4 border-b">
                    <button onClick={() => { setSelectedSettlement(settlement); setIsEditModalOpen(true); }} className="text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Allocation Modal */}
      <FormModal
        isOpen={isAllocationModalOpen}
        onClose={() => setIsAllocationModalOpen(false)}
        onSubmit={handleAllocationSubmit}
        title="Allocate Amount"
      />

      {/* Edit Settlement Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          updateSettlementMutation.mutate();
        }}
        title="Edit Settlement"
      />
    </div>
  );
};

export default SettlementsComponent;