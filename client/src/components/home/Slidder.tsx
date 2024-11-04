import { FaRegHeart } from "react-icons/fa";

import smallBurgure from "../../assets/burgur.png";
import tacos from "../../assets/tacos.png";
import sandwitch from "../../assets/subway sandwitch.png";
import pizza from "../../assets/peporiny pizza.png";
import bowl from "../../assets/meet bowl with veggies.png";

const Slidder = () => {
  interface MenuItem {
    image: string;
    name: string;
    price: number;
  }

  const menuItems: MenuItem[] = [
    { image: smallBurgure, name: "Burger", price: 12.5 },
    { image: tacos, name: "Tacos", price: 12.5 },
    { image: sandwitch, name: "Sandwich", price: 12.5 },
    { image: pizza, name: "Pizza", price: 12.5 },
    { image: bowl, name: "Bowl", price: 12.5 },
    { image: bowl, name: "Burger", price: 12.5 }, // Assuming this is supposed to be a burger, not a bowl
  ];

  return (
    <section className="items-center justify-center px-4 w-full max-w-[1200px] pb-8 mx-auto  text-gray-700 md:grid pt-14">
      <div className="w-full ">
        <div className="flex justify-between mb-6 ">
          <h2 className="text-[20px] md:text-3xl font-bold ml-2 text-gray-700">
            Top Food of the day
          </h2>
          <button className="text-[#f79577] border-b-2 border-[#f79577] mr-2">
            View All
          </button>
        </div>
        {/* cards area */}
        <div className="flex gap-4 px-4 py-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden scroll-smooth text-gray-700">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="px-4 pb-3 transition-transform duration-500 transform shadow-2xl rounded-xl hover:scale-105 min-w-fit"
            >
              <div className="grid items-center h-40">
                <img src={item.image} alt="small burgure" className="w-40" />
              </div>
              <div className="mt-4">
                <h4 className="pb-2 text-sm font-bold">{item.name}</h4>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl font-bold">{item.price}</p>
                  <FaRegHeart className="text-rose-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slidder;
