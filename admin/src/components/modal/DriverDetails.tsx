import { useState } from "react";

export interface DriverPropsType {
  onClose: () => void;
}
const DriverDetials = ({ onClose }: DriverPropsType) => {
  const [activeTab, setActiveTab] = useState("driver");

  const dummyDriverDetails = {
    drivingLicence: ["DL12345", "DL67890"],
    diverRc: "RC123456",
    vehiclePlate: "ABC1234",
    adharCardNumber: ["1234-5678-9876", "9876-5432-1234"],
    vehicleDetails: "Honda City, 2020 Model",
    pencard: ["PAN123456", "PAN789101"],
  };

  const dummyPaymentDetails = {
    paymentType: "bank",
    bankName: "XYZ Bank",
    ifscCode: "XYZB0001234",
    accountNumber: "1234567890",
    upiId: "user@upi",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Driver & Payment Details</h2>
          <button onClick={onClose} className="font-bold text-red-500">
            X
          </button>
        </div>
        <div className="flex justify-around border-b">
          <button
            className={`p-4 ${
              activeTab === "driver" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("driver")}
          >
            Driver Details
          </button>
          <button
            className={`p-4 ${
              activeTab === "payment" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Details
          </button>
        </div>
        <div className="p-4">
          {activeTab === "driver" ? (
            <div>
              <h3 className="font-bold">Driving Licence</h3>
              <ul className="mb-2">
                {dummyDriverDetails.drivingLicence.map((licence, index) => (
                  <li key={index}>{licence}</li>
                ))}
              </ul>
              <p>
                <strong>Driver RC:</strong> {dummyDriverDetails.diverRc}
              </p>
              <p>
                <strong>Vehicle Plate:</strong>{" "}
                {dummyDriverDetails.vehiclePlate}
              </p>
              <p>
                <strong>Aadhar Card:</strong>
              </p>
              <ul className="mb-2">
                {dummyDriverDetails.adharCardNumber.map((adhar, index) => (
                  <li key={index}>{adhar}</li>
                ))}
              </ul>
              <p>
                <strong>Vehicle Details:</strong>{" "}
                {dummyDriverDetails.vehicleDetails}
              </p>
              <p>
                <strong>PAN Card:</strong>
              </p>
              <ul className="mb-2">
                {dummyDriverDetails.pencard.map((pan, index) => (
                  <li key={index}>{pan}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p>
                <strong>Payment Type:</strong> {dummyPaymentDetails.paymentType}
              </p>
              {dummyPaymentDetails.paymentType === "bank" && (
                <>
                  <p>
                    <strong>Bank Name:</strong> {dummyPaymentDetails.bankName}
                  </p>
                  <p>
                    <strong>IFSC Code:</strong> {dummyPaymentDetails.ifscCode}
                  </p>
                  <p>
                    <strong>Account Number:</strong>{" "}
                    {dummyPaymentDetails.accountNumber}
                  </p>
                </>
              )}
              {dummyPaymentDetails.paymentType === "upi" && (
                <p>
                  <strong>UPI ID:</strong> {dummyPaymentDetails.upiId}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDetials;
