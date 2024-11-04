const ImgaeShowModel = ({
  imageSrc,
  imageName,
  closeModal,
}: {
  imageSrc: string;
  imageName: string;
  closeModal: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
          onClick={closeModal}
        >
          ✕
        </button>

        {/* Image and Name */}
        <div className="text-center">
          <img
            src={imageSrc}
            alt={imageName}
            className="mx-auto mb-4 max-h-64"
          />
          <h2 className="text-xl font-semibold">{imageName}</h2>
        </div>
      </div>
    </div>
  );
};

export default ImgaeShowModel;
