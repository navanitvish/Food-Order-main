import { Restaurant } from "../../types/contentType";
import LeafLeatMap from "../map/LeafLeatMap";

// export interface MapDataType<T> {
//   [key: string]: T;
//   //   location: number[];
//   //   address: string;
// }

const MapModel = ({
  datahandler,
  closeModal,
  updatevalue,
}: {
  datahandler: (data: Restaurant) => void;
  closeModal: () => void;
  updatevalue: Restaurant;
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

        {/* map */}
        <div className="mt-4">
          <LeafLeatMap
            restaurantData={updatevalue}
            handlerLocation={datahandler}
          />
        </div>
      </div>
    </div>
  );
};

export default MapModel;
