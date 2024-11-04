import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import { Map as LeafletMap } from "leaflet";
import { Restaurant } from "../../types/contentType";

// Fix marker icons for Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// export interface MapDataType {
//   location: number[];
//   address: string;
// }

export interface PropsType {
  handlerLocation: (data: Restaurant) => void;
  restaurantData: Restaurant;
}

const LeafLeatMap = ({ handlerLocation, restaurantData }: PropsType) => {
  const mapToken = import.meta.env.VITE_MAP_LOCATIONIQ_TOKEN;

  console.log("frommap", mapToken);
  const [position, setPosition] = useState<[number, number]>(
    restaurantData?.location?.coordinates || [19.24316, 73.12256]
  ); // Default position (latitude, longitude)
  const [address, setAddress] = useState<string>(restaurantData.address || "");
  const [searchInput, setSearchInput] = useState<string>(
    restaurantData.address || ""
  );

  const mapRef = useRef<LeafletMap | null>(null);

  console.log("from map>>", address, position);

  // Hook to handle map events
  const MapClickHandler = () => {
    useMapEvents({
      click: async (event) => {
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;
        setPosition([lat, lng]);
        const fetchedAddress = await getAddress(lat, lng); // Function to get address
        setAddress(fetchedAddress);

        handlerLocation({
          ...restaurantData,
          location: {
            type: "Point",
            coordinates: [lng, lat], //longitude , latitude
          },
          address: fetchedAddress,
        }); // Call parent function to update state with location and address
      },
    });
    return null;
  };

  // Function to fetch address using Geocoding API
  const getAddress = async (lat: number, lng: number): Promise<string> => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${mapToken}`
      //   `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=905f90f2d452409fb5b6a2c7d650d008&language=en&pretty=1`
      //   `https://us1.locationiq.com/v1/reverse?key=${mapToken}&lat=${lat}&lon=${lng}&format=json&`
      //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );
    const data = await response.json();
    console.log(data);

    if (data.features && data.features.length > 0) {
      return data.features[0].properties.formatted; // Get formatted address
    } else {
      return "Address not found";
    }
  };

  const getCoordinates = async (search: string) => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        search
      )}&apiKey=${mapToken}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const { lat, lon } = data.features[0].properties;
      setPosition([lat, lon]);

      const fetchedAddress = data.features[0].properties.formatted;
      setAddress(fetchedAddress);
      if (mapRef.current) {
        mapRef.current.flyTo([lat, lon], 13); // Animate map movement
      }
      //   handlerLocation({ location: [lat, lon], address: fetchedAddress });
      handlerLocation({
        ...restaurantData,
        location: {
          type: "Point",
          coordinates: [lon, lat], //longitude , latitude
        },
        address: fetchedAddress,
      });
    } else {
      alert("Location not found");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getCoordinates(searchInput);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-2">
        <input
          type="text"
          className="w-full h-10 pl-4 pr-2 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a location"
          //   style={{ padding: "10px", marginRight: "10px" }}
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-400 rounded-md"
        >
          Search
        </button>
      </form>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} />
        <MapClickHandler />
      </MapContainer>
      <p>Selected Address: {address}</p>
    </div>
  );
};

export default LeafLeatMap;
