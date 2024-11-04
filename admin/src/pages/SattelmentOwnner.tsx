import React, { useState } from 'react';
import { format } from 'date-fns';

const SattelmentOwnner = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [formData, setFormData] = useState({
    restaurant: '',
    settlementReceived: 'Pending',
    amount: '',
    uploadedCode: '',
    payableBalance: '',
    payoutRequested: '',
    totalBalance: '',
    lastPayoutRequestedAt: null
  });

  // Enhanced sample data
  const [settlements, setSettlements] = useState([
    {
      id: 1,
      restaurant: "Tasty Bites",
      settlementReceived: "Completed",
      amount: 2500,
      uploadedCode: "TBS001",
      payableBalance: 1238.00,
      payoutRequested: 800.00,
      totalBalance: 2038.00,
      lastPayoutRequestedAt: "2023-12-21T04:31:00"
    },
    {
      id: 2,
      restaurant: "Spice Garden",
      settlementReceived: "Pending",
      amount: 3200,
      uploadedCode: "SGS002",
      payableBalance: 0.00,
      payoutRequested: 0.00,
      totalBalance: 0.00,
      lastPayoutRequestedAt: null
    },
    {
      id: 3,
      restaurant: "Pizza Palace",
      settlementReceived: "Completed",
      amount: 1800,
      uploadedCode: "PPS003",
      payableBalance: 6425.00,
      payoutRequested: 1706.00,
      totalBalance: 8131.00,
      lastPayoutRequestedAt: "2023-05-20T14:27:00"
    }
  ]);

  const getStatusStyle = (status) => {
    return status === "Completed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return format(new Date(timestamp), 'dd-MM-yyyy hh:mm a');
  };

  const calculateTotalBalance = (payableBalance, payoutRequested) => {
    return payableBalance + payoutRequested;
  };

  const handleEdit = (settlement) => {
    setSelectedSettlement(settlement);
    setFormData(settlement);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      restaurant: '',
      settlementReceived: 'Pending',
      amount: '',
      uploadedCode: '',
      payableBalance: 0,
      payoutRequested: 0,
      totalBalance: 0,
      lastPayoutRequestedAt: null
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const totalBalance = calculateTotalBalance(
      Number(formData.payableBalance),
      Number(formData.payoutRequested)
    );
    const updatedData = {
      ...formData,
      totalBalance,
      lastPayoutRequestedAt: formData.payoutRequested > 0 ? new Date().toISOString() : formData.lastPayoutRequestedAt
    };

    const updatedSettlements = settlements.map(settlement =>
      settlement.id === selectedSettlement.id ? { ...updatedData, id: settlement.id } : settlement
    );
    setSettlements(updatedSettlements);
    setIsEditModalOpen(false);
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const totalBalance = calculateTotalBalance(
      Number(formData.payableBalance),
      Number(formData.payoutRequested)
    );
    const newSettlement = {
      ...formData,
      id: settlements.length + 1,
      totalBalance,
      lastPayoutRequestedAt: formData.payoutRequested > 0 ? new Date().toISOString() : null
    };
    setSettlements([...settlements, newSettlement]);
    setIsAddModalOpen(false);
  };

  const FormModal = ({ isOpen, onClose, onSubmit, title, data }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                value={formData.restaurant}
                onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Settlement Status
              </label>
              <select
                value={formData.settlementReceived}
                onChange={(e) => setFormData({ ...formData, settlementReceived: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payable Balance
              </label>
              <input
                type="number"
                value={formData.payableBalance}
                onChange={(e) => setFormData({ ...formData, payableBalance: Number(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payout Requested
              </label>
              <input
                type="number"
                value={formData.payoutRequested}
                onChange={(e) => setFormData({ ...formData, payoutRequested: Number(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {title === "Edit Settlement" ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Summary Section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 max-w-3xl">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800">Total Payable Balance</h3>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(settlements.reduce((sum, item) => sum + item.payableBalance, 0))}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-purple-800">Total Payout Requested</h3>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(settlements.reduce((sum, item) => sum + item.payoutRequested, 0))}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-green-800">Total Balance</h3>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(settlements.reduce((sum, item) => sum + item.totalBalance, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 mt-6">
          <h2 className="text-2xl font-bold">Store Balance Report</h2>
          <div className="space-x-2">
            <button
              onClick={() => {/* Add export logic */ }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export to XLS
            </button>
            <button
              onClick={() => {/* Add print logic */ }}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Print Report
            </button>
            {/* <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Store
            </button> */}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Store Name</th>
                <th className="px-4 py-3 text-right">Payable Balance</th>
                <th className="px-4 py-3 text-right">Payout Requested</th>
                <th className="px-4 py-3 text-right">Total Balance</th>
                <th className="px-4 py-3 text-left">Last Payout Requested Date & Time</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement, index) => (
                <tr
                  key={settlement.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{settlement.id}</td>
                  <td className="px-4 py-3 font-medium">{settlement.restaurant}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(settlement.payableBalance)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(settlement.payoutRequested)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(settlement.totalBalance)}</td>
                  <td className="px-4 py-3">{formatDateTime(settlement.lastPayoutRequestedAt)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEdit(settlement)}
                      className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <FormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSubmitEdit}
          title="Edit Store Balance"
          data={selectedSettlement}
        />

        <FormModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleSubmitAdd}
          title="Add Store Balance"
          data={null}
        />
      </div>
    </div>
  );
};

export default SattelmentOwnner;