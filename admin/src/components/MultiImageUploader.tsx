import React, { useState } from "react";
import uploadImage from "./firebase_image/image";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

interface ImageUploaderProps {
  handlingMultiple: (prev: string[]) => void;
}

const MultiImageUploader = ({ handlingMultiple }: ImageUploaderProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Store image files
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Store uploaded image URLs
  // const [progressStatus, setProgressStatus] = useState<{
  //   index: null | number;
  //   number: null | number;
  // }>({
  //   index: null,
  //   number: null,
  // });

  console.log("from mltiimage>>>", imageUrls, imageFiles);

  // const handlingProgress = (number: null | number, index: null | number) => {
  //   setProgressStatus({ number, index });
  // };

  const handleImageChange = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target?.files?.[0];
    const folderName = selectedFile?.name ?? "";

    if (selectedFile) {
      const imageUrl = await uploadImage(folderName, selectedFile, (value) =>
        console.log(value)
      );

      // Update the URLs state
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = imageUrl; // Update the specific index with the new URL
      setImageUrls(updatedUrls);
      handlingMultiple(updatedUrls);
      // setProgressStatus({ index: null, number: null });
    }
  };

  const addImageInput = () => {
    setImageFiles((prev) => [...prev, new File([], "")]); // Add a new empty File object
  };

  const removeImageInput = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setImageUrls(updatedUrls);
    handlingMultiple(updatedUrls);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {imageFiles.map((_, index) => (
          <div
            key={index}
            className="relative flex items-start w-full h-full gap-2 mb-2"
          >
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e)}
                className="hidden"
                id={`file-upload-${index}`}
              />
              {/* ${
                  progressStatus ? "pb-2" : ""
                } */}
              <label
                htmlFor={`file-upload-${index}`}
                className={`px-4 py-2 pl-24 relative  w-full text-base bg-transparent border border-gray-400 rounded-md cursor-pointer flex items-center justify-between`}
              >
                {imageUrls[index]?.slice(
                  imageUrls[index]?.lastIndexOf("/") + 1,
                  imageUrls[index]?.indexOf("%2")
                ) || "Choose a file"}
                <span className="text-gray-600 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 border-r border-gray-400 font-medium bg-gray-50">
                  Browse
                </span>
              </label>
              {/* { progressStatus.number !== null && progressStatus.index === index  && (
                <div className="absolute inset-0 z-10 flex items-end">
                  <div
                    className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                    style={{ width: `${progressStatus}%` }}
                  ></div>
                </div>
              )} */}
            </div>
            <button
              onClick={() => removeImageInput(index)}
              className="text-red-500 "
            >
              <MdDeleteOutline className="w-6 h-6 text-red-600" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addImageInput}
        className="flex items-center p-2 text-sm text-white bg-teal-600 rounded cursor-pointer justify-self-start"
        type="button"
      >
        <IoMdAdd className="w-4 h-4 mr-1" />
        Add
      </button>
    </div>
  );
};

export default MultiImageUploader;
