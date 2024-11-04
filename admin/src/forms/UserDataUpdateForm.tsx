import React, { useState } from "react";
import { UserType } from "../types/contentType";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

const initialUserData: UserType = {
  name: "",
  mobileNo: "",
  rDate: "",
  location: "",
  city: "",
  country: "",
  role: "",
};

const UserDataUpdateForm: React.FC = () => {
  const [userData, setUserData] = useState<UserType>(initialUserData);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("User Data Submitted:", userData);
  };

  const resetForm = () => {
    setUserData(initialUserData);
    navigate("/dashboard");
  };

  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] bg-white rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-gray-700">
              User Form
            </h2>
            <Link to={"/dashboard"}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
            <input
              value={userData.name}
              type="text"
              onChange={handleChange}
              name="name"
              className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
              placeholder="Name"
              required
            />
            <input
              value={userData.mobileNo}
              type="text"
              onChange={handleChange}
              name="mobileNo"
              className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
              placeholder="Mobile No."
              required
            />
            <input
              value={userData.rDate}
              type="date"
              onChange={handleChange}
              name="rDate"
              className="w-full h-10 px-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
              placeholder="Registration Date"
              required
            />
            <input
              value={userData.location}
              type="text"
              onChange={handleChange}
              name="location"
              className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
              placeholder="Location"
              required
            />
            <input
              value={userData.city}
              type="text"
              onChange={handleChange}
              name="city"
              className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
              placeholder="City"
              required
            />
            <input
              value={userData.country}
              type="text"
              onChange={handleChange}
              name="country"
              className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
              placeholder="Country"
              required
            />
            <input
              value={userData.role}
              type="text"
              onChange={handleChange}
              name="role"
              className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
              placeholder="Role"
              required
            />
          </div>
          <div className="flex">
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
              type="submit"
            >
              Update
            </button>
            <button
              className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDataUpdateForm;
