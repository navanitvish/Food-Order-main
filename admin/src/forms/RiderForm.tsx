import { ChangeEvent, FormEvent, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router";

const initialRiderData = {
  id: 0,
  name: "",
  age: 0,
  gender: "",
  city: "",
  rating: 0,
  contactNumber: "",
  description: "",
};

const RiderForm = () => {
  const [riderData, setRiderData] = useState(initialRiderData);
  const [isOpen, setOpen] = useState({ gender: false });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setRiderData({
      ...riderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setRiderData({
      ...riderData,
      [field]: value,
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    // handle form submission
  };

  const clearHandler = () => {
    setRiderData(initialRiderData);
    navigate("/rider");
  };
  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden bg-white rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-gray-700">
              Rider Form
            </h2>
            <div onClick={clearHandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 cursor-pointer hover:text-orange-600 text-sky-600" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={riderData.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Rider Name"
                required
              />
              <input
                value={riderData.age || ""}
                type="number"
                onChange={handleChange}
                name="age"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Age"
                required
              />
              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() => setOpen({ ...isOpen, gender: !isOpen.gender })}
                >
                  {riderData.gender !== "" ? riderData.gender : "Select Gender"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-28 bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.gender ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {["Male", "Female", "Other"].map((gender, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        riderData.gender === gender ? "bg-rose-600" : ""
                      }`}
                      onClick={() => handleSelectChange("gender", gender)}
                    >
                      <span>{gender}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <input
                value={riderData.city}
                type="text"
                onChange={handleChange}
                name="city"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="City"
                required
              />
              <input
                value={riderData.rating || ""}
                type="number"
                step="0.1"
                onChange={handleChange}
                name="rating"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Rating"
                required
              />
              <input
                value={riderData.contactNumber}
                type="text"
                onChange={handleChange}
                name="contactNumber"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Contact Number"
                required
              />
              <textarea
                value={riderData.description}
                onChange={handleChange}
                name="description"
                className="w-full h-24 py-4 pl-4 font-medium border border-gray-400 rounded-md outline-none md:col-span-2 focus-within:border-blue-400"
                placeholder="Description"
                required
              />
            </div>
            <div className="flex">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400 disabled:bg-gray-400"
                type="submit"
                disabled={
                  !riderData.age ||
                  !riderData.city ||
                  !riderData.contactNumber ||
                  !riderData.description ||
                  !riderData.gender ||
                  !riderData.name ||
                  !riderData.rating
                }
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
                type="button"
                onClick={clearHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RiderForm;
