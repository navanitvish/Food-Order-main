import { FaStar } from "react-icons/fa";
import { PiHamburgerFill } from "react-icons/pi";
import { FaPizzaSlice, FaAngleDown } from "react-icons/fa";
import { MdOutlineRamenDining } from "react-icons/md";
import { PiCakeThin } from "react-icons/pi";
import { PiIceCream } from "react-icons/pi";

import { RiFilterLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { ApiError, ApiGetResponse } from "../../types/apiType";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../../api/userGetApi";
import {
  CardAllMenuDataType,
  CardAllMenuResponseType,
} from "../../types/contentType";

const Card: React.FC = () => {
  interface Card {
    title: string;
    rating: number;
    mins: string;
    items: string;
    image: string;
  }

  const CardItems: Card[] = [
    {
      title: "Burger",
      rating: 4.5,
      mins: "30-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.webp?b=1&s=170667a&w=0&k=20&c=1cK5UjNzhvbvqLX6sOG-lIjWv5FuRhfsbI0dIqNAla8=",
    },
    {
      title: "Pizza",
      rating: 4.5,
      mins: "30-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://media.istockphoto.com/id/1194029241/photo/pizza-primavera-and-one-slice-single-piece-of-vegetarian-pizza.webp?b=1&s=170667a&w=0&k=20&c=ML3kmFIvFzFL4Av6KOWeZsqwDH8OdAuJOssmcsZg3rg=",
    },
    {
      title: "Cupcake",
      rating: 4.5,
      mins: "30-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://media.istockphoto.com/id/1431307431/photo/chocolate-walnut-muffins-on-a-tray-directly-above-photo.webp?b=1&s=170667a&w=0&k=20&c=5ODrQVofebj1Nq1_DnT9MV40SCVKa97A9j12XKgHLkM=",
    },
    {
      title: "Icecream",
      rating: 4.5,
      mins: "35-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/w_1120,h_732,c_fill,g_auto/v1661347353/india-food-vindaloo/india-food-vindaloo-1120x732.jpg",
    },
    {
      title: "Ramen food",
      rating: 4.5,
      mins: "35-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://media.istockphoto.com/id/1042391774/photo/bowls-with-japanese-food.webp?b=1&s=170667a&w=0&k=20&c=NL16LTB2pKiSVodsUUSOdcHFx9-Y7-Ew9mDaRUUGvDU=",
    },
    {
      title: "Chicken",
      rating: 4.5,
      mins: "35-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg",
    },
    {
      title: "Meat",
      rating: 4.5,
      mins: "35-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSgHsjX4y7hQT1XDhBxjMjPudyd4DsJHHcXPzFIkPtPZjLeAqY7h5FaBDrpNmpXLiOP",
    },
    {
      title: "Biryani",
      rating: 4.5,
      mins: "35-40mins",
      items: "Burgers, Beverages, Cafe, Desserts",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg",
    },
  ];

  const { data, error, isLoading } = useQuery<
    ApiGetResponse<CardAllMenuResponseType>,
    ApiError
  >({
    queryKey: [`All Menues`],
    queryFn: async () => {
      return await apiGetRequest<CardAllMenuResponseType>({
        url: `/menus`,
      });
    },
  });

  const menuesData: CardAllMenuDataType[] = data?.data?.data || [];

  console.log(data, menuesData, error, isLoading);

  return (
    <section className="items-center justify-center px-4 w-full max-w-[1200px] pb-8 mx-auto  text-gray-700 md:grid pt-14">
      <div className="flex items-center mb-6 md:justify-end ">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="text-left ">
            <div className="inline-flex justify-center px-6 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px] shadow-sm">
              Filter
              <RiFilterLine className="w-4 h-5 ml-2" color="black" />
            </div>
          </div>
          <div className="text-left ">
            <div className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px] shadow-sm">
              Sort By
              <FaAngleDown className="w-4 h-5 ml-2 -mr-1" color="black" />
            </div>
          </div>
          <div className="text-left ">
            <div className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px] shadow-sm">
              Fast Delivery
            </div>
          </div>
          <div className="text-left ">
            <div className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px] shadow-sm">
              Ratings 4.0
              <AiOutlinePlus className="w-4 h-5 ml-2 -mr-1" color="black" />
            </div>
          </div>
          <div className="text-left ">
            <div className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px]  shadow-sm">
              Pure Veg
            </div>
          </div>
          <div className="text-left ">
            <div className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px] shadow-sm">
              Offers
            </div>
          </div>
          <div className="text-left ">
            <div className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px] shadow-sm">
              Rs. 300-Rs. 600
            </div>
          </div>
          <div className="text-left ">
            <div className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-black border-2 rounded-[12px] shadow-sm">
              Less than Rs.300
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div
          className="py-6 bg-white w-full md:w-[20rem] md:px-2 overflow-y-auto [&::-webkit-scrollbar]:hidden col-span-1 mb-8"
          style={{ maxHeight: "400px" }}
        >
          <div className="flex gap-4 px-4 py-5 overflow-hidden cursor-pointer hover:bg-orange-200 hover:rounded-3xl">
            <PiHamburgerFill size={20} className="mt-1" color="red" />
            <p className="text-lg text-[#b9894f]">Burger</p>
          </div>
          <div className="flex gap-4 px-4 py-5 cursor-pointer hover:bg-orange-200 hover:rounded-3xl">
            <FaPizzaSlice size={20} className="mt-1" color="red" />
            <p className="text-lg text-[#b9894f]">Pizza</p>
          </div>
          <div className="flex gap-4 px-4 py-5 cursor-pointer hover:bg-orange-200 hover:rounded-3xl">
            <MdOutlineRamenDining size={20} className="mt-1" color="red" />
            <p className="text-lg text-[#b9894f]">Cupcake</p>
          </div>
          <div className="flex gap-4 px-4 py-5 cursor-pointer hover:bg-orange-200 hover:rounded-3xl">
            <PiCakeThin size={20} className="mt-1" color="red" />
            <p className="text-lg text-[#b9894f]">Ramen</p>
          </div>
          <div className="flex gap-4 px-4 py-5 cursor-pointer hover:bg-orange-200 hover:rounded-3xl">
            <PiIceCream size={20} className="mt-1" color="red" />
            <p className="text-lg text-[#b9894f]">Ice cream</p>
          </div>
          <div className="flex gap-4 px-4 py-5 cursor-pointer hover:bg-orange-200 hover:rounded-3xl">
            <PiCakeThin size={20} className="mt-1" color="red" />
            <p className="text-lg text-[#b9894f]">Ramen</p>
          </div>
          <div className="flex gap-4 px-4 py-5 cursor-pointer hover:bg-orange-200 hover:rounded-3xl">
            <PiIceCream size={20} className="mt-1" color="red" />
            <p className="text-lg text-[#b9894f]">Ice cream</p>
          </div>
        </div>
        <div className="grid grid-cols-1 col-span-2  md:grid-cols-2 lg:grid-cols-3  [&::-webkit-scrollbar]:hidden gap-6 ">
          {CardItems.map((item) => (
            <div className="w-[250px] rounded relative justify-self-center">
              <span className="absolute left-0 text-white top-[7.5rem] px-2 py-1 rounded-br text-end text-lg font-bold">
                20% OFF
              </span>
              <img
                className="w-full rounded-3xl"
                src={item.image}
                alt="Card image"
              />
              <div className="px-2 py-4">
                <div className="mb-2 text-xl font-bold">{item.title}</div>
                <div className="flex items-center justify-between gap-3 mb-2 text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <FaStar
                      size={20}
                      color="white"
                      className="p-[0.15rem] my-2 bg-green-700 rounded-md"
                    />
                    <div className="text-green-700">4.5</div>
                  </div>
                  <span className="">
                    35-40 <span className="text-sm">mins</span>
                  </span>
                </div>
                <p className="text-base text-gray-700">
                  Burgers,Beverages,Cafe,desserts
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;
