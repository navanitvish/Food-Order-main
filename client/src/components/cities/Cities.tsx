// import React from "react";
// import { HiArrowDown } from "react-icons/hi2";
// import { RiApps2Fill } from "react-icons/ri";
// import { CiViewTable } from "react-icons/ci";

// import nara from "../../assets/Naralpur.jpeg"

// import bhandhe from "../../assets/bhande.jpeg"
// import khapri from "../../assets/khapari.jpeg"
// const Cities = ()=>{
//    return(
//     <div className="flex flex-col justify-center md:flex-row">
//     <div className="w-2/3">
//         <h1>This is an heading</h1>
//     </div>
//     <div className="flex flex-col justify-center w-1/3">
//         <div className="flex flex-row items-center justify-between">
//     <h1>Found 4 restaruents in Nagapur</h1>
//     <p className="flex flex-row md:px-10">
//     <p>sort by</p>
//     <p className="p-1"><HiArrowDown /></p>
//     <p className="p-1"><RiApps2Fill /></p>
//     <p className="p-1"><CiViewTable /></p>
//     </p>
//     </div>
//   <div className="flex flex-col gap-4 p-2 md:flex-row">
// <div className="w-[16rem] rounded-3xl border-2 mb-6 relative">
//   <div className="absolute mt-2 ml-2 text-white bg-black">8.2</div>
//     <img src={nara} className="p-2"/>
//   <div className="py-4 ">
//     <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
//     <p className="px-3 text-base text-gray-700">
//         Narsalpur city image
//     </p>
//   </div>

// </div>

// <div className="w-[16rem] rounded-3xl border-2 mb-6 relative">
//   <div className="absolute mt-2 ml-2 text-white bg-black">8.2</div>
//    <img src={bhandhe} className="h-[14rem] p-2" />
//   <div className="py-4 ">
//     <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
//     <p className="px-3 text-base text-gray-700">
//         bhandevedhi city image
//     </p>
//   </div>
//   </div>
// </div>
// <div className="flex flex-col gap-6 p-2 md:flex-row">
// <div className="w-[16rem] rounded-3xl border-2 mb-6 relative">
//   <div className="absolute mt-2 ml-2 text-white bg-black">8.2</div>
//    <img src={khapri} className="h-[14rem] p-2" />
//   <div className="py-4 ">
//     <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
//     <p className="px-3 text-base text-gray-700">
//         khapri city image
//     </p>
//   </div>

// </div>
// <div className="w-[16rem] rounded-3xl border-2 mb-6 relative">
//   <div className="absolute mt-2 ml-2 text-white bg-black">8.2</div>
//    <img src={khapri} className="h-[14rem] p-2" />
//   <div className="py-4 ">
//     <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
//     <p className="px-3 text-base text-gray-700">
//         khapri city image
//     </p>
//   </div>

// </div>
// </div>

// </div>
//     </div>

//    )
// }
// export default Cities

import { HiArrowDown } from "react-icons/hi2";
import { RiApps2Fill } from "react-icons/ri";
import { CiViewTable } from "react-icons/ci";

import nara from "../../assets/Naralpur.jpeg";
import bhandhe from "../../assets/bhande.jpeg";
import khapri from "../../assets/khapari.jpeg";

const Cities: React.FC = () => {
  return (
    <section className="items-center justify-center px-4 w-full max-w-[1200px] pb-8 mx-auto  text-gray-700 md:grid pt-14">
      <div className="w-full ">
        <div className="w-full ">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 md:text-3xl font-montserrat">
            Restaurant
          </h1>
          <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
            <h1 className="font-semibold text-gray-800 md:text-xl">
              Found 4 restaurants in Nagapur
            </h1>
            <div className="flex flex-row md:px-10">
              <p>sort by</p>
              <p className="p-1">
                <HiArrowDown />
              </p>
              <p className="p-1">
                <RiApps2Fill />
              </p>
              <p className="p-1">
                <CiViewTable />
              </p>
            </div>
          </div>
        </div>
        <div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="grid justify-center mb-6">
            <div className="w-[16rem] border-2  rounded-md relative">
              <div className="absolute p-1 text-sm font-bold text-yellow-800 bg-white rounded-full left-4 top-4">
                4.6
              </div>
              <img
                src={nara}
                className="p-2 h-[14rem] rounded-xl"
                alt="Narsalpur"
              />
              <div className="py-4 ">
                <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
                <p className="px-3 text-base text-gray-700">
                  Narsalpur city image
                </p>
              </div>
            </div>
          </div>
          <div className="grid justify-center mb-6">
            <div className="w-[16rem] rounded-md border-2  relative">
              <div className="absolute p-1 text-sm font-bold text-yellow-800 bg-white rounded-full left-4 top-4">
                8.2
              </div>
              <img
                src={bhandhe}
                className="h-[14rem] p-2 rounded-xl"
                alt="Bhandevedhi"
              />
              <div className="py-4 ">
                <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
                <p className="px-3 text-base text-gray-700">
                  Bhandevedhi city image
                </p>
              </div>
            </div>
          </div>

          <div className="grid justify-center mb-6">
            <div className="w-[16rem] rounded-md border-2  relative">
              <div className="absolute p-1 text-sm font-bold text-yellow-800 bg-white rounded-full left-4 top-4">
                9.5
              </div>
              <img
                src={khapri}
                className="h-[14rem] p-2 rounded-xl"
                alt="Khapri"
              />
              <div className="py-4 ">
                <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
                <p className="px-3 text-base text-gray-700">
                  Khapri city image
                </p>
              </div>
            </div>
          </div>

          <div className="grid justify-center mb-6">
            <div className="w-[16rem] rounded-md border-2  relative">
              <div className="absolute p-1 text-sm font-bold text-yellow-800 bg-white rounded-full left-4 top-4">
                6.2
              </div>
              <img
                src={khapri}
                className="h-[14rem] p-2 rounded-xl"
                alt="Khapri"
              />
              <div className="py-4 ">
                <div className="px-3 mb-2 text-xl font-bold">$160/night</div>
                <p className="px-3 text-base text-gray-700">
                  Khapri city image
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cities;
