import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiSelfLove } from "react-icons/gi";

const Cart: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 px-2">
        <p className="text-3xl">YOUR BAG</p>
        <p>Total items</p>
        <p>
          Items in your bag are not reserved - check out now to make them yours.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full max-w-screen-xl gap-1 lg:flex-row">
          <div className="flex flex-col items-center w-full gap-6 px-2 ">
            <div className="flex flex-col justify-center p-2 px-2 border-2 lg:flex-row">
              <img
                src="https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
                alt="Your Image"
                className="w-[20rem] h-[20rem] lg:w-[6rem] lg:h-[10rem] p-4 lg:p-0"
              />
              <div className="flex flex-col justify-between flex-1 p-2">
                <div className="p-2">
                  <div className="flex">
                    <div className="p-1 border-2">
                      <FaMinus />
                    </div>
                    <div className="mx-2">1</div>
                    <div className="p-1 border-2">
                      <FaPlus />
                    </div>
                  </div>
                  <p className="text-2xl">Hiking shoes trail running</p>
                  <p>Shoe nonstop outdoor</p>
                </div>
                <div className="lg:flex lg:gap-x-36">
                  <p className="p-2">$9.8</p>
                  <div className="flex gap-3 p-3">
                    <RiDeleteBinLine />
                    <GiSelfLove />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-2 px-2 border-2 lg:flex-row">
              <img
                src="https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
                alt="Your Image"
                className="w-[20rem] h-[20rem] lg:w-[6rem] lg:h-[10rem] p-4 lg:p-0"
              />
              <div className="flex flex-col justify-between flex-1 p-2">
                <div className="p-2">
                  <div className="flex">
                    <div className="p-1 border-2">
                      <FaMinus />
                    </div>
                    <div className="mx-2">1</div>
                    <div className="p-1 border-2">
                      <FaPlus />
                    </div>
                  </div>
                  <p className="text-2xl">Hiking shoes trail running</p>
                  <p>Shoe nonstop outdoor</p>
                </div>
                <div className="lg:flex lg:gap-x-36">
                  <p className="p-2">$9.8</p>
                  <div className="flex gap-3 p-3">
                    <RiDeleteBinLine />
                    <GiSelfLove />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-2 px-2 border-2 lg:flex-row">
              <img
                src="https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
                alt="Your Image"
                className="w-[20rem] h-[20rem] lg:w-[6rem] lg:h-[10rem] p-4 lg:p-0"
              />
              <div className="flex flex-col justify-between flex-1 p-2">
                <div className="p-2">
                  <div className="flex">
                    <div className="p-1 border-2">
                      <FaMinus />
                    </div>
                    <div className="mx-2">1</div>
                    <div className="p-1 border-2">
                      <FaPlus />
                    </div>
                  </div>
                  <p className="text-2xl">Hiking shoes trail running</p>
                  <p>Shoe nonstop outdoor</p>
                </div>
                <div className="lg:flex lg:gap-x-36">
                  <p className="p-2">$9.8</p>
                  <div className="flex gap-3 p-3">
                    <RiDeleteBinLine />
                    <GiSelfLove />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-2 md:py-[5rem] py-7 lg:w-[40rem] ">
            <div className="px-2 border-2">
              <p className="py-4 text-2xl">Order Summary</p>
              <div className="flex justify-between p-2">
                <p>2items</p>
                <p>$23.99 </p>
              </div>
              <div className="flex justify-between p-2">
                <p>Delivery</p>
                <p>free</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p className="font-bold text-1xl">Total</p>
                <p className="font-bold text-1xl">$173.95</p>
              </div>
              <p className="mb-6">inclusive of all taxes</p>
              <button className="w-full p-2 mb-8 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                Checkout
              </button>
            </div>
            <div className="flex justify-between p-2 mt-5 border-2">
              <p className="text-1xl text-zinc-600">Enter promo code</p>
              <p className="text-1xl">
                <FaPlus />
              </p>
            </div>
            <div className="p-2">
              <p>Accepted payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
