import  { useState } from 'react';
import { Download, TrendingUp } from 'lucide-react';

const billingData = {
  cloudServer: {
    title: "Cloud Server",
    plan: "Grow Plan",
    status: "Active",
    billingCycle: "Monthly",
    nextInvoice: {
      date: "Mar 01, 2024",
      amount: 4000.00
    }
  },
  billingPeriod: {
    currentPeriod: {
      label: "Current Period",
      value: "Jan 01, 2024 - Jan 31, 2024"
    },
    nextBillingDate: {
      label: "Next Billing Date",
      value: "Feb 01, 2024"
    },
    billingCycle: {
      label: "Billing Cycle",
      value: "Monthly"
    }
  },
  invoices: [
    {
      date: "2024-01-01",
      amount: 4000.00,
      status: "Paid"
    },
    {
      date: "2023-12-01",
      amount: 4000.00,
      status: "Paid"
    },
    {
      date: "2023-11-01",
      amount: 4000.00,
      status: "Paid"
    }
  ],
  billingCurrency: {
    country: "IN",
    currency: "INR"
  },
  billingDetails: {
    accountHolder: "John Doe",
    billingAddress: "123 Street Name, City, State, Zip Code",
    paymentMethod: "Credit Card (ending in 1234)"
  }
};

const BillingPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [billingDetails, setBillingDetails] = useState(billingData.billingDetails);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here, you can add functionality to save the updated billing details
    console.log("Updated Billing Details:", billingDetails);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">
        <h1 className="text-2xl font-bold mb-8">Billing</h1>
        
        {/* Cloud Server Section */}
        <ul className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <li className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{billingData.cloudServer.title}</h2>
                  <div className="flex items-center gap-2">
                    <span>{billingData.cloudServer.plan}</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {billingData.cloudServer.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    Billing {billingData.cloudServer.billingCycle} • 
                    Next invoice on {billingData.cloudServer.nextInvoice.date} 
                    for ₹{billingData.cloudServer.nextInvoice.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
              Upgrade Server
            </button>
          </li>
        </ul>

        {/* Billing Period Section */}
        <ul className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <li>
            <h2 className="text-xl font-semibold mb-4">Billing Period</h2>
            <ul className="grid grid-cols-3 gap-4">
              {Object.values(billingData.billingPeriod).map((item, index) => (
                <li key={index}>
                  <span className="block text-gray-600 text-sm">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Invoices Section */}
        <ul className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <li>
            <h2 className="text-xl font-semibold mb-4">Invoices</h2>
            <p className="text-gray-600 text-sm mb-4">
              You can download your recent invoices from this section
            </p>
            <ul className="divide-y">
              {billingData.invoices.map((invoice, index) => (
                <li key={index} className="py-4 flex items-center justify-between">
                  <span>{invoice.date}</span>
                  <span>₹{invoice.amount.toFixed(2)}</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    {invoice.status}
                  </span>
                  <button className="text-blue-600 flex items-center gap-1 text-sm">
                    <Download className="h-4 w-4" />
                    View
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Billing Currency Section */}
        <ul className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <li>
            <h2 className="text-xl font-semibold mb-4">Billing Currency</h2>
            <p className="text-gray-600">
              Your billing country is set to {billingData.billingCurrency.country} and 
              the currency is {billingData.billingCurrency.currency}.
            </p>
          </li>
        </ul>

        {/* Billing Details Section */}
        <ul className="bg-white rounded-lg shadow-sm p-6">
          <li>
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            {isEditing ? (
              <div className="space-y-2">
                <div>
                  <label className="block text-gray-600">Account Holder</label>
                  <input
                    type="text"
                    name="accountHolder"
                    value={billingDetails.accountHolder}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Billing Address</label>
                  <input
                    type="text"
                    name="billingAddress"
                    value={billingDetails.billingAddress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Payment Method</label>
                  <input
                    type="text"
                    name="paymentMethod"
                    value={billingDetails.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p><strong>Account Holder:</strong> {billingDetails.accountHolder}</p>
                <p><strong>Billing Address:</strong> {billingDetails.billingAddress}</p>
                <p><strong>Payment Method:</strong> {billingDetails.paymentMethod}</p>
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 mt-4 text-sm text-blue-600 border rounded-md hover:bg-gray-50"
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BillingPage;
