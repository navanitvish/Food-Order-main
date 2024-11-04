import { useState } from "react";
import { FileUp } from "lucide-react";

const PushNotification = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [image, setImage] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");

  const [isDragging, setIsDragging] = useState(false);

  // Stats data
  const stats = [
    { value: 74, label: "REGISTERED CUSTOMERS", color: "text-gray-600" },
    { value: 62, label: "SUBSCRIBERS", color: "text-gray-600" },
    { value: 102, label: "APP USERS", color: "text-gray-600" },
    { value: 376, label: "DELETE JUNK DATA", color: "text-red-500" },
  ];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          setImage(result); // This should now work without errors
        } else {
          console.error("Failed to load image: result is not a string.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="p-6 mx-auto ">
      <h2>Push Notification</h2>
      {/* Stats Section */}
      <ul className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <li key={index} className="p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-2 text-3xl font-bold">{stat.value}</div>
            <div className={`text-sm ${stat.color}`}>{stat.label}</div>
          </li>
        ))}
      </ul>

      {/* Main Content */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="mb-6 text-lg font-medium">
          SEND PUSH NOTIFICATION & ALERT TO ALL USERS
        </h2>

        {/* Options List */}
        <ul className="mb-8 space-y-2">
          <li>
            <button
              onClick={() => setSelectedOption("all")}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedOption === "all"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              To All
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedOption("selected")}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedOption === "selected"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              To Selected
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedOption("nonregistered")}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedOption === "nonregistered"
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              To Non-Registered App Users
            </button>
          </li>
        </ul>

        {/* Notification Form */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Notification Image:
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {image ? (
                <img src={image} alt="Preview" className="mx-auto max-h-48" />
              ) : (
                <div className="space-y-2">
                  <FileUp className="w-12 h-12 mx-auto text-gray-400" />
                  <div className="text-gray-600">Drop files here to upload</div>
                  <div className="text-sm text-gray-500">
                    Image size: 1600x1100
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span>Notification Title:
            </label>
            <input
              type="text"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
              placeholder="Notification Title"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Message Input - Optional based on your needs */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your message here..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushNotification;
