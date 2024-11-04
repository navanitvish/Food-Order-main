import { FaUserCircle } from "react-icons/fa";

interface ProfileModal {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;

  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const ProfileModal: React.FC<ProfileModal> = ({
  isOpen,
  onClose,
  isAuthenticated,
  onLogin,
  onLogout,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed p-6 bg-white rounded-lg shadow-lg top-20 right-10 w-80">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <FaUserCircle size="4em" className="mb-4 text-gray-700" />
          <h2 className="mb-4 text-xl font-bold">Profile</h2>
          {isAuthenticated ? (
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={onLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
