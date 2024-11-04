import React, { useState } from "react";

interface FloatingLabelInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  name,
  onChange,
  type = "text",
  placeholder = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    // <div className="relative z-0 w-full">
    //   <input
    //     type={type}
    //     value={value}
    //     onChange={onChange}
    //     onFocus={() => setIsFocused(true)}
    //     onBlur={() => setIsFocused(!!value)}
    //     className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //     placeholder=" "
    //   />
    //   <label
    //     className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
    //       isFocused || value
    //         ? 'peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 scale-75 -translate-y-6'
    //         : 'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0'
    //     }`}
    //   >
    //     {label}
    //   </label>
    // </div>
    <div className="relative">
      {/* <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(!!value)}
        className="block w-full px-2.5 pb-1.5 pt-1 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder={placeholder}
      />
      <label
        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${
          isFocused || value
            ? "peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3"
            : "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2"
        }`}
      >
        {label}
      </label> */}

      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(!!value)}
        className="block w-full px-2.5 pb-1.5 pt-1.5 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder={placeholder}
      />
      <label
        className={`absolute text-sm left-2 text-gray-500  duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:px-2 peer-focus:text-blue-600  peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 ${
          isFocused || value
            ? "top-1 scale-75 -translate-y-3"
            : "scale-100 -translate-y-1/2 top-1/2"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
