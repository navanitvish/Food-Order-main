import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AssignDelivery = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const deliveryOptions = ["John Doe", "Jane Smith", "Alex Johnson"];
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState("");

  const handleAssign = () => {
    if (selectedDeliveryPerson) {
      // Here, you might want to save the assignment (e.g., API call)
      alert(
        `Delivery assigned to ${selectedDeliveryPerson} for Order ${orderId}`
      );
      navigate("/");
    } else {
      alert("Please select a delivery person.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Assign Delivery for Order {orderId}
      </h2>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Choose a Delivery Guy:
      </label>
      <select
        value={selectedDeliveryPerson}
        onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select Delivery Guy</option>
        {deliveryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleAssign}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Assign Delivery
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:underline"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default AssignDelivery;
