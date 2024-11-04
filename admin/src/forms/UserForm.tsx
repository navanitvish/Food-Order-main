import React, { useState } from "react";

import { TiArrowBackOutline } from "react-icons/ti";

import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/userApi";
import { toast } from "react-toastify";

import {
  MutationObjectUserType,
  UserCreatSendingData,
  UserData,
} from "../types/contentType";
import { FaCaretDown } from "react-icons/fa";

export interface UpdateDataType {
  name: string;
  email: string;
  role: string;
}

export interface UserFormState {
  isCreate: boolean;
  updateId: string;
  updateData: UpdateDataType; // Adjust this type based on the actual structure of updateData
}

// Define the types for the props
interface UserCategoryProps {
  isUserForm: UserFormState;
  setUserDetails: React.Dispatch<React.SetStateAction<UserFormState>>;
  //   setUserDetails: React.Dispatch<React.SetStateAction<UserFormState>>;
  //   closeHandler: () => void;
  refetch: () => void;
}

export interface FormCategoryStateType {
  name: string;
  email: string;
  role: string;
}

const UserForm: React.FC<UserCategoryProps> = ({
  isUserForm,
  setUserDetails,
  refetch,
}) => {
  const [categoryDataForm, setCategoryDataForm] =
    useState<FormCategoryStateType>({
      name: isUserForm.updateData.name || "",
      email: isUserForm.updateData.email || "",
      role: isUserForm.updateData.role || "",
    });

  const [isOpen, setOpen] = useState({
    role: false,
  });
  const isUpdate = isUserForm.isCreate
    ? false
    : Object.values(isUserForm?.updateData ?? []).length !== 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let checked: boolean | undefined;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setCategoryDataForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const mutation = useMutation<
    ApiResponse<UserData>,
    ApiError,
    MutationObjectUserType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<UserCreatSendingData, UserData>({
          url: path,
          method: condition === "creat" ? "post" : "put",
          data: data,
        });

        // return { data: response.data };
        return response;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    // onSuccess: (data: ApiResponse<DeletCategoryData>) => {
    onSuccess: (data) => {
      console.log(data);
      refetch();
      toast.dismiss();
      closeHandler();
      toast.success(`${isUpdate ? "Update Successfull" : "Creat Successfull"}`);

      setCategoryDataForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        role: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  console.log(
    isUpdate ? "Put" : "Post",
    isUpdate,
    isUserForm?.updateData,
    Object.values(isUserForm?.updateData ?? [])
  );

  const submiteHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(categoryDataForm);

    // const categaryData: CategorySendingPostType = {
    //   name: categoryDataForm.categoryName,
    //   image: categoryDataForm.image,
    // };

    if (isUserForm.isCreate) {
      console.log("now creat");
      mutation.mutate({
        path: "/user",
        condition: "creat",
        data: categoryDataForm,
      });
    }

    if (isUserForm.updateId) {
      console.log("update Id");
      mutation.mutate({
        path: `/user/${isUserForm.updateId}`,
        condition: "update",
        data: categoryDataForm,
      });
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setCategoryDataForm({
      ...categoryDataForm,
      [field]: value,
    });
    setOpen((prev) => ({
      ...prev,
      role: false,
    }));
  };

  const closeHandler = () => {
    if (isUserForm.isCreate) {
      console.log("yes i am creating...");
      setUserDetails((prev) => ({
        ...prev,
        isCreate: false,
      }));
    } else {
      console.log("yes i am updating...");
      setUserDetails((prev) => ({
        ...prev,
        updateId: "",
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-0 bg-black/40"
      onClick={closeHandler}
    >
      <div
        className="bg-white rounded-md w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="" onSubmit={submiteHandler}>
          {/* left section */}
          <div className="p-6 px-8 rounded font-montserrat">
            <div className="flex pb-2">
              <h2 className=" md:text-4xl text-[28px] font-bold text-gray-700">
                User Form
              </h2>
              <button onClick={closeHandler}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
              </button>
            </div>
            <div className="grid items-center h-full gap-4 py-4 ">
              <input
                value={categoryDataForm?.name}
                type="text"
                onChange={handleChange}
                name="name"
                className={
                  " font-medium outline-none w-full  border h-10 border-gray-400 rounded-md pl-4 focus-within:border-blue-400  "
                }
                placeholder={"Enter Name"}
                required
              />
              <input
                value={categoryDataForm?.email}
                type="text"
                onChange={handleChange}
                name="email"
                className={
                  " font-medium outline-none w-full  border h-10 border-gray-400 rounded-md pl-4 focus-within:border-blue-400  "
                }
                placeholder={"Enter Email"}
                required
              />

              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() => setOpen({ ...isOpen, role: !isOpen.role })}
                >
                  {categoryDataForm.role !== ""
                    ? categoryDataForm.role
                    : "Select Role"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md overflow-y-auto w-28 bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.role ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {[
                    // "user",
                    // "admin",
                    "restaurent",
                    "driver",
                  ].map((role, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        categoryDataForm.role === role ? "bg-rose-600" : ""
                      }`}
                      onClick={() => handleSelectChange("role", role)}
                    >
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex ">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
                type="submit"
              >
                {/* Save Changes */}
                Submite
              </button>
              <button
                className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
                onClick={closeHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
